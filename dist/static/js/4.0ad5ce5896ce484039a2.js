webpackJsonp([4],{116:function(t,e,o){function r(t){o(136)}var A=o(1)(o(126),o(153),r,null,null);t.exports=A.exports},126:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{page:{},isPageFetched:!1}},created:function(){this.fetchPage()},methods:{fetchPage:function(){var t=this,e=this.$route.params.title;this.$http.get("/page/"+e).then(function(o){var r=o.data;!0===r.success?(t.page=r.msg,t.isPageFetched=!0,t.$emit("updateBreadcrumb",[{obj:{name:"page",params:{title:e}},content:e}])):t.$emit("handleError",!0)},function(e){throw t.$emit("handleError",!0),e})}},watch:{$route:"fetchPage"}}},128:function(t,e,o){e=t.exports=o(110)(!0),e.push([t.i,".page{margin-top:30px}.date{float:right;margin-right:20px}.page table{border-collapse:collapse;border-spacing:0;width:100%;margin-top:1.5em;margin-bottom:1.5em}.page table td,.project table th{padding:10px;border-bottom-color:#f2f2f2;border-bottom-width:1px;border-bottom-style:solid}.page table tbody tr:nth-child(2n){background:#f5f5f5;box-shadow:inset 0 1px 0 hsla(0,0%,100%,.8);-moz-box-shadow:0 1px 0 hsla(0,0%,100%,.8) inset;-webkit-box-shadow:0 1px 0 hsla(0,0%,100%,.8) inset}.page table th{text-align:left;border-bottom-width:1px;border-bottom-style:solid;text-shadow:0 1px 0 hsla(0,0%,100%,.5);background-image:-ms-linear-gradient(#f5f5f5,#eee);background-color:#eee}.page table th:first-child{border-radius:6px 0 0;-moz-border-radius:6px 0 0;-webkit-border-radius:6px 0 0}.page table th:last-child{border-radius:0 6px 0 0;-moz-border-radius:0 6px 0 0;-webkit-border-radius:0 6px 0 0}.page table th:only-child{border-radius:6px 6px 0 0;-moz-border-radius:6px 6px 0 0;-webkit-border-radius:6px 6px 0 0}.page table tfoot td{border-top-color:#fff;border-bottom-color:currentColor;border-top-width:2px;border-bottom-width:0;border-top-style:solid;border-bottom-style:none;background-color:#eee;line-height:10px}.page table tfoot td:first-child{border-radius:0 0 0 6px;-moz-border-radius:0 0 0 6px;-webkit-border-radius:0 0 0 6px}.page table tfoot td:last-child{border-radius:0 0 6px;-moz-border-radius:0 0 6px;-webkit-border-radius:0 0 6px}.page table tfoot td:only-child{-moz-border-radius:0 0 6px 6px}.page .content img{height:auto!important;max-width:100%!important;max-height:100%!important}","",{version:3,sources:["/var/www/laravel/public/frontend/src/views/Page.vue"],names:[],mappings:"AACA,MACI,eAAiB,CACpB,AACD,MACI,YAAa,AACb,iBAAmB,CACtB,AACD,YACI,yBAA0B,AAC1B,iBAAkB,AAClB,WAAY,AACZ,iBAAkB,AAClB,mBAAqB,CACxB,AACD,iCACI,aAAc,AACd,4BAA6B,AAC7B,wBAAyB,AACzB,yBAA2B,CAC9B,AACD,mCACI,mBAAoB,AACpB,4CAAkD,AAClD,iDAAuD,AACvD,mDAA0D,CAC7D,AACD,eACI,gBAAiB,AACjB,wBAAyB,AACzB,0BAA2B,AAC3B,uCAA6C,AAC7C,mDAAqD,AACrD,qBAAuB,CAC1B,AACD,2BACI,sBAAuB,AACvB,2BAA4B,AAC5B,6BAA+B,CAClC,AACD,0BACI,wBAAyB,AACzB,6BAA8B,AAC9B,+BAAiC,CACpC,AACD,0BACI,0BAA2B,AAC3B,+BAAgC,AAChC,iCAAmC,CACtC,AACD,qBACI,sBAAuB,AACvB,iCAAkC,AAClC,qBAAsB,AACtB,sBAAuB,AACvB,uBAAwB,AACxB,yBAA0B,AAC1B,sBAAuB,AACvB,gBAAkB,CACrB,AACD,iCACI,wBAAyB,AACzB,6BAA8B,AAC9B,+BAAiC,CACpC,AACD,gCACI,sBAAuB,AACvB,2BAA4B,AAC5B,6BAA+B,CAClC,AACD,gCACI,8BAAgC,CACnC,AACD,mBACI,sBAAwB,AACxB,yBAA2B,AAC3B,yBAA4B,CAC/B",file:"Page.vue",sourcesContent:["\n.page {\n    margin-top: 30px;\n}\n.date {\n    float: right;\n    margin-right: 20px;\n}\n.page table {\n    border-collapse: collapse;\n    border-spacing: 0;\n    width: 100%;\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n}\n.page table td, .project table th {\n    padding: 10px;\n    border-bottom-color: #f2f2f2;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n}\n.page table tbody tr:nth-child(2n) {\n    background: #f5f5f5;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .8);\n    -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, .8) inset;\n    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, .8) inset;\n}\n.page table th {\n    text-align: left;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    text-shadow: 0 1px 0 rgba(255, 255, 255, .5);\n    background-image: -ms-linear-gradient(#f5f5f5, #eee);\n    background-color: #eee;\n}\n.page table th:first-child {\n    border-radius: 6px 0 0;\n    -moz-border-radius: 6px 0 0;\n    -webkit-border-radius: 6px 0 0;\n}\n.page table th:last-child {\n    border-radius: 0 6px 0 0;\n    -moz-border-radius: 0 6px 0 0;\n    -webkit-border-radius: 0 6px 0 0;\n}\n.page table th:only-child {\n    border-radius: 6px 6px 0 0;\n    -moz-border-radius: 6px 6px 0 0;\n    -webkit-border-radius: 6px 6px 0 0;\n}\n.page table tfoot td {\n    border-top-color: #fff;\n    border-bottom-color: currentColor;\n    border-top-width: 2px;\n    border-bottom-width: 0;\n    border-top-style: solid;\n    border-bottom-style: none;\n    background-color: #EEE;\n    line-height: 10px;\n}\n.page table tfoot td:first-child {\n    border-radius: 0 0 0 6px;\n    -moz-border-radius: 0 0 0 6px;\n    -webkit-border-radius: 0 0 0 6px;\n}\n.page table tfoot td:last-child {\n    border-radius: 0 0 6px;\n    -moz-border-radius: 0 0 6px;\n    -webkit-border-radius: 0 0 6px;\n}\n.page table tfoot td:only-child {\n    -moz-border-radius: 0 0 6px 6px;\n}\n.page .content img {\n    height: auto !important;\n    max-width: 100% !important;\n    max-height: 100% !important;\n}\n"],sourceRoot:""}])},136:function(t,e,o){var r=o(128);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);o(111)("9605161e",r,!0)},153:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.isPageFetched?o("div",{staticClass:"page",class:t.page.title},[o("div",{staticClass:"title"},[o("h4",[t._v(t._s(t.page.title))])]),t._v(" "),o("div",{staticClass:"content",domProps:{innerHTML:t._s(t.page.content)}}),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"date"},[o("p",[t._v("更新時間:"+t._s(t.page.ut))])])]):t._e()},staticRenderFns:[]}}});
//# sourceMappingURL=4.0ad5ce5896ce484039a2.js.map