<template>
  <div class="homecate">
    <div class="homecateheader" v-if="showTitle">{{ title }}</div>
    <div class="homecatecontent">
      <div class="caterow" v-for="(item, index) in bookData" :key="index">
        <div class="catecol" v-for="(book , bookIndex) in item" :key="bookIndex">
          <div class="catewapper" @click="onBookClick(book)">
            <div class="catetext">{{book.text}}</div>
            <div class="catenum">{{book.num}}本书</div>
            <div class="cateimgwapper" >
              <img class="img1" :src="book.cover"/>
              <img class="img2" :src="book.cover2"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="homecatefooter" @click="onMoreClick">
      <button name="more" >{{btnText}}</button> 
    </div>
  </div>
</template>

<script>
import { HOMEBOOKMODE, CATEGORY } from '@/utils/const'

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
        data.forEach(book => {
          book.text = CATEGORY[book.categoryText.toLowerCase()]
        })
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
      console.log(book)
      this.$emit('onBookClick', book)
    }
  }
}
</script>

<style>
.homecate {
  margin-top: 16px;
  margin-bottom: 20px;
}
.homecateheader {
  padding: 13px 0 0 20.5px;
  font-weight: bold;
}
.homecatecontent{
  padding: 0 10px;
  margin-top: 15px;
}
.caterow{
  display: flex;
  flex-flow: nowrap;
}
.catewapper{
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #F8F9FB;
  border-radius: 5px; 
  height: 96px;
  width: 161.5px;
  padding: 13px 0 14.5px 16px;
  box-sizing: border-box;
  margin: 12px 12px 0 0;
}
.catetext{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #212832;
  line-height: 22.5px;
}
.catenum{ 
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #868686;
  line-height: 16.5px;
}
.cateimgwapper{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 66px;
}
.img1{
  position: absolute;
  right: 0px;
  bottom: 0;
  z-index: 100;
  width: 50px;
  height: 66px;
  border-radius: 0 0 5px 0;
}
.img2{
  position: absolute;
  right: 15px;
  bottom: 0;
  z-index: 90;
  width: 50px; 
  height: 56px;; 
}
.homecatefooter{
  margin-top: 15px;
  padding: 0 20px;
} 
button{
  width: 100%;
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
