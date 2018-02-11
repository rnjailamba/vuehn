webpackJsonp([1],{"3tOv":function(e,t){},GYqU:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-link",{attrs:{to:{name:"Hello"}}},[e._v("Home")]),e._v(" "),n("router-link",{attrs:{to:"/about"}},[e._v("About")]),e._v(" "),n("router-link",{attrs:{to:"/coins/ethereum"}},[e._v("Ethereum")]),e._v(" "),n("router-link",{attrs:{to:"/coins/bitcoin"}},[e._v("Bitcoin")]),e._v(" "),n("router-link",{attrs:{to:"/industriesupload"}},[e._v("Upload Industries")]),e._v(" "),n("router-link",{attrs:{to:"/industriesview"}},[e._v("View All Industries")]),e._v(" "),n("router-view")],1)},staticRenderFns:[]};var o=n("VU/8")({name:"App"},i,!1,function(e){n("yjH6")},null,null).exports,r=n("/ocq"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"hello"},[t("h1",[this._v(this._s(this.msg))])])},staticRenderFns:[]},c=n("VU/8")({name:"Hello",data:function(){return{msg:"Welcome to Crypto Info"}}},s,!1,null,null,null).exports,l={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"about"},[t("h1",[this._v("What is a Crypto-Currency?")]),this._v(" "),t("p",[this._v("\n    It's a digital currency in which encryption techniques are used to regulate the generation of units of currency \n    and verify the transfer of funds, operating independently of a central bank.\n  ")])])}]},u=n("VU/8")({name:"About"},l,!1,null,null,null).exports,d=n("mtWM"),h=n.n(d),m={name:"Coins",data:function(){return{coin:{}}},created:function(){this.fetchData()},watch:{$route:"fetchData"},methods:{fetchData:function(){var e=this;h.a.get("https://api.coinmarketcap.com/v1/ticker/"+this.$route.params.id+"/").then(function(t){e.coin=t.data[0],console.log(t)}).catch(function(e){console.log(e)})}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("p",[e._v("Name: "+e._s(e.coin.name))]),e._v(" "),n("p",[e._v("Symbol: "+e._s(e.coin.symbol))]),e._v(" "),n("p",[e._v("Price (USD): "+e._s(e.coin.price_usd))])])},staticRenderFns:[]},f=n("VU/8")(m,p,!1,null,null,null).exports,v=n("mvHQ"),_=n.n(v),g=n("lxTf"),y=n.n(g),b=n("oYt9");a.a.use(b.a);var w=!0,C=[],I={name:"Hello",data:function(){return{msg:"Welcome to Crypto Info",image:""}},methods:{onFileChange:function(e){var t=e.target.files||e.dataTransfer.files;t.length&&("text/csv"===t[0].type?this.createImage(t[0]):a.a.swal("Sorry, thats not a valid CSV file"))},createImage:function(e){var t=this;y.a.parse(e,{download:!0,header:!0,step:function(e,n){n.pause();var i=e.data[0];if("id"in i&&"name"in i){var o=i.id,r=i.name;isNaN(o)||"string"!=typeof r?(a.a.swal("Incorrect Data!","The id column must be number and name column string.","error"),w=!1,n.abort(),t.image=""):C.push({id:o,name:r}),n.resume()}else a.a.swal("Incorrect Format!","The header must have id|name.","error"),w=!1,n.abort(),t.image=""},complete:function(e,n){w&&(console.log(C),t.image=C,t.showDataParseSuccess(C))}})},postData:function(e){h()({method:"get",url:"http://rnjailamba.pythonanywhere.com/products/",headers:{Authorization:"Token bc9514f0892368cfd0ea792a977aff55d53e3634"}}),h.a.post("http://rnjailamba.pythonanywhere.com/products/",_()(e),{headers:{Authorization:"Token bc9514f0892368cfd0ea792a977aff55d53e3634","Content-Type":"application/json"}}).then(function(e){dispatch({type:FOUND_USER,data:e.data[0]})}).catch(function(e){dispatch({type:ERROR_FINDING_USER})})},removeImage:function(e){this.image="",w=!1},showDataParseSuccess:function(e){var t=this;a.a.swal({title:"The file passed all checks.",text:"Do you want to upload this file?",type:"success",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, upload it!"}).then(function(n){n.value&&(a.a.swal("Uploaded!","Your file has been uploaded.","success"),t.postData(e))})}}},k={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[this.image?t("div",[t("button",{on:{click:this.removeImage}},[this._v("Remove CSV file")])]):t("div",[t("h2",[this._v("Select an CSV file")]),this._v(" "),t("input",{attrs:{type:"file"},on:{change:this.onFileChange}})])])},staticRenderFns:[]},F=n("VU/8")(I,k,!1,null,null,null).exports,D={template:"#item-template",props:{model:Object},data:function(){return{open:!1}},computed:{isFolder:function(){return this.model.children&&this.model.children.length}},methods:{toggle:function(){this.isFolder&&(this.open=!this.open)},openIndustryPage:function(e){H.push({name:"Industry",params:{id:"bitcoin"}})},changeType:function(){this.isFolder||(a.a.set(this.model,"children",[]),this.addChild(),this.open=!0)},addChild:function(){this.model.children.push({name:"new stuff"})}}},R={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"item-template"}},[n("li",[n("div",{class:{bold:e.isFolder}},[n("span",{on:{click:function(t){e.openIndustryPage(e.model.id)}}},[e._v(e._s((e.model.id||"")+" "+e.model.name))]),e._v(" "),e.isFolder?n("span",{on:{click:e.toggle}},[e._v("["+e._s(e.open?"-":"+")+"]")]):e._e()]),e._v(" "),e.isFolder?n("ul",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}]},e._l(e.model.children,function(e,t){return n("item",{key:t,staticClass:"item",attrs:{model:e}})})):e._e()])])},staticRenderFns:[]};var S=n("VU/8")(D,R,!1,function(e){n("3tOv")},"data-v-42a830dd",null).exports;a.a.component("Item",S);var U={name:"Industries",children:[{id:"11",name:"Agricultura",children:[{id:"111",name:"Siembra de soya",children:[{id:"1111",name:"Siembra de soya"}]}]},{id:"97",name:"Otros",children:[{id:"971",name:"Otros perecederos"},{id:"972",name:"Otros servicios",children:[{id:"9721",name:"Servicios varios"}]}]}]},x={components:{item:S},data:function(){return{treeData:U}},methods:{hide:function(){}}},E={render:function(){var e=this.$createElement,t=this._self._c||e;return t("ul",{attrs:{id:"demo"}},[t("item",{staticClass:"item",attrs:{model:this.treeData}})],1)},staticRenderFns:[]};var $=n("VU/8")(x,E,!1,function(e){n("WARY")},"data-v-0c2e2d7f",null).exports,A={name:"Coins",data:function(){return{coin:{}}},created:function(){this.fetchData()},watch:{$route:"fetchData"},methods:{fetchData:function(){var e=this;h.a.get("https://api.coinmarketcap.com/v1/ticker/"+this.$route.params.id+"/").then(function(t){e.coin=t.data[0],console.log(t)}).catch(function(e){console.log(e)})}}},V={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("p",[e._v("Name: "+e._s(e.coin.name))]),e._v(" "),n("p",[e._v("Symbol: "+e._s(e.coin.symbol))]),e._v(" "),n("p",[e._v("Price (USD): "+e._s(e.coin.price_usd))])])},staticRenderFns:[]},T=n("VU/8")(A,V,!1,null,null,null).exports;a.a.use(r.a);var H=new r.a({routes:[{path:"/",name:"HelloWorld",component:c},{path:"/about",name:"About",component:u},{path:"/coins/:id",name:"Coins",component:f},{path:"/industriesupload",name:"Industriesupload",component:F},{path:"/industriesview",name:"Industriesview",component:$},{path:"/industry/:id",name:"Industry",component:T}]});a.a.config.productionTip=!1,new a.a({el:"#app",router:H,components:{App:o},template:"<App/>"})},WARY:function(e,t){},yjH6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.403180c65db3b3a89db4.js.map