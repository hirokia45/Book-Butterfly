(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"020c":function(o,t,s){},2014:function(o,t,s){o.exports=s.p+"img/no-cover-image-found.fea3d7c6.jpg"},"700d":function(o,t,s){o.exports=s.p+"img/Completed.77b492a7.png"},"9c3b":function(o,t,s){"use strict";s.r(t);var e=function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("q-card",{staticClass:"book-card column justify-between q-mx-sm q-mb-md q-mt-none",attrs:{bordered:"",flat:""}},[[o.book.completed?e("q-avatar",{staticClass:"absolute-top-right q-pa-xs",attrs:{size:"60px"}},[e("img",{attrs:{src:s("700d")}})]):o._e(),[o.book.volumeInfo.imageLinks?[e("img",{class:{"my-book-img":!o.isSearchTab},attrs:{src:o.book.volumeInfo.imageLinks.thumbnail},on:{error:function(o){o.target.src="../../assets/no-cover-image-found.jpg"}}})]:[e("img",{class:{"my-book-img":!o.isSearchTab},attrs:{src:s("2014")}})]],e("q-card-section",{staticClass:"q-pb-none"},[e("div",{staticClass:"text-subtitle2"},[o._v(o._s(o.book.volumeInfo.title))]),o.book.volumeInfo.authors&&o.isSearchTab?e("div",{staticClass:"text-subtitle2"},[o._v(o._s(o.book.volumeInfo.authors[0])+"\n      ")]):o._e(),o.isSearchTab?e("div",{staticClass:"text-subtitle2"},[o._v(o._s(o.book.volumeInfo.publishedDate)+"\n      ")]):o._e()]),e("q-card-section",{staticClass:"q-pa-sm"},[e("div",{staticClass:"row info-container"},[o.isBookShelfTab?e("div",{staticClass:"q-gutter-y-md"},[e("q-rating",{attrs:{readonly:"",flat:"",max:4,size:"2em",color:"green-5",icon:o.icons},model:{value:o.book.myRate,callback:function(t){o.$set(o.book,"myRate",t)},expression:"book.myRate"}})],1):o._e(),e("q-btn",{staticClass:"info-button",attrs:{color:"grey-10",dense:"",flat:"",icon:"eva-info-outline",round:""},on:{click:o.showBookDetailsModal}})],1)])],e("q-dialog",{model:{value:o.showBookDetails,callback:function(t){o.showBookDetails=t},expression:"showBookDetails"}},[e("book-details",{attrs:{id:o.id,book:o.book,isBookShelfTab:o.isBookShelfTab,isSearchTab:o.isSearchTab},on:{close:function(t){o.showBookDetails=!1}}})],1)],2)},a=[],i=(s("e260"),s("d3b7"),s("e6cf"),s("3ca3"),s("ddb0"),{components:{BookDetails:function(){return Promise.all([s.e(0),s.e(23)]).then(s.bind(null,"02d9"))}},props:["id","book","isBookShelfTab","isSearchTab"],data:function(){return{showBookDetails:!1,ratingModel:this.book.rating,icons:["sentiment_very_dissatisfied","sentiment_dissatisfied","sentiment_satisfied","sentiment_very_satisfied"]}},computed:{searchTab:function(){this.$route.path}},methods:{showBookDetailsModal:function(){this.showBookDetails=!0}}}),n=i,c=(s("dbeb"),s("2877")),l=s("f09f"),r=s("cb32"),b=s("a370"),d=s("daf4"),u=s("9c40"),m=s("24e8"),f=s("eebe"),k=s.n(f),h=Object(c["a"])(n,e,a,!1,null,"42ff6521",null);t["default"]=h.exports;k()(h,"components",{QCard:l["a"],QAvatar:r["a"],QCardSection:b["a"],QRating:d["a"],QBtn:u["a"],QDialog:m["a"]})},dbeb:function(o,t,s){"use strict";s("020c")}}]);