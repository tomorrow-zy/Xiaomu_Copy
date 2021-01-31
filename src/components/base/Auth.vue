<template>
  <div class="authwrapper">
    <div class="auth">
      <div class="authinfo">
        <div class="authimg">
          <ImageView
            src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
            height="100%"
            round
          />
        </div>
        <div class="subtitle">登录小慕读书</div>
        <div class="title">全球好书免费读</div>
      </div>
      <button 
        class="authbtn"
        @getuserinfo="getUserInfo"
        open-type="getUserInfo"
      >
        授权登录
      </button>
    </div>
  </div>
</template>

<script>
import ImageView from '../../components/base/imageView'
export default {
  computed: {
    avatar () {
      return (this.data && this.data.userInfo && this.data.userInfo.avatarUrl) || ''
    }
  },
  components: {
    ImageView
  },
  methods: {
    getUserInfo () {
      this.$emit('getUserInfo')
    }
  }
}
</script>

<style scoped>
.authwrapper{
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #999;
  z-index: 1000;
}
.auth{
  position: relative;
  width:270px;
  height: 248px;
  background: #F5F5F5;
  border-radius: 18px; 
}
.authinfo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 22.5px;  
}
.authimg{
  width: 74px;
  height: 74px;
}
.subtitle{
  margin-top: 18px;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #999999;
  line-height: 18.5px;
}
.title{
  margin-top: 3.5px;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #333333;
  line-height: 22.5px;
  font-weight: 600;
}
button{
  padding-top: 14px;
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
  border-radius: 0 0 18px 18px;
  height: 49px;
  font-family: PingFangSC-Semibold;
  font-size: 15px;
  color: #FFFFFF;
  line-height: 21px;
  font-weight: 400;
}
</style>
