<template>
  <div class="homeCard">
      <div class="homecardinner"></div>
      <div class="userinfo">
        <div class="headerwapper">
          <img
          class="header"
          :src="avatar"
        />
        </div>
        <div class="nickname">{{nickname}}</div>
        <div class="bookshelf">书架共有{{data.num}}本好书</div>
        <div class="rounditem"></div>
        <div class="shelftext">特别精选</div>
      </div>
      <div class="bookinfo">
        <div class="bookwapper" v-for="(item, index) in data.bookList" :key="index" @click="onBookClick(item)">
          <img
            :src="item.cover"
          />
        </div>
        <div class="shelfwapper" @click="gotoshelf">
            <div class="shelf">书架</div>
            <van-icon class="arrow" name="arrow" size="11px" color="#828489"></van-icon>
        </div>
      </div>
      <div class="feedback" @click="onFeedBackClick"><span>反馈</span></div>
      <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
import ImageView from '../../components/base/imageView'
import Dialog from 'vant-weapp/dist/dialog/dialog'
export default {
  components: { ImageView },
  props: {
    data: Object,
    hasSign: {
      type: Boolean,
      default: false
    },
    signDay: {
      type: Number,
      default: 0
    }
  },
  computed: {
    bookList () {
      return (this.data && this.data.bookList) || []
    },
    avatar () {
      return (this.data && this.data.userInfo && this.data.userInfo.avatarUrl) || ''
    },
    nickname () {
      return (this.data && this.data.userInfo && this.data.userInfo.nickName) || ''
    }
  },
  methods: {
    gotoshelf () {
      this.$router.push('/pages/shelf/main')
    },
    onBookClick (item) {
      this.$emit('onClick', item)
    },
    sign () {
    },
    onFeedBackClick () {
      Dialog.confirm({
        title: '反馈',
        message: '您是否确认提交反馈信息？',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(() => {
        console.log('点击是之后的事件')
      }).catch(() => {
        console.log('点击否之后的事件')
      })
    }
  }
}
</script>

<style scoped>
.header{
    border-radius: 50%
}
.homeCard{
    background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
    border-radius: 15px;
    margin: 22px 20px 0;
    padding: 21.5px 17px 20px 20px;
}
.homecardinner{
    position: relative;
    box-sizing: border-box;
}
.userinfo{
    display: flex;
    align-items: center
}
.headerwapper{
  margin-right: 8px;
}
.headerwapper img{
    width: 24px;
    height: 24px;
    align-items: center;
}
.nickname{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    align-items: center;
    margin: 0 8px;
}
.bookshelf,.shelftext{
    opacity: 0.7;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    align-items: center;
    margin: 0 7px;
}
.rounditem{
    width: 4px;
    height: 4px;
    background: #A2A2A2;
    border-radius: 50%;
    margin: 0 2px 0 5px;
}
.bookinfo{
    display: flex;
}
.bookwapper {
    width: 72px;
    height: 101px;
    margin: 17px 20px 0 0;
}
img{
  width: 100%;
  height: 100%;
}
.shelfwapper{
    display: flex;
    align-items: center;
}
.shelf{
    font-size: 11px;
    width: 11px;
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    color: #FFFFFF;
    text-align: center; 
}
.feedback{
    position: absolute;
    right: 20px;
    top: 111.5px;
    width: 44.5px;
    height: 23.5px;
    line-height: 23.5px;
    /*opacity: 0.3;*/
    background: #707070;
    border-radius: 200px 0 0 200px;
}
.feedback span{
    position: absolute;
    top: 0;   
    margin: 1px 0.5px 4px 12px;
    font-family: PingFangSC-Regular;
    font-size: 11px;
    color: #FFFFFF;

}
</style>
