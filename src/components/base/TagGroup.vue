<template>
<div class="taggroupwapper">
  <div class="taggroupheader">
    <div class="headertext">{{headerText}}</div>
    <div class="headerbtn" @click="onBtnClick">{{bTnText}}</div>
  </div>
  <div class="taggroup">
    <div 
      class="taggroupinner"
      v-for="(text, index) in value"
      :key="index"
    >
      <Tag :text="text" @onClick="onTagClick(text, index)" />
    </div>
  </div>
</div>
</template>

<script>
import Tag from './Tag'
export default {
  components: { Tag },
  props: {
    headerText: String,
    bTnText: String,
    value: Array
  },
  methods: {
    onTagClick (text, index) {
      this.$emit('onTagClick', text, index)
    },
    onBtnClick () {
      this.$emit('onBtnClick')
    }
  }
}
</script>

<style scoped>
.taggroupwapper{
  margin-top: 35px;
  width: 100%;
  padding-bottom: 10px;
}
.taggroupheader{
  display: flex;
  justify-content: space-between;
  padding: 0 16.5px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
}
.headertext{
  color: #333333;
  line-height: 20px;
}
.headerbtn{
color: #3696EF;
line-height: 20px;
}
.taggroup{
  width: 100%;
  box-sizing: border-box;
  margin-top: 21.5px;
  display: flex;
  flex-flow: row wrap;
  padding: 10px 10px 0 0px;

}
.taggroupinner{
  max-width: 100%;
  box-sizing: border-box;
  padding: 6px 6px 0 6px;
}
</style>
