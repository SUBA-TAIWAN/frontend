<style scoped>
.sidebar-block, .sidebar-wrapper, .sidebar-btn, .sidebar-content {
  position: fixed;
}

.sidebar-btn, .sidebar-content {
  -webkit-transition: all 0.1s ease;
  transition: all 0.1s ease;
}

.sidebar-block {
  top: 0;
  right: 0;
  z-index: 2;
}

.sidebar-btn {
  width: 36px;
  height: 36px;
  padding: 3px;
  background: #68250A;
  border-color: #68250A;
  border-radius: 0;
  top: 500px;
  right: 0;
  color: #fff;
  z-index: 2;
}

.sidebar-btn:hover {
  background: #98553A;
  cursor: pointer;
}

.sidebar-btn:focus {
  border-color: #98553A;
}

.sidebar-btn > .menubar{
  pointer-events: none;
  z-index: 1;
}

.sidebar-content {
  width: 300px;
  height: 200px;
  top: 39px;
  right: -340px;
  z-index: 2;
}

.sidebar-block.show-content .sidebar-btn{
  right: 300px !important;
}

.sidebar-block.show-content .sidebar-btn .menubar{
  -ms-transform: rotateZ(90deg);
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}

.sidebar-block.show-content .sidebar-wrapper, .sidebar-block.show-content .sidebar-wrapper .sidebar-content {
  right: 0;
}

.story-blocks {
  margin: 20px 0 0 0;
}

.sidebar-wrapper {
  min-width: 100%;
  min-height: 100%;
  background: rgba(125,125,125,0.7);
}
</style>

<template>
<div id="sidebar" class="sidebar-block hidden-print" v-bind:class="{'show-content': isShowContent}">
    <button class="sidebar-btn" v-on:click="showContent">
        <svg class="menubar" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="25px" height="25px" xml:space="preserve">
            <g class="svg-menu-toggle" fill="#fff">
                <path class="bar" d="M20.945,8.75c0,0.69-0.5,1.25-1.117,1.25H3.141c-0.617,0-1.118-0.56-1.118-1.25l0,0c0-0.69,0.5-1.25,1.118-1.25h16.688C20.445,7.5,20.945,8.06,20.945,8.75L20.945,8.75z">
                </path>
                <path class="bar" d="M20.923,15c0,0.689-0.501,1.25-1.118,1.25H3.118C2.5,16.25,2,15.689,2,15l0,0c0-0.689,0.5-1.25,1.118-1.25 h16.687C20.422,13.75,20.923,14.311,20.923,15L20.923,15z">
                </path>
                <path class="bar" d="M20.969,21.25c0,0.689-0.5,1.25-1.117,1.25H3.164c-0.617,0-1.118-0.561-1.118-1.25l0,0c0-0.689,0.5-1.25,1.118-1.25h16.688C20.469,20,20.969,20.561,20.969,21.25L20.969,21.25z">
                </path>
           </g>
        </svg>
    </button>
    <div class="sidebar-wrapper" v-on:click="showContent">
        <div class="sidebar-content">
            <div class="fb-page" data-href="https://www.facebook.com/scubaalumni/" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/scubaalumni/"><a href="https://www.facebook.com/scubaalumni/">東吳企管</a></blockquote></div></div>
        </div>
    </div>
</div>
</template>

<script>
export default{
  name: 'suba-sidebar',
  data () {
    return {
      isShowContent: false
    }
  },
  methods: {
    showContent: function () {
      if (this.isShowContent === false) {
        this.isShowContent = true
      } else {
        this.isShowContent = false
      }
    }
  }
}
</script>
