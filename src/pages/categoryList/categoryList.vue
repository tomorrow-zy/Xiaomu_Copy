<template>
 <div>
   <HomeCate
        :row="category.length/2"
        :col="2"
        :data="category"
        :showBtn="false"
        :showTitle="false"
        @onBookClick="onCategoryClick"
    />
 </div>
</template>

<script>
import HomeCate from '../../components/home/HomeCate'
import {categoryList} from '../../API/index'
export default{
  components: {
    HomeCate
  },
  data () {
    return {
      category: []
    }
  },
  methods: {
    onCategoryClick (category) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          key: 'categoryId',
          text: category.category,
          title: category.categoryText
        }
      })
    }
  },
  mounted () {
    categoryList().then(response => {
      this.category = response.data.data
    })
  }
}
</script>

<style scoped>
</style>
