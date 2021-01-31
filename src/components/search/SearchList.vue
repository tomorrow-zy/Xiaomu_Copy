<template>
  <div class="wrapper">
    <Searchitem icon="apps-o" :title="category" subTitle="Category" @onClick="showList(category,'category')" v-if="category"/>
    <Searchitem icon="user-o" :title="author" subTitle="Author" @onClick="showList(author,'author')" v-if="author"/>
    <Searchitem icon="newspaper-o" :title="publisher" subTitle="Publisher" @onClick="showList(publisher,'publisher')" v-if="publisher"/>
    <SearchTable :data="data.book"/>
  </div>
</template>

<script>
import Searchitem from '../search/Searchitem'
import SearchTable from '../search/SearchTable'
export default {
  components: {
    SearchTable,
    Searchitem
  },
  props: {
    data: Object
  },
  computed: {
    category () {
      if (this.data && this.data.category && this.data.category.length > 0) {
        return this.data.category[0].categoryText
      } else {
        return null
      }
    },
    author () {
      if (this.data && this.data.author && this.data.author.length > 0) {
        return this.data.author[0].author
      } else {
        return null
      }
    },
    publisher () {
      if (this.data && this.data.publisher && this.data.publisher.length > 0) {
        return this.data.publisher[0].publisher
      } else {
        return null
      }
    }
  },
  methods: {
    showList (text, key) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          text, key, title: text
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
