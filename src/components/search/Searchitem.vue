<template>
  <div class="wrapper" @click="onClick">
    <div class="icon">
      <div class="iconwrapper">
        <van-icon :name="icon" color="rgba(0,0,0,.5)" :style="{ width:'20px',height:'20px'}"></van-icon>
      </div>
    </div>
    <div class="info">
      <div class="title">{{title}}</div>
      <div class="subtitle">{{subTitle}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
    icon: String
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    }
  }
}
</script>

<style scoped>
.wrapper{
  display: flex;
  align-items: center;
  padding: 15PX;
  height: 36.5px;;
}
.icon{

}
.iconwrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #F7F7F9;
}
van-icon{
  display: flex;
  justify-content: center;
  align-items: center;
}
.info{
  width: 85%;
  margin-left: 10px;
}
.title{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: PingFangSC-Regular;
  font-size:14px;
  color: #333333;
  line-height: 20px;
}
.subtitle{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.45);
  line-height: 16.5px;
}
</style>
