<template>
  <div class="detail-bottom">
    <div class="detail-btn-wrapper">
      <button
        :class="isInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
        @click="handleShelf123"
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
</template>

<script>
  export default {
    props: {
      isInShelf: Boolean
    },
    methods: {
      handleShelf123 () {
        this.$emit('handleShelf')
      },
      readBook () {
        this.$emit('readBook')
      }
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