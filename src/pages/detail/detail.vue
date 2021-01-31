<template>
  <div>
    <DetailBook :book="book"/>
    <DetailStat 
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
    />
    <DetailRate 
      :rate-value="book.rateValue"
      @onRateChange="onRateChange"
    />
    <DetailContents
      :contents="contents"
      @readBook="readBook"
    />
    <!--     组件点击事件不起效 
    <DetailBottom/>
    -->
    <div class="detail-bottom">
      <div class="detail-btn-wrapper">
        <button
          :class="isInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
          @click="handleShelf"
        >
          {{isInShelf ? '移出书架' : '加入书架'}}
        </button>
      </div>
      <div class="detail-btn-wrapper">
        <button
          class="detail-btn-read"
          @click="() => readBook()"
        >
          阅读
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DetailBook from '../../components/detail/DetailBook'
import DetailStat from '../../components/detail/DetailStat'
import DetailRate from '../../components/detail/DetailRate'
import DetailContents from '../../components/detail/DetailContents'
import { bookDetail, bookRankSave, bookContents, bookShelf, bookShelfSave, bookShelfRemove } from '../../API/index'
import { getStorageSync } from '../../API/wechat'

export default {
  components: {
    DetailBook,
    DetailStat,
    DetailRate,
    DetailContents
  },
  data () {
    return {
      book: {},
      contents: [],
      isInShelf: false
    }
  },
  methods: {
    handleShelf () {
      const openId = getStorageSync('openId')
      const {fileName} = this.$route.query
      if (!this.isInShelf) {
        bookShelfSave({ openId, fileName }).then(() => {
          this.getBookIsInShelf()
        })
      } else {
        const vue = this
        mpvue.showModal({
          title: '提示',
          content: `是否确认将《${this.book.title}》移出书架？`,
          success (res) {
            if (res.confirm) {
              bookShelfRemove({ openId, fileName }).then(vue.getBookIsInShelf)
            }
          }
        })
      }
    },
    readBook (href) {
      const query = {
        fileName: this.book.fileName,
        opf: this.book.opf
      }
      if (href) {
        const index = href.indexOf('/')
        if (index >= 0) {
          query.navigation = href.slice(index + 1) // 截断
        } else {
          query.navigation = href
        }
      }
      if (this.book && this.book.fileName) {
        this.$router.push({
          path: '/pages/read/main',
          query
        })
      }
    },
    onRateChange (value) {
      const openId = getStorageSync('openId')
      const {fileName} = this.$route.query
      bookRankSave({openId, fileName, rank: value}).then(() => {
        this.getBookDetail()
      })
    },
    getBookDetail () {
      const openId = getStorageSync('openId')
      const {fileName} = this.$route.query
      if (openId && fileName) {
        bookDetail({openId, fileName}).then(response => {
          this.book = response.data.data
        })
      }
    },
    getBookContents () {
      const {fileName} = this.$route.query
      if (fileName) {
        bookContents({fileName}).then(response => {
          this.contents = response.data.data
        })
      }
    },
    getBookIsInShelf () {
      const openId = getStorageSync('openId')
      const {fileName} = this.$route.query
      if (openId && fileName) {
        bookShelf({ openId, fileName }).then(response => {
          const { data } = response.data
          data.length === 0 ? this.isInShelf = false : this.isInShelf = true
        })
      }
    }
  },
  mounted () {
    this.getBookDetail()
    this.getBookContents()
    this.getBookIsInShelf()
  }
}
</script>

<style scoped>
  .detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 4px 0 rgba(0,0,0,.1);
  }
  .detail-btn-wrapper {
      flex: 1;
    }
  .detail-btn-read {
      width: 160px;
      height: 40px;
      border: none;
      color: #fff;
      background: #1EA3F5;
      margin-left: 7.5px;
      border-radius: 22.5px;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      text-align: center;
    }
  .detail-btn-shelf {
      width: 160px;
      height: 40px;
      color: #1EA3F5;
      background: #fff;
      border: 1px solid #1EA3F5;
      margin-right: 7.5px;
      border-radius: 22.5px;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      text-align: center;
    }
  .detail-btn-remove {
      width: 160px;
      height: 40px;
      color: #F96128;
      background: rgba(255, 175, 155, .3);
      border: 1px solid #FFAF9B;
      margin-right: 7.5px;
      border-radius: 22.5px;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      text-align: center;
    }
</style>