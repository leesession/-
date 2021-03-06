// 摘要：控制不同尺寸屏幕上的rem基准单位

// 以iPhone6位基准 375px 最大适配432px 屏幕
var maxAdaptation = 432
document.addEventListener('DOMContentLoaded', function () {
  var deviceWidth = document.documentElement.clientWidth > maxAdaptation ? maxAdaptation : document.documentElement.clientWidth
  document.documentElement.style.fontSize = (deviceWidth / 3.75) + 'px'
  var funID
  window.onresize = function () {
    clearTimeout(funID)
    funID = setTimeout(function () {
      var deviceW = document.documentElement.clientWidth > maxAdaptation ? maxAdaptation : document.documentElement.clientWidth
      document.documentElement.style.fontSize = (deviceW / 3.75) + 'px'
    }, 500)
  }
}, false)
