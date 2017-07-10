<style scoped>
@media screen and (max-width:480px) {
    .story {
        padding-left: 1%;
    }

    .story-block {
        width: 95%;
    }
}

@media screen and (max-width:767px) and (min-width:481px) {
    .story {
        padding-left: 2%;
    }

    .story-block {
        width: 47%;
        margin-right: 0.1%;
    }
}

@media screen and (min-width: 768px) {
    .story-block {
        width: 31%;
    }
}

.i_star {
    background: url(/img/icon.png);
}

.i_news {
    background: url(/img/icon.png) -260px 0;
}

.i_active {
    background: url(/img/icon.png) -180px -120px;
}

.i_report {
    background: url(/img/icon.png) -190px -105px;
}

.i_cor {
    background: url(/img/icon.png) -190px -70px;
}

.i_people {
    background: url(/img/icon.png) -225px -105px;
}

.story-blocks {
    margin-top: 20px;
}

.story section {
    min-height: 250px;
    background: #ccc;
}

.story-content {
    width: 100%;
    text-align: center;
    overflow: hidden;
}

.story-block {
    height: 255px;
    float: left;
    margin: 0 5px 9px 5px;
    background: #FFf3ef;
    border: 1px solid #FcE5E2;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    text-align: left;
}

.story-block .block_title {
    margin: 0;
    padding: 10px 0;
    color: #fff;
    font-size: 20px;
}

.story-block .block_title span {
    display: block;
    position: relative;
    padding-left: 40px;
    width: 140px;
    left: 0;
}

.story-block .block_title span b {
    display: block;
    position: absolute;
    left: 8px;
    top: -2px;
    width: 30px;
    height: 30px;
}

.story-block img {
    margin-top: 10px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 1px solid #666;
}

.story-block ul {
    padding-left: 0;
    margin-left: 0;
}

.story-block ul li {
    list-style: none;
    margin-top: 10px;
    margin-left: 10px;
    overflow: hidden;
    height: 25px;
    line-height: 25px;
}

.story-block .show-more {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 14px;
}

.block-2 {
    height: 520px;
    margin-bottom: 8px;
}

.heading0 {
    background: -webkit-linear-gradient(left, rgba(168,0,0,1), rgba(255,0,0,0)); 
    background: -o-linear-gradient(right, rgba(168,0,0,1), rgba(255,0,0,0));
    background: -moz-linear-gradient(right, rgba(168,0,0,1), rgba(255,0,0,0));
    background: linear-gradient(to right, rgba(168,0,0,1), rgba(255,0,0,0));
}

.heading1 {
    background: -webkit-linear-gradient(left, rgba(188,86,0,1), rgba(188,86,0,0)); 
    background: -o-linear-gradient(right, rgba(188,86,0,1), rgba(188,86,0,0));
    background: -moz-linear-gradient(right, rgba(188,86,0,1), rgba(188,86,0,0));
    background: linear-gradient(to right, rgba(188,86,0,1), rgba(188,86,0,0));
}

.heading2 {
    background: -webkit-linear-gradient(left, rgba(36,107,36,1), rgba(36,107,36,0)); 
    background: -o-linear-gradient(right, rgba(36,107,36,1), rgba(36,107,36,0));
    background: -moz-linear-gradient(right, rgba(36,107,36,1), rgba(36,107,36,0));
    background: linear-gradient(to right, rgba(36,107,36,1), rgba(36,107,36,0));
}

.heading3 {
    background: -webkit-linear-gradient(left, rgba(0,41,122,1), rgba(0,41,122,0)); 
    background: -o-linear-gradient(right, rgba(0,41,122,1), rgba(0,41,122,0));
    background: -moz-linear-gradient(right, rgba(0,41,122,1), rgba(0,41,122,0));
    background: linear-gradient(to right, rgba(0,41,122,1), rgba(0,41,122,0));
}

.heading4 {
    background: -webkit-linear-gradient(left, rgba(138,92,46,1), rgba(138,92,46,0)); 
    background: -o-linear-gradient(right, rgba(138,92,46,1), rgba(138,92,46,0));
    background: -moz-linear-gradient(right, rgba(138,92,46,1), rgba(138,92,46,0));
    background: linear-gradient(to right, rgba(138,92,46,1), rgba(138,92,46,0));
}
</style>

<template>
<div>
  <suba-banner></suba-banner>
  <div class="story-blocks" v-show="isStoryBlocksFetched">
    <div class="story-content">
      <div class="story-block" v-bind:class="storyblock.class" v-for="storyblock in storyblocks">
        <router-link v-bind:to="{name: 'category', params: {title: storyblock.title}}" v-bind:aria-label="storyblock.title">
          <h6 class="block_title" v-bind:class="'heading' + storyblock.order"><span><b v-bind:class="storyblock.icon"></b>{{storyblock.title}}</span></h6>
        </router-link>
        <ul>
          <li v-for="story in storyblock.list">
            <router-link v-bind:to="{name: 'news', params: {title: story.title}}" v-bind:aria-label="story.title">
              {{story.stitle}}
            </router-link>
          </li>
        </ul>
        <span class="show-more">
          <router-link v-bind:to="{name: 'category', params: {title: storyblock.title}}" v-bind:aria-label="storyblock.title">
            更多
          </router-link>
        </span>
      </div>
    </div>
    <hr>
  </div>
</div>
</template>

<script>
import SubaBanner from '@/components/Banner.vue'

export default {
  components: {
    SubaBanner
  },
  data () {
    return {
      storyblocks: [],
      isStoryBlocksFetched: false
    }
  },
  created () {
    this.fetchStoryBlocks()
  },
  methods: {
    fetchStoryBlocks: function () {
      this.$http.get('/storyblocks').then((response) => {
        var data = response.data

        if (data.success === true) {
          this.storyblocks = data.msg
          this.isStoryBlocksFetched = true
          this.$emit('handleError', false)
        } else {
          this.$emit('handleError', true)
        }
      }, (error) => {
        this.$emit('handleError', error !== undefined)
      })
    }
  },
  watch: {
    '$route': 'fetchStoryBlocks'
  }
}
</script>
