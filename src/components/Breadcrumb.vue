<style scoped>
.breadcrumb {
    background: #fff;
}

a.active {
    font-weight: 900;
}
</style>

<template>
<ol class="breadcrumb" v-if="isShow">
  <li><a href="/index" target="_self">首頁</a></li>
  <li v-for="link in links">
    <router-link v-bind:to="link.obj" v-bind:aria-label="link.content">{{link.content}}</router-link>
  </li>
</ol>
</template>

<script>
export default {
  name: 'suba-breadcrumb',
  props: {
    links: {
      type: Array,
      default: []
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    links (val, oldVal) {
      if (val.length > 0) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>
