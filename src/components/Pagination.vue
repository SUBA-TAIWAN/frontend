<style scoped>
a.active {
  text-decoration: underline;
}

li {
  cursor: pointer;
}

li.disabled {
  cursor: not-allowed;
}

li.disabled a{
  color: #ccc;
  cursor: not-allowed;
}
</style>

<template>
<nav aria-label="page navigation" v-if="count > 0">
  <ul class="pagination-plain">
    <li v-show="count > 1" v-bind:class="{'disabled': now <= 1}">
      <a aria-label="Previous" v-on:click.stop.prevent="changePage(now-1)" v-on:keyup.left="changePage(now-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-for="page in count">
        <a v-bind:class="{'active': (page === now)}" v-on:click.stop.prevent="changePage(page)">{{ page }}</a>
    </li>
    <li v-show="count > 1" v-bind:class="{'disabled': now >= count}">
      <a aria-label="Next" v-on:click.stop.prevent="changePage(now+1)" v-on:keyup.left="changePage(now+1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  name: 'suba-pagination',
  props: {
    now: {
      type: Number,
      default: 1
    },
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changePage: function (page) {
      if (this.now !== page) {
        if (page <= 0) {
          page = 1
        } else if (page >= this.count) {
          page = this.count
        }
        this.now = page
      }
    }
  },
  watch: {
    now (val, oldVal) {
      this.$emit('updatePageNow', val)
    }
  }
}
</script>
