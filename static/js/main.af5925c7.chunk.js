(this.webpackJsonpmarvelsearch=this.webpackJsonpmarvelsearch||[]).push([[0],{15:function(e,a,t){},23:function(e,a,t){"use strict";t.r(a);var c,s,r,n,i,l=t(7),o=t.n(l),d=t(9),h=t(10),b=t(2),p=(t(15),t(8)),m=t.n(p),j=(t(18),t(19),t(1)),u=t.n(j),f=t.p+"static/media/marvellogo.0638ee23.png",x=t(0),v=0,g=(new Date).getTime().toString(),O=m()(g+"1dcb46b5f11a736c66a710c676624ee21e00c0257f9507ae90588d365ccdb128996f8f45"),k="",N=0;var y=function(){var e=Object(b.useState)([]),a=Object(h.a)(e,2),t=a[0],l=a[1];function o(){null==(s=JSON.parse(localStorage.getItem("list")))&&(s=[]),l(s)}function p(e){if(2==++N){i=u()(this).index(),u()(this).addClass("selected"),u()(this).find(".smalltext").text("Second character chosen");var a=t[n].comics.available,c=t[i].comics.available,s=a,r=c;if(u()("#titleLabel").text(t[n].name+" VS "+t[i].name+" - Who's more popular?"),a>c)for(u()(".section2").append("<p>"+t[n].name+" WINS!</p>");s>300;)s/=2,r/=2;else if(c>a)for(u()(".section2").append("<p>"+t[i].name+" WINS!</p>");r>300;)s/=2,r/=2;else for(u()(".section2").append("<p>It's a draw!</p>");r>300&&s>300;)s/=2,r/=2;u()(".firstchargraph").before("<img src='"+t[n].thumbnail.path+".jpg' class='comparephoto img-fluid'/>"),u()(".secondchargraph").before("<img src='"+t[i].thumbnail.path+".jpg' class='comparephoto img-fluid'/>"),u()(".firstchargraph").animate({height:s+"px"},2e3),u()(".section1").append("<span>"+a+"</span>"),u()(".section3").append("<span>"+c+"</span>"),u()(".secondchargraph").animate({height:r+"px"},2e3),u()("#staticBackdrop").modal("show"),n=i=null,N=0}else n=u()(this).index(),u()(this).addClass("selected"),u()(this).find(".smalltext").text("First character chosen")}function m(){u()((function(){u()(".section2 p,.section1 span,.section3 span").remove(),u()(".bookchar").removeClass("selected"),u()(".bookchar .smalltext").text("Click to compare with another character"),u()(".firstchargraph,.secondchargraph").css("height","0px"),u()(".section1 img,.section3 img").remove()}))}function j(){clearTimeout(r),r=setTimeout((function(){""==(k=document.getElementById("select").value)&&(k=" ");u()(".spinner-border").fadeOut(),fetch("https://gateway.marvel.com/v1/public/characters?ts="+g+"&nameStartsWith="+k+"&apikey=7f9507ae90588d365ccdb128996f8f45&hash="+O).then((function(e){return e.json()})).then((function(e){c=e.data.results})).then((function(){fetch("https://gateway.marvel.com/v1/public/characters?ts="+g+"&nameStartsWith="+k+"&apikey=7f9507ae90588d365ccdb128996f8f45&hash="+O).then((function(e){return e.json()})).then((function(e){v=e.data.results.length})).then((function(){u()((function(){0==v?(u()("#carouselIndicators, .bookmark").fadeOut(),u()(".noresult").fadeIn()):(u()("#carouselIndicators, .bookmark").fadeIn(),u()(".noresult").fadeOut()),u()(".carousel-indicators li").remove(),u()(".carousel-inner .carousel-item").remove();for(var e=0;e<v;e++)u()(".carousel-indicators").append("<li data-target='#carouselIndicators' data-slide-to="+e+"></li>"),u()(".carousel-inner").append("<div class='carousel-item'></div>"),u()(".carousel-item").eq(e).append("<h1>"+c[e].name+"</h1>"),u()(".carousel-item").eq(e).append("<p>"+c[e].description+"</p>"),u()(".carousel-item").eq(e).append("<img src='"+c[e].thumbnail.path+".jpg' class='picture img-fluid'/>"),0==e&&(u()(".carousel-indicators li").eq(0).addClass("active"),u()(".carousel-inner .carousel-item").eq(0).addClass("active"))}))}))}))}),500),u()(".spinner-border").fadeIn()}return Object(b.useEffect)((function(){o(),j()}),[]),Object(b.useEffect)((function(){t!=[]&&localStorage.setItem("list",JSON.stringify(t)),u()((function(){u()(".bookmarkedcharacters div").remove();for(var e=0;e<t.length;e++)u()(".bookmarkedcharacters").append("<div class='bookchar'><img src='"+t[e].thumbnail.path+".jpg' class='picturebookmark'/><p>"+t[e].name+"</p><p>"+t[e].description+"</p><p class='smalltext'>Click to compare with another character</p></div>");u()(".bookchar").on("click",p)}))}),[t]),Object(x.jsxs)("div",{className:"container",id:"App",children:[Object(x.jsx)("div",{className:"row",children:Object(x.jsxs)("div",{className:"col-lg-12",children:[Object(x.jsx)("img",{src:f,className:"img-fluid logo"}),Object(x.jsx)("h1",{align:"center",children:"CHARACTER SEARCH"})]})}),Object(x.jsx)("div",{className:"row",children:Object(x.jsxs)("div",{className:"col-lg-12",children:[Object(x.jsx)("input",{type:"text",class:"form-control",placeholder:"Search for any Marvel character...","aria-label":"Username","aria-describedby":"addon-wrapping",id:"select",onChange:j}),Object(x.jsx)("div",{class:"spinner-border text-danger",role:"status",children:Object(x.jsx)("span",{class:"sr-only",children:"Loading..."})})]})}),Object(x.jsx)("div",{className:"row",children:Object(x.jsxs)("div",{className:"col-lg-12",children:[Object(x.jsxs)("div",{id:"carouselIndicators",class:"carousel slide","data-interval":"false",children:[Object(x.jsx)("ol",{class:"carousel-indicators"}),Object(x.jsx)("div",{class:"carousel-inner"}),Object(x.jsxs)("button",{class:"carousel-control-prev",type:"button","data-target":"#carouselIndicators","data-slide":"prev",children:[Object(x.jsx)("span",{class:"carousel-control-prev-icon","aria-hidden":"true"}),Object(x.jsx)("span",{class:"sr-only",children:"Previous"})]}),Object(x.jsxs)("button",{class:"carousel-control-next",type:"button","data-target":"#carouselIndicators","data-slide":"next",children:[Object(x.jsx)("span",{class:"carousel-control-next-icon","aria-hidden":"true"}),Object(x.jsx)("span",{class:"sr-only",children:"Next"})]})]}),Object(x.jsx)("button",{onClick:function(){u()((function(){var e=u()(".carousel-item.active").index();l((function(a){return[].concat(Object(d.a)(a),[c[e]])}))}))},type:"button",className:"btn btn-danger bookmark btn-lg",children:"Bookmark"}),Object(x.jsx)("div",{class:"alert alert-danger noresult",role:"alert",children:"NO RESULTS"})]})}),Object(x.jsx)("div",{className:"row",children:Object(x.jsxs)("div",{className:"col-lg-12",children:[Object(x.jsx)("h1",{id:"bookmarklist",children:"Bookmarked characters:"}),Object(x.jsx)("button",{onClick:function(){localStorage.clear(),o()},type:"button",className:"btn btn-danger btn-lg",children:"Delete bookmarks"})]})}),Object(x.jsx)("div",{className:"row",children:Object(x.jsx)("div",{className:"col-lg-12 bookmarkedcharacters"})}),Object(x.jsx)("div",{className:"row",children:Object(x.jsx)("div",{className:"col-sm-12 credit",children:"Created by Marin Boban"})}),Object(x.jsx)("div",{className:"row",children:Object(x.jsx)("div",{className:"col-lg-12 modaldiv",children:Object(x.jsx)("div",{class:"modal fade",id:"staticBackdrop","data-backdrop":"static","data-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true",children:Object(x.jsx)("div",{class:"modal-dialog",children:Object(x.jsxs)("div",{class:"modal-content",children:[Object(x.jsxs)("div",{class:"modal-header",children:[Object(x.jsx)("h5",{class:"modal-title",id:"titleLabel"}),Object(x.jsx)("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close",onClick:m,children:Object(x.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]}),Object(x.jsxs)("div",{class:"modal-body",children:[Object(x.jsx)("div",{class:"section1",children:Object(x.jsx)("div",{className:"firstchargraph"})}),Object(x.jsx)("div",{class:"section2"}),Object(x.jsx)("div",{class:"section3",children:Object(x.jsx)("div",{className:"secondchargraph"})})]}),Object(x.jsxs)("div",{class:"modal-footer",children:[Object(x.jsx)("p",{children:"The numbers represent how many comics the characters appeared in."}),Object(x.jsx)("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal",onClick:m,children:"Close"})]})]})})})})})]})};o.a.render(Object(x.jsx)(y,{}),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.af5925c7.chunk.js.map