<style scoped></style>

<template>
<div>
  <div class="news-page list-group" v-if="isCategoryFetched"> 
    <a class="list-group-item" v-bind:aria-label="item.title" target="_self" v-for="item in list" >
      <h6 class="list-group-item-heading>">
        <!--span class="glyphicon glyphicon-th-list"></span-->[{{item.ct}}]-{{item.title}}
      </h6>
      <p class="list-group-item-content"></p>
    </a>
  </div>
  <suba-pagination v-bind:count="count"></suba-pagination>
</div>
</template>

<script>
import SubaPagination from '@/components/Pagination.vue'

export default {
  components: {
    SubaPagination
  },
  data () {
    return {
      list: [],
      cache: [],
      title: '',
      isCategoryFetched: false,
      now: 1,
      count: 0,
      limit: 15
    }
  },
  created () {
    this.fetchData()
  },
  events: {
    updatePageNow (now) {
      var cached = this.cache[now]

      this.$cookie.set(this.title, now, 1)

      if (cached !== undefined) {
        this.list = cached
      } else {
        this.now = now
        this.$http.get(`/get/category/${this.title}/${this.limit}/${this.now}`).then((response) => {
          var data = response.data

          if (data.success === true) {
            this.list = this.cache[now] = data.msg
          } else {
          }
        }, (error) => {
          this.$emit('handleError', true)
          throw error
        })
      }
    },
    updatePageLimit (limit) {}
  },
  methods: {
    fetchCategory () {
      var now = this.$cookie.get(this.$route.to.params.title)

      if (now !== null) {
        this.now = now
      }
      this.title = this.$route.to.params.title
      this.fetchPagination()

      this.$http.get(`/category/${this.title}/${this.limit}/${this.now}`).then((response) => {
        var data = response.data

        if (data.success === true) {
          this.list = this.cache[this.now] = data.msg
          this.isCategoryFetched = true
          this.$emit('updateBreadcrumb', [{
            obj: {
              name: 'category',
              params: {
                title: this.title
              }
            },
            content: this.title
          }])
        } else {
          this.$emit('handleError', true)
        }
      }, (error) => {
        this.$emit('handleError', true)
        throw error
      })
    },
    fetchPagination: function () {
      this.$http.get(`/pagination/${this.title}/${this.limit}`).then((response) => {
        var data = response.data

        if (data.success === true) {
          this.count = data.msg
        }
      }, (error) => {
        throw error
      })
    }
  },
  watch: {
    '$route': 'fetchCategory',
    count (val, oldVal) {
      this.$refs.pagination.count = val
    }
  }
}
</script>
