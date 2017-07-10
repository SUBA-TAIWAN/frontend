<style scoped>
.jssora21l, .jssora21r, .jssora21ldn, .jssora21rdn
{
    position: absolute;
    cursor: pointer;
    display: block;
    background: url(/img/a21.png) center center no-repeat;
    overflow: hidden;
}
.jssora21l { background-position: -3px -33px; }
.jssora21r { background-position: -63px -33px; }
.jssora21l:hover { background-position: -123px -33px; }
.jssora21r:hover { background-position: -183px -33px; }
.jssora21ldn { background-position: -243px -33px; }
.jssora21rdn { background-position: -303px -33px; }
 .selected a{text-decoration: underline !important;color:blue !important;}

.jssorb21 div, .jssorb21 div:hover, .jssorb21 .av
{
    background: url(/img/b21.png) no-repeat;
    overflow:hidden;
    cursor: pointer;
}
.jssorb21 div { background-position: -5px -5px; }
.jssorb21 div:hover, .jssorb21 .av:hover { background-position: -35px -5px; }
.jssorb21 .av { background-position: -65px -5px; }
.jssorb21 .dn, .jssorb21 .dn:hover { background-position: -95px -5px; }
</style>

<template>
<div id="banner" style="position: relative; margin: 20px auto;top: 0px; left: 0px; width: 1300px; height: 500px; overflow: hidden;" v-if="isBannersFetched">
  <div u="loading" style="position: absolute; top: 0px; left: 0px;">
    <div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block;top: 0px; left: 0px; width: 100%;height: 100%;">
    </div>
    <div style="position: absolute; display: block; background: url('img/loading.gif') no-repeat center center;top: 0px; left: 0px; width: 100%; height: 100%;">
    </div>
  </div>
  <div u="slides" style="cursor: move; position: absolute; left: 0px; top: 0px; width: 1300px;height: 500px; overflow: hidden;">
    <div v-for="banner in banners">
      <img u="image" v-bind:src="banner.url" v-bind:alt="banner.alt">
      <!--div class='banner_desc'style="position: absolute; width: 100%; height: 120px; top: 300px; left: 00px; padding: 10px;text-align: left; line-height: 50px; font-size: 30px;color: #FFFFFF;">
      </div-->
    </div>
  </div>
  <div u="navigator" class="jssorb21" style="position: absolute; bottom: 26px; left: 6px;">
    <div u="prototype" style="position: absolute; width: 19px; HEIGHT: 19px; text-align:center; line-height:19px; color:white; font-size:12px;"></div>
  </div>
  <span u="arrowleft" class="jssora21l" style="width: 55px; height: 55px; top: 123px; left: 8px;">
  </span>
  <span u="arrowright" class="jssora21r" style="width: 55px; height: 55px; top: 123px; right: 8px">
  </span>
  <a style="display: none" href="http://www.jssor.com">javascript</a>
</div>
</template>

