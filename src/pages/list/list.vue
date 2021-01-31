<template>
 <div>
   <SearchTable :data="data"/>
 </div>
</template>

<script>
import SearchTable from '../../components/search/SearchTable'
import {searchList} from '../../API'
import {setNavigationBarTitle, showToast} from '../../API/wechat'
export default {
  components: {
    SearchTable
  },
  data () {
    return {
      data: [],
      page: 1
    }
  },
  methods: {
    getSearchList () {
      const {key, text} = this.$route.query
      const params = {}
      if (key && text) {
        params[key] = text
      }
      params.page = this.page
      searchList(params).then(response => {
        const {data} = response.data
        if (data.length > 0) {
          this.data.push(...data)
        } else {
          showToast('米有更多')
        }
      })
    }
  },
  mounted () {
    this.page = 1
    this.getSearchList()
    const {title} = this.$route.query
    setNavigationBarTitle(title)
  },
  onReachBottom () {
    this.page++
    this.getSearchList()
  }
}
</script>

<style scoped>
</style>
