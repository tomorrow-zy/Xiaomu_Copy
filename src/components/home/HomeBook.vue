<template>
  <div class="homebook">
    <div class="homebookheader">{{ title }}</div>
    <div class="homebookcontent">
      <div class="row" v-for="(item, index) in bookData" :key="index">
        <div class="col" v-for="(book , bookIndex) in item" :key="bookIndex">
          <div class="bookwapper" @click="onBookClick(book)">
            <ImageView :src="book.cover" />
            <div class="booktitlecol">
              <div class="booktitle">{{book.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="homebookfooter" @click="onMoreClick">
      <button name="change" type="submit" value="change">{{btnText}}</button>
    </div>
  </div>
</template>

<script>
import { HOMEBOOKMODE } from '@/utils/const'
import ImageView from '../../components/base/imageView'

export default {
  components: { ImageView },
  props: {
    title: String,
    data: {
      type: Array,
      default: []
    },
    btnText: String,
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 1
    },
    mode: {
      type: String,
      default: HOMEBOOKMODE.ROW
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    linearBg: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    bookData () {
      const { data, row, col } = this
      if (data && data.length > 0) {
        const number = row * col
        const _bookdata = data.slice(0, number)
        const _bookdatarow = []
        let _row = 0
        while (_row < row) {
          _bookdatarow.push(_bookdata.slice(_row * col, _row * col + col))
          _row++
        }
        return _bookdatarow
      } else {
        return []
      }
    }
  },
  methods: {
    onMoreClick () {
      this.$emit('onMoreClick')
    },
    onBookClick (book) {
      this.$emit('onBookClick', book)
    }
  }
}
</script>

<style>
.homebook {
}
.homebookheader {
  padding: 13px 0 0 20.5px;
  font-weight: bold;
}
.homebookcontent{
  padding: 0 20px;
  margin-top: 22.5px;
}
.row{
  display: flex;
  flex-flow: nowrap;
}
.col{}
.bookwapper{
  width: 101px;
  height: 163.5px;
  margin-right: 16px;
}
.booktitlecol{
  margin-right: 16px;
}
.booktitle{
  width: 101px;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #212731;
  line-height: 16.5px;
  max-height: 33px;
  font-weight: 500%;
  overflow: hidden;
}
.homebookfooter{
  margin-top: 20px;
  padding: 0 20px;
} 
button{
  width: 100%;
  margin-top: 20px; 
  border-radius: 22px;
  background-color: #ffffff;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #3696EF;
  font-weight: 500;
}
button:active{
  border: 2px solid #EDEEEE;
}
</style>
