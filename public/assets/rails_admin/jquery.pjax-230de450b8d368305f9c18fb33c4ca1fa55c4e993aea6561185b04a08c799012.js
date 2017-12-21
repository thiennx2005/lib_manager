!function(t){function e(e,n,r){var o=this;return this.on("click.pjax",e,function(e){var i=t.extend({},d(n,r));i.container||(i.container=t(this).attr("data-pjax")||o),a(e,i)})}function a(e,a,n){n=d(a,n);var o=e.currentTarget;if("A"!==o.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||location.protocol!==o.protocol||location.host!==o.host||o.hash&&o.href.replace(o.hash,"")===location.href.replace(location.hash,"")||o.href===location.href+"#")){var i={url:o.href,container:t(o).attr("data-pjax"),target:o,fragment:null};r(t.extend({},i,n)),e.preventDefault()}}function n(e,a,n){n=d(a,n);var o=e.currentTarget;if("FORM"!==o.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var i={type:o.method,url:o.action,data:t(o).serializeArray(),container:t(o).attr("data-pjax"),target:o,fragment:null};r(t.extend({},i,n)),e.preventDefault()}function r(e){function a(e,a){var r=t.Event(e,{relatedTarget:n});return l.trigger(r,a),!r.isDefaultPrevented()}e=t.extend(!0,{},t.ajaxSettings,r.defaults,e),t.isFunction(e.url)&&(e.url=e.url());var n=e.target,o=p(e.url).hash,l=e.context=f(e.container);e.data||(e.data={}),e.data._pjax=l.selector;var c;e.beforeSend=function(t,n){"GET"!==n.type&&(n.timeout=0),t.setRequestHeader("X-PJAX","true"),t.setRequestHeader("X-PJAX-Container",l.selector);if(!a("pjax:beforeSend",[t,n]))return!1;n.timeout>0&&(c=setTimeout(function(){a("pjax:timeout",[t,e])&&t.abort("timeout")},n.timeout),n.timeout=0),e.requestUrl=p(n.url).href},e.complete=function(t,n){c&&clearTimeout(c),a("pjax:complete",[t,n,e]),a("pjax:end",[t,e])},e.error=function(t,n,r){var o=m("",t,e),l=a("pjax:error",[t,n,r,e]);"GET"==e.type&&"abort"!==n&&l&&i(o.url)},e.success=function(n,c,u){var d=m(n,u,e);if(d.contents){if(r.state={id:e.id||s(),url:d.url,title:d.title,container:l.selector,fragment:e.fragment,timeout:e.timeout},(e.push||e.replace)&&window.history.replaceState(r.state,d.title,d.url),d.title&&(document.title=d.title),l.html(d.contents),"number"==typeof e.scrollTo&&t(window).scrollTop(e.scrollTo),(e.replace||e.push)&&window._gaq&&_gaq.push(["_trackPageview"]),""!==o){var f=p(d.url);f.hash=o,r.state.url=f.href,window.history.replaceState(r.state,d.title,f.href);var h=t(f.hash);h.length&&t(window).scrollTop(h.offset().top)}a("pjax:success",[n,c,u,e])}else i(d.url)},r.state||(r.state={id:s(),url:window.location.href,title:document.title,container:l.selector,fragment:e.fragment,timeout:e.timeout},window.history.replaceState(r.state,document.title));(d=r.xhr)&&d.readyState<4&&(d.onreadystatechange=t.noop,d.abort()),r.options=e;var d;return(d=r.xhr=t.ajax(e)).readyState>0&&(e.push&&!e.replace&&(x(r.state.id,l.clone().contents()),window.history.pushState(null,"",u(e.requestUrl))),a("pjax:start",[d,e]),a("pjax:send",[d,e])),r.xhr}function o(e,a){var n={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return r(t.extend(n,d(e,a)))}function i(t){window.history.replaceState(null,"","#"),window.location.replace(t)}function l(e){var a=e.state;if(a&&a.container){var n=t(a.container);if(n.length){var o=v[a.id];if(!r.state)return void(r.state=a);var l=r.state.id<a.id?"forward":"back";g(l,r.state.id,n.clone().contents());var c=t.Event("pjax:popstate",{state:a,direction:l});n.trigger(c);var s={id:a.id,url:a.url,container:n,push:!1,fragment:a.fragment,timeout:a.timeout,scrollTo:!1};o?(n.trigger("pjax:start",[null,s]),a.title&&(document.title=a.title),n.html(o),r.state=a,n.trigger("pjax:end",[null,s])):r(s),n[0].offsetHeight}else i(location.href)}}function c(e){var a=t.isFunction(e.url)?e.url():e.url,n=e.type?e.type.toUpperCase():"GET",r=t("<form>",{method:"GET"===n?"GET":"POST",action:a,style:"display:none"});"GET"!==n&&"POST"!==n&&r.append(t("<input>",{type:"hidden",name:"_method",value:n.toLowerCase()}));var o=e.data;if("string"==typeof o)t.each(o.split("&"),function(e,a){var n=a.split("=");r.append(t("<input>",{type:"hidden",name:n[0],value:n[1]}))});else if("object"==typeof o)for(key in o)r.append(t("<input>",{type:"hidden",name:key,value:o[key]}));t(document.body).append(r),r.submit()}function s(){return(new Date).getTime()}function u(t){return t.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function p(t){var e=document.createElement("a");return e.href=t,e}function d(e,a){return e&&a?a.container=e:a=t.isPlainObject(e)?e:{container:e},a.container&&(a.container=f(a.container)),a}function f(e){if((e=t(e)).length){if(""!==e.selector&&e.context===document)return e;if(e.attr("id"))return t("#"+e.attr("id"));throw"cant get selector for pjax container!"}throw"no pjax container for "+e.selector}function h(t,e){return t.filter(e).add(t.find(e))}function m(e,a,n){var r={};if(r.url=u(a.getResponseHeader("X-PJAX-URL")||n.requestUrl),/<html/i.test(e))var o=t(e.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]),i=t(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]);else o=i=t(e);if(0===i.length)return r;if(r.title=h(o,"title").last().text(),n.fragment){if("body"===n.fragment)var l=i;else l=h(i,n.fragment).first();l.length&&(r.contents=l.contents(),r.title||(r.title=l.attr("title")||l.data("title")))}else/<html/i.test(e)||(r.contents=i);return r.contents&&(r.contents=r.contents.not("title"),r.contents.find("title").remove()),r.title&&(r.title=t.trim(r.title)),r}function x(t,e){for(v[t]=e,b.push(t);y.length;)delete v[y.shift()];for(;b.length>r.defaults.maxCacheLength;)delete v[b.shift()]}function g(t,e,a){var n,r;v[e]=a,"forward"===t?(n=b,r=y):(n=y,r=b),n.push(e),(e=r.pop())&&delete v[e]}function j(){t.fn.pjax=e,t.pjax=r,t.pjax.enable=t.noop,t.pjax.disable=w,t.pjax.click=a,t.pjax.submit=n,t.pjax.reload=o,t.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20},t(window).bind("popstate.pjax",l)}function w(){t.fn.pjax=function(){return this},t.pjax=c,t.pjax.enable=j,t.pjax.disable=t.noop,t.pjax.click=t.noop,t.pjax.submit=t.noop,t.pjax.reload=function(){window.location.reload()},t(window).unbind("popstate.pjax",l)}var v={},y=[],b=[];t.inArray("state",t.event.props)<0&&t.event.props.push("state"),t.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),t.support.pjax?j():w()}(jQuery);