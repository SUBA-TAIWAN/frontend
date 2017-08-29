<style scoped>
</style>

<template>
<div class="panel">
    <div class="panel-body">
        <div class="alert" v-bind:class="{ 'alert-danger': !donation.success, 'alert-success': donation.success }" v-if="hasMsg">
            <div class="pull-right">
                <button type="button" class="close" aria-label="Close" v-on:click.prevent.self="closeAlert"><span aria-hidden="true">&times;</span></button>
            </div>
            <p v-for="msg in donation.msg">{{ msg }}</p>
        </div>
        <div class="table-responsive" v-if="donation.success">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <td colspan="2">
                            <h4>捐款資訊</h4>
                        </td>
                    </tr>
                    </thead>
                <tbody>
                    <tr>
                        <td>捐款號碼</td>
                        <td>{{ donation.donation.num }}</td>
                    </tr>
                    <tr>
                        <td>捐款人抬頭</td>
                        <td>{{ donation.donation.title }}</td>
                    </tr>
                    <tr>
                        <td>捐款金額</td>
                        <td>{{ donation.donation.amt }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      donation: {
        donation: {},
        success: false,
        msg: []
      }
    }
  },
  computed: {
    hasMsg () {
      return this.donation.msg && this.donation.msg.length > 0
    }
  },
  mounted () {
    if (window.donation !== undefined) {
      this.donation = window.donation
    } else {
      this.donation.msg.push('捐款失敗，請再重新確認！')
      this.donation.msg.push('如有任何問題請聯絡我們！')
    }

    window.setTimeout(function () {
      this.$router.push({name: 'home'})
    }.bind(this), 10000)
  },
  methods: {
    closeAlert: function () {
      this.donation.msg = []
    }
  }
}
</script>