<script>
export default {
  name: 'suba-banner',
  data () {
    return {
      banners: [],
      isBannersFetched: false
    }
  },
  created () {
    this.fetchBanners()
  },
  destroyed () {
    this.clear()
  },
  methods: {
    fetchBanners: function () {
      this.$http.get('/list/banner').then((response) => {
        var data = response.data

        if (data.success === true) {
          this.banners = data.msg
          this.isBannersFetched = true
          this.$nextTick(function () {
            this.run()
          })
        } else {
          this.$emit('handleError', true)
        }
      }, (error) => {
        this.$emit('handleError', true)
        throw error
      })
    },
    run: function () {
      require(['jssorslider'], function () {
        var _CaptionTransitions = []
        var d = document
        var w = window
        var $JssorEasing$ = w.$JssorEasing$
        var $JssorCaptionSlider$ = w.$JssorCaptionSlider$
        var $JssorBulletNavigator$ = w.$JssorBulletNavigator$
        var $JssorArrowNavigator$ = w.$JssorArrowNavigator$
        var $JssorSlider$ = w.$JssorSlider$
        var options = {
          $FillMode: 2,
          $AutoPlay: true,
          $AutoPlayInterval: 4000,
          $PauseOnHover: 1,
          $ArrowKeyNavigation: true,
          $SlideEasing: $JssorEasing$.$EaseOutQuint,
          $SlideDuration: 800,
          $MinDragOffsetToSlide: 20,
          $SlideSpacing: 0,
          $DisplayPieces: 1,
          $ParkingPosition: 0,
          $UISearchMode: 1,
          $PlayOrientation: 1,
          $DragOrientation: 1,
          $CaptionSliderOptions: {
            $Class: $JssorCaptionSlider$,
            $CaptionTransitions: _CaptionTransitions,
            $PlayInMode: 1,
            $PlayOutMode: 3
          },
          $BulletNavigatorOptions: {
            $Class: $JssorBulletNavigator$,
            $ChanceToShow: 2,
            $AutoCenter: 1,
            $Steps: 1,
            $Lanes: 1,
            $SpacingX: 8,
            $SpacingY: 8,
            $Orientation: 1,
            $Scale: false
          },
          $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$,
            $ChanceToShow: 1,
            $AutoCenter: 2,
            $Steps: 1
          }
        }
        w.subaBanner = new $JssorSlider$('banner', options)

        _CaptionTransitions['L'] = { $Duration: 900, x: 0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 }
        _CaptionTransitions['R'] = { $Duration: 900, x: -0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 }
        _CaptionTransitions['T'] = { $Duration: 900, y: 0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 }
        _CaptionTransitions['B'] = { $Duration: 900, y: -0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 }
        _CaptionTransitions['ZMF|10'] = { $Duration: 900, $Zoom: 11, $Easing: { $Zoom: $JssorEasing$.$EaseOutQuad, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
        _CaptionTransitions['RTT|10'] = { $Duration: 900, $Zoom: 11, $Rotate: 1, $Easing: { $Zoom: $JssorEasing$.$EaseOutQuad, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInExpo }, $Opacity: 2, $Round: { $Rotate: 0.8 } }
        _CaptionTransitions['RTT|2'] = { $Duration: 900, $Zoom: 3, $Rotate: 1, $Easing: { $Zoom: $JssorEasing$.$EaseInQuad, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInQuad }, $Opacity: 2, $Round: { $Rotate: 0.5 } }
        _CaptionTransitions['RTTL|BR'] = { $Duration: 900, x: -0.6, y: -0.6, $Zoom: 11, $Rotate: 1, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Top: $JssorEasing$.$EaseInCubic, $Zoom: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear, $Rotate: $JssorEasing$.$EaseInCubic }, $Opacity: 2, $Round: { $Rotate: 0.8 } }
        _CaptionTransitions['CLIP|LR'] = { $Duration: 900, $Clip: 15, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic }, $Opacity: 2 }
        _CaptionTransitions['MCLIP|L'] = { $Duration: 900, $Clip: 1, $Move: true, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic } }
        _CaptionTransitions['MCLIP|R'] = { $Duration: 900, $Clip: 2, $Move: true, $Easing: { $Clip: $JssorEasing$.$EaseInOutCubic } }

        function scaleSlider () {
          var bodyWidth = d.body.clientWidth

          if (bodyWidth && w.subaBanner) {
            w.subaBanner.$ScaleWidth(Math.min(bodyWidth, d.querySelector('#header').clientWidth))
          } else {
            setTimeout(scaleSlider, 30)
          }
        }
        w.scaleSlider = scaleSlider
        w.addEventListener('resize', w.scaleSlider, false)
        w.addEventListener('orientationchange', w.scaleSlider, false)
        scaleSlider()
      })
    },
    clear () {
      try {
        window.removeEventListener('resize', window.scaleSlider, false)
        window.removeEventListener('orientationchange', window.scaleSlider, false)
        window.scaleSlider = null
        window.subaBanner.$UnlistenAll
        window.subaBanner.$Destroy
        window.subaBanner = null
      } catch (e) {}
    }
  }
}
</script>
