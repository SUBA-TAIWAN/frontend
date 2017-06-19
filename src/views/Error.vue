<style scoped></style>

<template>
<div class="panel content-error">
  <div class="panel-heading">
    <h4>糟糕！系統出了一些問題！</h4>
  </div>
  <div class="error panel-body alert alert-warning" role="alert">
    <p>很抱歉，系統發生錯誤。</p>
    <p>可能是系統無法處理您的請求或是內部伺服器的問題。</p>
    <p>造成您的不便敬請見諒。</p>
    <p>如果還有任何問題，也歡迎與我們聯繫<a href="mailto:baalumni@scu.edu.tw"><span class="glyphicon glyphicon-envelope"></span></a>！</p>
    <p>謝謝！</p>
  </div>
</div>
</template>

<script>
export default {
  watch: {
    'isError' (val, oldVal) {
      if (val !== oldVal) {
        this.isError = val

        if (val === true) {
          document.title = '糟糕! 發生錯誤!'
        }
      }
    }
  }
}
</script>
