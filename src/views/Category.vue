<style scoped></style>

<template>
<div>
  <div class="news-page list-group" v-if="isCategoryFetched">
  <template v-for="item in list">
    <router-link class="list-group-item" v-bind:to="{name: 'news', params: {title: item.title}}" v-bind:aria-label="item.title" target="_self">
      <h6 class="list-group-item-heading>">
        <!--span class="glyphicon glyphicon-th-list"></span-->[{{item.ct}}]-{{item.title}}
      </h6>
      <p class="list-group-item-content"></p>
    </router-link>
  </template>
  </div>
  <suba-pagination v-bind:now="now" v-bind:count="count" v-on:updatePageNow="updatePageNow"></suba-pagination>
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
    this.fetchCategory()
  },
  methods: {
    fetchCategory () {
      var now = this.$cookie.get(this.$route.params.title)

      this.now = parseInt(now) || 1
      this.title = this.$route.params.title
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
        }
      }, (error) => {
        this.$emit('handleError', error !== undefined)
      })
    },
    fetchPagination: function () {
      this.$http.get(`/pagination/${this.title}/${this.limit}`).then((response) => {
        var data = response.data

        if (data.success === true) {
          this.count = data.msg
        }
      }, (error) => {
        this.$emit('handleError', error !== undefined)
      })
    },
    updatePageNow (now) {
      var cached = this.cache[now]

      this.$cookie.set(this.title, now, 1)
      this.now = now

      if (cached !== undefined) {
        this.list = cached
      } else {
        this.$http.get(`/category/${this.title}/${this.limit}/${this.now}`).then((response) => {
          var data = response.data

          if (data.success === true) {
            this.list = this.cache[now] = data.msg
          }
        }, (error) => {
          this.$emit('handleError', error !== undefined)
        })
      }
    },
    updatePageLimit (limit) {
      this.limit = limit
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
