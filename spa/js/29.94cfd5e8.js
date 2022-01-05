(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[29],{"04b7":function(t,e,n){"use strict";n.r(e);var o,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",[n("div",{staticClass:"absolute fit"},[n("div",{staticClass:"constrain row fit q-pa-md sticky-page-container"},[n("div",{staticClass:"col-12 col-sm-8 column full-height"},[n("base-scroll-area",{on:{"show-add-note-modal":function(e){t.showAddNote=!0}}},[t.showNotificationsBanner&&t.pushNotificationsSupported?n("card-push-notification",{on:{hideNotificationsBanner:function(e){t.showNotificationsBanner=!1}}}):t._e(),!t.loadingNotes&&t.notes.length?[n("q-infinite-scroll",{attrs:{offset:250},on:{load:t.onLoad},scopedSlots:t._u([{key:"loading",fn:function(){return[n("div",{staticClass:"row justify-center q-my-md"},[n("q-spinner-dots",{attrs:{color:"primary",size:"40px"}})],1)]},proxy:!0}],null,!1,3159847669)},t._l(t.notes,(function(t){return n("note-item",{key:t._id,attrs:{_id:t._id,note:t}})})),1)]:t.loadingNotes||0!==t.totalNotes?!t.loadingNotes&&t.totalNotes>0&&!t.notes.length?[n("div",{staticClass:"row justify-center q-mt-lg"},[n("q-btn",{staticClass:"primary-gradient-background",attrs:{icon:"eva-loader-outline"},on:{click:t.getNotesInit}},[n("span",{staticClass:"q-ml-xs"},[t._v(t._s(t.$t("loadMoreNotes")))])])],1)]:[n("page-loader-note")]:[n("no-note-yet",{on:{"show-add-note-modal":function(e){t.showAddNote=!0}}})]],2)],1),t.$q.platform.is.ie?t._e():n("div",{staticClass:"col-sm-4 q-pl-lg large-screen-only"},[n("q-card",[n("note-calendar",{staticClass:"side-card"})],1)],1),n("div",{staticClass:"fab-sticky-button large-screen-only"},[n("q-btn",{staticClass:"primary-gradient-background shadow-5",attrs:{fab:"",icon:"eva-plus-outline"},on:{click:function(e){t.showAddNote=!0}}})],1)])]),n("q-dialog",{model:{value:t.showAddNote,callback:function(e){t.showAddNote=e},expression:"showAddNote"}},[n("add-note",{on:{close:function(e){t.showAddNote=!1}}})],1),n("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[t.showAppInstallBanner?n("q-page-sticky",{staticClass:"banner-container bg-primary",attrs:{expand:"",position:"bottom"}},[n("div",{staticClass:"constrain"},[n("q-banner",{staticClass:"bg-primary text-white",attrs:{"inline-actions":"",dense:""},scopedSlots:t._u([{key:"action",fn:function(){return[n("q-btn",{staticClass:"q-px-sm",attrs:{dense:"",flat:"",label:t.$t("yes")},on:{click:t.installApp}}),n("q-btn",{staticClass:"q-px-sm",attrs:{dense:"",flat:"",label:t.$t("later")},on:{click:function(e){t.showAppInstallBanner=!1}}}),n("q-btn",{staticClass:"q-px-sm",attrs:{dense:"",flat:"",label:t.$t("never")},on:{click:t.neverShowAppInstallBanner}})]},proxy:!0}],null,!1,3487803521)},[n("q-avatar",{staticClass:"q-mr-xs",attrs:{color:"white",icon:"eva-book-open-outline","text-color":"secondary",size:"md","font-size":"22px"}}),n("b",[t._v(t._s(t.$t("installBookButterfly")))])],1)],1)]):t._e()],1)],1)},i=[],s=n("c973"),r=n.n(s),l=n("ded3"),c=n.n(l),d=(n("96cf"),n("e260"),n("d3b7"),n("e6cf"),n("3ca3"),n("ddb0"),n("2f62")),u={name:"PageHome",components:{NoteItem:function(){return Promise.all([n.e(0),n.e(35)]).then(n.bind(null,"d4bc"))},NoNoteYet:function(){return n.e(52).then(n.bind(null,"bc74"))},AddNote:function(){return Promise.all([n.e(0),n.e(16)]).then(n.bind(null,"13b4"))},PageLoaderNote:function(){return Promise.all([n.e(0),n.e(39)]).then(n.bind(null,"50b8"))},NoteCalendar:function(){return n.e(7).then(n.bind(null,"2f45"))},BaseScrollArea:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"1d71"))},CardPushNotification:function(){return Promise.all([n.e(0),n.e(38)]).then(n.bind(null,"fd0b"))}},data:function(){return{showAddNote:!1,showAppInstallBanner:!1,showNotificationsBanner:!1}},computed:c()(c()(c()(c()(c()({},Object(d["d"])("notes",["loadingNotes","notes"])),Object(d["c"])("auth",["isLoggedIn"])),Object(d["c"])("notes",["notes","page","totalNotes"])),Object(d["c"])("system",["serviceWorkerSupported","pushNotificationsSupported"])),{},{singleNoteLink:function(){return"/notes/"+this.note._id},backgroundSyncSupported:function(){return"serviceWorker"in navigator&&"SyncManager"in window}}),activated:function(){this.getTotalNotificationsUnconfirmed(),this.isLoggedIn&&navigator.onLine&&this.loadNotes()},created:function(){this.initNotificationsBanner(),navigator.onLine&&this.listenForOfflineNoteUploaded()},mounted:function(){var t=this,e=this.$q.localStorage.getItem("neverShowAppInstallBanner");e||window.addEventListener("beforeinstallprompt",(function(e){e.preventDefault(),o=e,setTimeout((function(){t.showAppInstallBanner=!0}),3e3)}))},methods:c()(c()(c()({},Object(d["b"])("notes",["getNotesInit","loadMoreNotes","getCalendarInfo","changeOfflineStatus"])),Object(d["b"])("notifications",["getTotalNotificationsUnconfirmed"])),{},{loadNotes:function(){var t=this;return r()(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getNotesInit(),t.getCalendarInfo();case 2:case"end":return e.stop()}}),e)})))()},onLoad:function(t,e){var n=this,o=Math.floor(this.totalNotes/10)+1,a=this.page;setTimeout((function(){navigator.onLine?a<o?(console.log("more to load"),n.loadMoreNotes(),e()):(n.totalNotes<10||n.$q.notify({message:n.$t("loaderNoMore"),color:"deep-orange-6",position:"center",timeout:1500}),e(!0)):(n.$q.notify({message:n.$t("loaderLater"),color:"deep-orange-6",position:"center",timeout:1500}),e(!0))}),2e3)},installApp:function(){var t=this;this.showAppInstallBanner=!1,o.prompt(),o.userChoice.then((function(e){"accepted"===e.outcome?t.neverShowAppInstallBanner():console.log("rejected")}))},neverShowAppInstallBanner:function(){this.showAppInstallBanner=!1,this.$q.localStorage.set("neverShowAppInstallBanner",!0)},initNotificationsBanner:function(){var t=this.$q.localStorage.getItem("neverShowNotificationsBanner");t||(this.showNotificationsBanner=!0)},listenForOfflineNoteUploaded:function(){var t=this;if(this.serviceWorkerSupported){var e=new BroadcastChannel("sw-messages");e.addEventListener("message",(function(e){var n=e.data.url;"offline-note-uploaded"===e.data.msg&&t.changeOfflineStatus(n)}))}}})},f=u,p=(n("201b"),n("2877")),h=n("9989"),g=n("ef35"),m=n("8380"),b=n("9c40"),v=n("f09f"),N=n("24e8"),w=n("de5e"),q=n("54e1"),y=n("cb32"),k=n("eebe"),B=n.n(k),C=Object(p["a"])(f,a,i,!1,null,"4523fb56",null);e["default"]=C.exports;B()(C,"components",{QPage:h["a"],QInfiniteScroll:g["a"],QSpinnerDots:m["a"],QBtn:b["a"],QCard:v["a"],QDialog:N["a"],QPageSticky:w["a"],QBanner:q["a"],QAvatar:y["a"]})},"201b":function(t,e,n){"use strict";n("9ac9")},"9ac9":function(t,e,n){}}]);