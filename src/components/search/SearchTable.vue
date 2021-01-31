<template>
  <div class="wrapper">
    <div class="inner">
      <div class="table" @click="onClick(book)" v-for="(book,index) in data" :key="index">
        <div class="imgwrapper">
          <div class="bookimg">
            <ImageView 
              :src="book.cover"
            />
          </div>
        </div>
        <div class="bookinfowrapper">
          <div class="bookinfotitle">{{book.title}}</div>
          <div class="bookinfoauth">{{book.author}}</div>
          <div class="bookinfocategory">{{book.category}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageView from '../base/imageView'
export default {
  components: {
    ImageView
  },
  props: {
    data: Array
  },
  methods: {
    onClick (book) {
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
      this.$emit('onClick', book)
    }
  }
}
</script>

<style scoped>
.wrapper{
  padding: 0 16px;
}
.table{
  display: flex;
  align-items: center;
  margin: 14.5px 0;
}
.bookimg{
  width: 47px;
  height: 68.5px;;
}
.bookinfowrapper{
  margin-left: 15.5px;
  width: 265.5px;
}
.bookinfotitle{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  line-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;

}
.bookinfoauth{
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: rgba(0,0,0,0.65);
  line-height: 18px;
}
.bookinfocategory{
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: rgba(0,0,0,0.45);
  line-height: 18px;
}
</style>
