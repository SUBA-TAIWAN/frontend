module.exports = function () {
  var i = window
  var r = 'ga'

  i['GoogleAnalyticsObject'] = r
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }
  i[r].l = 1 * new Date()

  require('./insertScript')('https://www.google-analytics.com/analytics.js')
  require('./insertScript')('https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.3&appId=840424812710756')
  require('./insertScript')('https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-56e8b406f66a3d05')

  window.ga('create', 'UA-66914050-1', 'auto')
}
