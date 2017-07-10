<style>
.detail_page {
    min-height: 300px;
    margin: 20px 0;
}

.detail_page .title {
    font-size: 26px;
    font-weight: 700;
    padding: 10px 0;
}

.detail_page .create_time {
    margin-top: 10px;
    font-size: 18px;
}

.detail_page .detail_content, .detail_page .detail_file {
    margin-top: 30px;
    line-height: 25px;
}

.detail_content img {
    height: auto !important;
    max-width: 100% !important;
    max-height: 100% !important;
}

.detail_page, #scu_comment {
    background: #fdfdfd;
    border: 1px solid #ececec;
    border-radius: 5px;
    padding: 20px;
}

#scu_comment {
    margin: 10px 0 10px 0;
}
</style>

<template>
<div class="detail_page" id="scu-fb" v-show="isNewsFetched">
  <div class="detail_header">
    <div class="title">{{story.title}}</div>
    <div class="create_time">
      <p>發表時間：{{story.ct}}</p>
      <p>更新時間：{{story.ut}}</p>
    </div>
    <div class="fb-share-button" v-bind:data-href="story.url" data-layout="button_count"></div>
    <div class="fb-like" data-href="https://www.facebook.com/scubaalumni" data-layout="standard" data-action="like" data-show-faces="false"></div>
    <div class="fb-follow" data-href="https://www.facebook.com/scubaalumni" data-layout="standard" data-show-faces="false"></div>
  </div>
  <div class="detail_content" v-html="story.content"></div>
    
  <div id="scu_comment" class="hidden">
    <div class="fb-comments" v-bind:data-href="story.url" data-width="100%" data-numposts="5"></div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      story: {},
      isNewsFetched: false
    }
  },
  created () {
    this.fetchNews()
  },
  methods: {
    fetchNews () {
      this.$http.get(`/get/story/${this.$route.to.params.title}`).then((response) => {
        var data = response.data
        var title = this.$route.to.params.title

        if (data.success === true) {
          this.story = data.msg
          this.isNewsFetched = true
          this.$emit('handleError', false)
          this.$emit('updateBreadcrumb', [{
            obj: {
              name: 'news',
              params: {
                title: title
              }
            },
            content: title
          }])
        } else {
          this.$emit('handleError', true)
        }
      }, (error) => {
        this.$emit('handleError', true)
        throw error
      })
    }
  },
  watch: {
    '$route': 'fetchNews'
  }
}
</script>
