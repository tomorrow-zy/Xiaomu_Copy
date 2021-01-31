<template>
  <div class="search-bar">
      <div class="search-bar-wrapper" @click="onSearchBarClick">
          <van-icon
          class="search" name="search" size="16px" color="#858C96"></van-icon>
          <input class="searchbarinput" 
          :focus="focus"
          :disabled="disabled"
          :maxlength="limit"
          :placeholder="hotSearch"
          v-model="searchWord"
          @input="onChange"
          confirm-type="search"
          @confirm="onConfirm"
          placeholder-style="color: #ADB4BE;font-size:15px "
          />
          <van-icon
          class="clear" 
          name="clear" 
          size="15px" 
          color="#ccc" 
          @click="onClearClick"
          v-if="searchWord.length > 0"
          ></van-icon>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 50
    },
    hotSearch: {
      type: String,
      default: '搜索'
    }
  },
  data () {
    return {
      searchWord: ''
    }
  },
  methods: {
    onSearchBarClick () {
      this.$emit('onClick')
    },
    onClearClick () {
      this.searchWord = ''
      this.$emit('onClear')
    },
    onChange (e) {
      const { value } = e.mp.detail
      this.$emit('onChange', value)
    },
    onConfirm (e) {
      const { value } = e.mp.detail
      this.$emit('onConfirm', value)
    },
    setValue (v) {
      this.searchWord = v
    },
    getValue () {
      return this.searchWord
    }
  }
}
</script>

<style scoped>
.search-bar {
    padding:15px 15.5px;
}
.search-bar-wrapper {
    display: flex;
    align-items:center; 
    height:40px;
    box-sizing:border-box;
    background: #F5F7F9;
    border-radius: 40px;
    padding: 12px 17px;
}
.searchbarinput{
    flex:1;
    margin:0 8px;
    color: #333;
    font-size: 15px;
}
 .search .clear{
     display: flex;
     align-items: center;
     height: 100%;
}
</style>
