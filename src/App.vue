<style></style>

<template>
  <div id="app">
    <suba-topnav></suba-topnav>
    <suba-sidebar></suba-sidebar>
    <suba-content></suba-content>
    <suba-footer></suba-footer>
  </div>
</template>

<script>
import SubaTopnav from '@/components/TopNav.vue'
import SubaSidebar from '@/components/SideBar.vue'
// import SubaContent from '@/components/Content.vue'
import SubaFooter from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    SubaTopnav, SubaSidebar, SubaFooter
    // , SubaContent
  }
}
</script>
