(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[40],{"3a82":function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-item",{staticClass:"row",class:t.archive.completed?"bg-yellow-4":"bg-grey-4"},[o("div",{staticClass:"col-11 col-sm-10 row justify-between"},[o("q-item-section",{staticClass:"col-sm-8 col-12"},[t._v(t._s(t.archive.volumeInfo.title))]),o("q-item-section",{staticClass:"col-sm-3 col-12",attrs:{side:""}},[t._v("\n      "+t._s(t._f("displayDate")(t.archive.updatedAt))+"\n    ")])],1),o("q-item-section",{staticClass:"col-1 col-sm-2"},[o("div",{staticClass:"row justify-end"},[o("q-btn",{class:{"q-mr-xs":t.isDesktop},attrs:{flat:"",round:"",dense:"",icon:"eva-undo-outline",color:"light-blue-6"},on:{click:function(e){return t.promptToMoveBack(t._id)}}}),o("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"eva-trash-2-outline",color:"red-6"},on:{click:function(e){return t.promptToRemove(t._id)}}})],1)])],1)},s=[],n=o("ded3"),c=o.n(n),a=o("2f62"),r=o("bd4c"),l={props:["_id","archive"],computed:{isDesktop:function(){return window.innerWidth>600}},methods:c()(c()({},Object(a["b"])("books",["moveBook","removeMyBook"])),{},{promptToRemove:function(t){var e=this;this.$q.dialog({title:this.$t("confirm"),message:this.$t("removeBook1"),cancel:!0,persistent:!0}).onOk((function(){var t={_id:e._id,mode:"archive"};e.removeMyBook(t)}))},promptToMoveBack:function(t){var e=this;this.$q.dialog({title:this.$t("confirm"),message:this.$t("moveBook1"),cancel:!0,persistent:!0}).onOk((function(){var t=!e.archive.archive,o={updates:{_id:e.archive._id,archive:t},mode:"shelf"};e.moveBook(o),e.$emit("close")}))}}),filters:{displayDate:function(t){r["a"].formatDate;return r["a"].formatDate(t,"YYYY M/D h:mma")}}},m=l,d=o("2877"),u=o("66e5"),v=o("4074"),p=o("9c40"),f=o("eebe"),h=o.n(f),k=Object(d["a"])(m,i,s,!1,null,null,null);e["default"]=k.exports;h()(k,"components",{QItem:u["a"],QItemSection:v["a"],QBtn:p["a"]})}}]);