(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{313:function(t,e,o){var content=o(323);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(19).default)("c612aa3c",content,!0,{sourceMap:!1})},322:function(t,e,o){"use strict";o(313)},323:function(t,e,o){var n=o(18)(!1);n.push([t.i,'.edit-button{width:100%;height:40px;font-size:1em;transition:all .3;padding:7px 16px;display:flex;border:none;background:none;justify-content:space-between;vertical-align:center}.edit-button:after{content:"";width:8px;height:8px;border-bottom:2px solid #404a72;border-right:2px solid #404a72;transform:rotate(-45deg);margin:auto 0}.edit-button:hover{cursor:pointer}.book-button{width:100%;height:40px;font-size:1em;transition:all .3;padding:7px 16px;display:flex;border:none;background:none;justify-content:space-between;vertical-align:center}hr{margin:0}.bookbox{padding:0;background:#fff}.add-button{width:100%;height:40px;border-radius:8px;border:1px solid #3362a8;color:#3362a8;background:#fff}@media screen and (min-width:769px){.wrapper-top{background:#fff}}',""]),t.exports=n},340:function(t,e,o){"use strict";o.r(e);var n=o(12),r=(o(67),{layout:"defaultList",data:function(){return{Ref:"",commonList:this.$store.state.data.bookList,userList:this.$store.state.data.userBookList,anyBook:!1}},mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.Ref=t.$store.state.data.backIdentifier,t.$store.commit("data/falseFlag"),t.updateRef(),t.userList.length>0&&(t.anyBook=!0);case 4:case"end":return e.stop()}}),e)})))()},methods:{updateRef:function(){this.$nuxt.$emit("updateRef",this.Ref)},goAdd:function(){this.$router.push("bookedit")},goEdit:function(t){var e=t+this.$store.state.data.bookList.length;this.$store.commit("data/changeBookIndex",e),this.$store.commit("data/trueFlag"),this.$router.push("bookedit")}}}),c=(o(322),o(5)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"columns is-mobile is-centered",staticStyle:{width:"100%",margin:"0"}},[o("div",{staticClass:"column is-4-tablet is-11-mobile wrapper-top"},[o("div",{staticClass:"columns is-mobile is-multiline"},[o("div",{staticClass:"column is-12 mt-5 has-text-weight-semibold",staticStyle:{color:"#404a72"}},[t._v("ユーザーオリジナル教材")]),t._v(" "),t.anyBook?o("div",{staticClass:"column is-12"},[o("div",{staticClass:"columns is-mobile is-centered",staticStyle:{margin:"0"}},[o("div",{staticClass:"column is-12 bookbox",staticStyle:{border:"2px solid whitesmoke","border-radius":"8px"}},t._l(t.userList,(function(e,n){return o("div",{key:e},[0!=n?o("hr"):t._e(),t._v(" "),o("button",{staticClass:"edit-button",staticStyle:{color:"#404a72"},on:{click:function(e){return t.goEdit(n)}}},[t._v(t._s(e))])])})),0)])]):o("div",{staticClass:"column is-12 has-text-centered"},[t._v("まだ教材が登録されていません")]),t._v(" "),o("div",{staticClass:"column is-12 mt-5 has-text-weight-semibold",staticStyle:{color:"#404a72"}},[t._v("共通教材")]),t._v(" "),o("div",{staticClass:"column is-12 mt-2"},[o("div",{staticClass:"columns is-mobile is-centered",staticStyle:{margin:"0"}},[o("div",{staticClass:"column is-12 bookbox",staticStyle:{border:"2px solid whitesmoke","border-radius":"8px"}},t._l(t.commonList,(function(e,n){return o("div",{key:e},[0!=n?o("hr"):t._e(),t._v(" "),o("button",{staticClass:"book-button",staticStyle:{color:"#404a72"}},[t._v(t._s(e))])])})),0)])]),t._v(" "),o("div",{staticClass:"column is-12 mt-3 mb-6"},[o("div",{staticClass:"columns is-centered is-mobile",staticStyle:{margin:"0"}},[o("div",{staticClass:"column is-12",staticStyle:{padding:"0"}},[o("button",{staticClass:"button add-button",on:{click:t.goAdd}},[t._v("新しい教材を追加")])])])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);