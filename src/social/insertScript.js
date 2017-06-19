module.exports = function (src) {
  var a = document.createElement('script')
  var m = document.getElementsByTagName('script')[0]

  a.src = src
  a.async = 1
  m.parentNode.insertBefore(a, m)
}
