<style scoped>
@media screen and (max-width:480px) {
    #logo, #logo img {
        max-width: 180px;
        padding-left: 1%;
    }
}

@media screen and (max-width:767px) and (min-width:481px) {
    #logo, #logo img {
        max-width: 220px;
        padding-left: 1%;
    }
}

@media screen and (min-width:768px) {
    #logo, #logo img {
        max-width: 300px;
    }
}

#logo img {
    position: relative;
    top: 10px;
    z-index: 1;
}
</style>

<template>
<div class="container" id="content">    
  <div id="header">
    <div id="logo">
      <a href="/index" target="_self">
        <img src="/img/logo/fscuba.jpg" alt="東吳企管文教基金會">
      </a>
    </div>
  </div>

  <suba-mainnav></suba-mainnav>
  <suba-marquee></suba-marquee>
  <suba-breadcrumb v-bind:links="breadcrumbLinks"></suba-breadcrumb>
  <router-view v-on:handleError="handleError" v-on:updateBreadcrumb="updateBreadcrumb"></router-view>
  <suba-error v-if="isError"></suba-error>
</div>
</template>

<script>
import SubaMainnav from './Mainnav.vue'
import SubaMarquee from './Marquee.vue'
import SubaBreadcrumb from './Breadcrumb.vue'
import SubaError from '@/views/Error.vue'

export default {
  name: 'suba-content',
  components: {
    SubaMainnav, SubaMarquee, SubaBreadcrumb, SubaError
  },
  data () {
    return {
      isError: false,
      breadcrumbLinks: []
    }
  },
  methods: {
    handleError (error) {
      this.isError = error
    },
    updateBreadcrumb (links) {
      this.breadcrumbLinks = links
    }
  }
}
</script>
