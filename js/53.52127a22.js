(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[53],{"1b96":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:"",link:""},on:{click:function(t){return e.updatePage(e._id)}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.title))]),e.chapter?a("q-item-label",{attrs:{caption:""}},[e._v(e._s(e.chapter))]):e._e(),e.pageFrom||e.pageTo?a("q-item-label",{attrs:{caption:""}},[e._v(e._s(e.$t("page"))+" "+e._s(e.pageFrom)+" - "+e._s(e.pageTo))]):e._e()],1)],1)},p=[],n={props:["_id","title","chapter","pageFrom","pageTo"],methods:{updatePage:function(e){this.$emit("update-page",e)}}},l=n,r=a("2877"),c=a("66e5"),o=a("4074"),s=a("0170"),m=a("714f"),u=a("eebe"),_=a.n(u),d=Object(r["a"])(l,i,p,!1,null,null,null);t["default"]=d.exports;_()(d,"components",{QItem:c["a"],QItemSection:o["a"],QItemLabel:s["a"]}),_()(d,"directives",{Ripple:m["a"]})}}]);