webpackJsonp([5],{115:function(t,e,a){function n(t){a(140)}var i=a(1)(a(125),a(157),n,null,null);t.exports=i.exports},125:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{story:{},isNewsFetched:!1}},created:function(){this.fetchNews()},methods:{fetchNews:function(){var t=this,e=this.$route.params.title;this.$http.get("/story/"+e).then(function(a){var n=a.data;!0===n.success?(t.story=n.msg,t.isNewsFetched=!0,t.$emit("updateBreadcrumb",[{obj:{name:"news",params:{title:e}},content:e}])):t.$emit("handleError",!0)},function(e){t.$emit("handleError",void 0!==e)})}},watch:{$route:"fetchNews"}}},132:function(t,e,a){e=t.exports=a(110)(!0),e.push([t.i,".detail_page{min-height:300px;margin:20px 0}.detail_page .title{font-size:26px;font-weight:700;padding:10px 0}.detail_page .create_time{margin-top:10px;font-size:18px}.detail_page .detail_content,.detail_page .detail_file{margin-top:30px;line-height:25px}.detail_content img{height:auto!important;max-width:100%!important;max-height:100%!important}#scu_comment,.detail_page{background:#fdfdfd;border:1px solid #ececec;border-radius:5px;padding:20px}#scu_comment{margin:10px 0}","",{version:3,sources:["C:/Users/engineer/Desktop/frontend/src/views/News.vue"],names:[],mappings:"AACA,aACI,iBAAkB,AAClB,aAAe,CAClB,AACD,oBACI,eAAgB,AAChB,gBAAiB,AACjB,cAAgB,CACnB,AACD,0BACI,gBAAiB,AACjB,cAAgB,CACnB,AACD,uDACI,gBAAiB,AACjB,gBAAkB,CACrB,AACD,oBACI,sBAAwB,AACxB,yBAA2B,AAC3B,yBAA4B,CAC/B,AACD,0BACI,mBAAoB,AACpB,yBAA0B,AAC1B,kBAAmB,AACnB,YAAc,CACjB,AACD,aACI,aAAsB,CACzB",file:"News.vue",sourcesContent:["\n.detail_page {\r\n    min-height: 300px;\r\n    margin: 20px 0;\n}\n.detail_page .title {\r\n    font-size: 26px;\r\n    font-weight: 700;\r\n    padding: 10px 0;\n}\n.detail_page .create_time {\r\n    margin-top: 10px;\r\n    font-size: 18px;\n}\n.detail_page .detail_content, .detail_page .detail_file {\r\n    margin-top: 30px;\r\n    line-height: 25px;\n}\n.detail_content img {\r\n    height: auto !important;\r\n    max-width: 100% !important;\r\n    max-height: 100% !important;\n}\n.detail_page, #scu_comment {\r\n    background: #fdfdfd;\r\n    border: 1px solid #ececec;\r\n    border-radius: 5px;\r\n    padding: 20px;\n}\n#scu_comment {\r\n    margin: 10px 0 10px 0;\n}\r\n"],sourceRoot:""}])},140:function(t,e,a){var n=a(132);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(111)("4bef73bc",n,!0)},157:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.isNewsFetched?a("div",{staticClass:"detail_page",attrs:{id:"scu-fb"}},[a("div",{staticClass:"detail_header"},[a("div",{staticClass:"title"},[t._v(t._s(t.story.title))]),t._v(" "),a("div",{staticClass:"create_time"},[a("p",[t._v("發表時間："+t._s(t.story.ct))]),t._v(" "),a("p",[t._v("更新時間："+t._s(t.story.ut))])]),t._v(" "),a("div",{staticClass:"fb-share-button",attrs:{"data-href":t.story.url,"data-layout":"button_count"}}),t._v(" "),a("div",{staticClass:"fb-like",attrs:{"data-href":"https://www.facebook.com/scubaalumni","data-layout":"standard","data-action":"like","data-show-faces":"false"}}),t._v(" "),a("div",{staticClass:"fb-follow",attrs:{"data-href":"https://www.facebook.com/scubaalumni","data-layout":"standard","data-show-faces":"false"}})]),t._v(" "),a("div",{staticClass:"detail_content",domProps:{innerHTML:t._s(t.story.content)}})]):t._e()},staticRenderFns:[]}}});
//# sourceMappingURL=5.1c8fe79f8a0d87f4bb15.js.map