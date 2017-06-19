<style scoped>
div {
  background: #68250A;
  width:100%;
  height:40px;
  list-style:none;
  position: relative;
  z-index: 2;
  border-bottom: 5px #FFFF19 solid;
}

ul {
  margin: 0 auto;
  background: #68250A;
  max-width: 1024px;
  height:35px;
  list-style:none;
  padding-left: 0px;
  position: relative;
  z-index:2;
}

ul li {
  float: right;
  height:20px;
  margin-left: 10px;
}

a {
  padding: 5px;
  color: #fff;
  margin-left: 15px;
  font-size:15px;
  display:block;
  float: right;
}

a:visited, a:linked {
  color: #fff;
}

a:hover {
  background: #78351a;
}
</style>

<template>
<div id="topnav" v-show="isTopNavFetched">
  <ul>
    <li v-for="topitem in topitems">
        <a v-bind:href="topitem.url" v-bind:target="topitem.target" v-bind:aria-label="topitem.content">{{topitem.content}}</a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'suba-topnav',
  data () {
    return {
      topitems: [],
      isTopNavFetched: false
    }
  },
  created () {
    this.fetchTopMenu()
  },
  methods: {
    fetchTopMenu () {
      this.$http.get('/get/list/topmenu').then((res) => {
        var data = res.data

        if (data.success === true) {
          this.topitems = data.msg.top
          this.isTopNavFetched = true
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    '$route': 'fetchTopMenu'
  }
}
</script>
