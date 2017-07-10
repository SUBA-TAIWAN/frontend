<style scoped>
@media screen and (max-width: 767px) {
    #mainnav {
        background: #fff;
        position: initial;
        margin-bottom: 0;
    }

    .navbar-wrapper {
        min-width: 100%;
        min-height: 100%;
        background: rgba(125,125,125,0.7);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
    }

    .navbar-collapse {
        width: 250px;
        background: #fff;
        min-height: 100%;
        border-top: none;
        border-right: 2px solid #e7e7e7;
        position: fixed;
        top: 0;
        left: 0;
    }
}

@media screen and (min-width: 768px) {
    #mainnav {
        background: #fff;
        position: initial;
        margin-bottom: 0;
    }

    .navbar-wrapper {
        display: block;
    }
}
</style>

<template>
<nav id="mainnav" class="navbar navbar-default" role="navigation" v-if="isMainNavFetched">
  <div class="navbar-header">
    <button  type="button" class="navbar-toggle" v-on:click.prevent="toggleCollapse">
      <span class="sr-only">Toggle navigation</span>
    </button>
  </div>
        
  <div class="collapse navbar-wrapper" v-bind:class="{'collapse': isCollapse}" v-on:click="toggleCollapse">
      <div class="navbar-collapse">
      <ul class="nav navbar-nav navbar-left">
        <li v-for="mainitem in mainitems">
          <a class="linkpjax" v-bind:href="mainitem.url" v-bind:target="mainitem.target" v-bind:aria-label="mainitem.content">{{mainitem.content}}</a>
        </li>
        <li class="dropdown" v-for="dropitem in dropitems" v-bind:class="{'open': isOpen}">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" v-bind:aria-label="dropitem.parent.content" v-on:click.prevent="toggleDropdown">
            {{dropitem.parent.content}}<b class="caret"></b>
          </a>
          <span class="dropdown-arrow"></span>
          <ul class="dropdown-menu">
            <li v-for="child in dropitem.children">
              <a v-bind:href="child.url" v-bind:target="child.target" v-bind:aria-label="child.content">{{child.content}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'suba-mainnav',
  data () {
    return {
      mainitems: [],
      dropitems: [],
      isMainNavFetched: false,
      isOpen: false,
      isCollapse: true
    }
  },
  created () {
    this.fetchMainMenu()
  },
  methods: {
    fetchMainMenu () {
      this.$http.get('get/list/mainmenu').then((response) => {
        var data = response.data

        if (data.success === true) {
          this.mainitems = data.msg.main || []
          this.dropitems = data.msg.drop || []
          this.isMainNavFetched = true
        }
      }, (error) => {
        throw error
      })
    },
    toggleDropdown () {
      if (this.isOpen === false) {
        this.isOpen = true
      } else {
        this.isOpen = false
      }
    },
    toggleCollapse () {
      if (this.isCollapse === false) {
        this.isCollapse = true
      } else {
        this.isCollapse = false
      }
    }
  }
}
</script>
