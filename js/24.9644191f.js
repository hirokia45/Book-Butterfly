(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[24],{"321f":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-card",{staticClass:"absolute full-width"},[a("modal-header",[e._v(e._s(e.$t("editAvatarHeader")))]),a("form",{on:{submit:function(t){return t.preventDefault(),e.submitForm.apply(null,arguments)}}},[a("q-card-section",{staticClass:"q-pt-none"},[a("div",{staticClass:"row q-mb-sm"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.fileUploaded,expression:"fileUploaded"}],staticClass:"image-frame q-pa-md bg-white"},[a("canvas",{ref:"canvas",staticClass:"full-width",attrs:{height:"240"}})])]),a("div",{staticClass:"row q-mb-sm"},[a("q-file",{staticClass:"bg-white file-picker-field",attrs:{accept:"image/*",label:e.$t("chooseImage"),outlined:""},on:{input:e.captureImageFileUpload},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"eva-attach-outline"}})]},proxy:!0}]),model:{value:e.imageUpload,callback:function(t){e.imageUpload=t},expression:"imageUpload"}})],1),a("modal-button")],1)],1)],1)},n=[],o=a("ded3"),s=a.n(o),l=(a("e260"),a("d3b7"),a("e6cf"),a("3ca3"),a("ddb0"),a("cca6"),a("2f62")),r={components:{ModalHeader:function(){return Promise.all([a.e(0),a.e(13)]).then(a.bind(null,"0f4a"))},ModalButton:function(){return a.e(2).then(a.bind(null,"c1b8"))}},props:["user","_id"],data:function(){return{profileToSubmit:{},imageUpload:[],fileUploaded:!1}},methods:s()(s()({},Object(l["b"])("auth",["updateAvatar"])),{},{captureImageFileUpload:function(e){var t=this;this.profileToSubmit.avatar=e;var a=this.$refs.canvas,i=a.getContext("2d"),n=new FileReader;n.onload=function(e){var n=new Image;n.onload=function(){a.width=n.width,a.height=n.height,i.drawImage(n,0,0),t.fileUploaded=!0},n.src=e.target.result},n.readAsDataURL(e)},submitForm:function(){this.updateAvatar({updates:this.profileToSubmit}),this.$emit("close")}}),mounted:function(){this.profileToSubmit=Object.assign({},this.user)}},d=r,c=(a("a7a3"),a("2877")),u=a("f09f"),p=a("a370"),f=a("7d53"),m=a("0016"),h=a("eebe"),b=a.n(h),v=Object(c["a"])(d,i,n,!1,null,"37b1b412",null);t["default"]=v.exports;b()(v,"components",{QCard:u["a"],QCardSection:p["a"],QFile:f["a"],QIcon:m["a"]})},5259:function(e,t,a){},a7a3:function(e,t,a){"use strict";a("5259")}}]);