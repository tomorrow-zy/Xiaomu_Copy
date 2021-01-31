<template>
<div>
  <div class="home" v-if="isAuth">
    <SearchBar 
      :disabled="true"
      @onClick="onSearchBarClick"
      :hotSearch="hotSearch"
    />
    <homeCard 
      :data="homeCard"
      @onClick="onHomeBookClick"
    />
    <HomeBanner
      img="http://www.youbaobao.xyz/book/res/bg.jpg"
      title="mpvue2.0多端小程序课程重磅上线"
      subTitle="马上学习"
      @onClick="onBannerClick"
    />
    <div :style="{ marginTop:'23px' }">
      <HomeBook 
        title="为你推荐"
        :row="1"
        :col="3"
        :data="recommend"
        btnText="换一批"
        @onMoreClick="recommendChange('recommend')"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div :style="{ marginTop:'23px' }">
      <HomeBook 
        title="免费阅读"
        :row="2"
        :col="2"
        :data="freeRead"
        btnText="换一批"
        @onMoreClick="recommendChange('freeRead')"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div :style="{ marginTop:'23px' }">
      <HomeBook 
        title="当前最热"
        :row="1"
        :col="4"
        :data="hotBook"
        btnText="换一批"
        @onMoreClick="recommendChange('hotBook')"
        @onBookClick="onHomeBookClick"
      />
    </div>
    <div :style="{ marginTop:'23px' }">
      <HomeCate
        title="分类"
        :row="3"
        :col="2"
        :data="category"
        btnText="查看全部"
        @onMoreClick="onCategoryMoreClick"
        @onBookClick="onCategoryClick"
      />
    </div>
  </div>
  <Auth v-if="!isAuth" @getUserInfo="init"/>
</div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import homeCard from '../../components/home/homeCard'
import HomeBanner from '../../components/home/HomeBanner'
import HomeBook from '../../components/home/HomeBook'
import HomeCate from '../../components/home/HomeCate'
import Auth from '../../components/base/Auth'
import { getHomeData, recommend, freeRead, hotBook, register } from '../../API/index'
import { getSetting, getUserInfo, setStorageSync, getStorageSync, getUseropenId, showLoading, hideLoading } from '../../API/wechat'
export default {
  components: {
    SearchBar,
    homeCard,
    HomeBanner,
    HomeBook,
    HomeCate,
    Auth
  },
  data () {
    return {
      hotSearch: '',
      homeCard: {},
      banner: {},
      recommend: [],
      freeRead: [],
      hotBook: [],
      category: [],
      isAuth: true
    }
  },
  methods: {
    recommendChange (key) {
      switch (key) {
        case 'recommend':
          recommend().then(response => {
            this.recommend = response.data.data
          })
          break
        case 'freeRead':
          freeRead().then(response => {
            this.freeRead = response.data.data
          })
          break
        case 'hotBook':
          hotBook().then(response => {
            this.hotBook = response.data.data
          })
          break
      }
    },
    onBookMoreClick () {
      console.log('more click')
    },
    onHomeBookClick (book) {
      console.log(book)
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
    },
    onCategoryClick (category) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          key: 'categoryId',
          text: category.category,
          title: category.categoryText
        }
      })
    },
    onCategoryMoreClick () {
      this.$router.push({
        path: '/pages/categoryList/main'
      })
    },
    onSearchBarClick () {
      this.$router.push({
        path: '/pages/search/main',
        query: {
          hotSearch: this.hotSearch
        }
      })
    },
    onBannerClick () {
      console.log('banner click')
    },
    getHomeData (openId, userInfo) {
      getHomeData({ openId }).then(response => {
        const {
          data: {
            hotSearch: {
              keyword
            },
            shelf,
            banner,
            recommend,
            freeRead,
            hotBook,
            category
          }
        } = response.data
        this.hotSearch = keyword
        this.banner = banner
        this.recommend = recommend
        this.freeRead = freeRead
        this.hotBook = hotBook
        this.category = category
        this.homeCard = {
          bookList: shelf,
          num: shelf.length - 1,
          userInfo
        }
        hideLoading()
      }).catch(() => {
        hideLoading()
      })
    },
    getUserInfo () {
      const onOpenIdComplete = (openId, userInfo) => {
        this.getHomeData(openId, userInfo)
        register(openId, userInfo)
      }
      getUserInfo(
        (userInfo) => {
          console.log(userInfo)
          setStorageSync('userInfo', userInfo)
          const openId = getStorageSync('openId')
          if (!openId || openId.length === 0) {
            getUseropenId(openId => onOpenIdComplete(openId, userInfo))
          } else {
            onOpenIdComplete(openId, userInfo)
          }
        },
        () => {
          console.log('failed..')
        }
      )
    },
    getSetting () {
      getSetting(
        'userInfo',
        () => {
          this.isAuth = true
          showLoading('正在加载')
          this.getUserInfo()
        },
        () => {
          this.isAuth = false
        }
      )
    },
    init () {
      this.getSetting()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
