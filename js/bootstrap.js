+function(t){"use strict";function s(e,i){var o=t.proxy(this.process,this);this.$body=t("body"),this.$scrollElement=t(t(e).is("body")?window:e),this.options=t.extend({},s.DEFAULTS,i),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",o),this.refresh(),this.process()}function e(e){return this.each(function(){var i=t(this),o=i.data("bs.scrollspy"),r="object"==typeof e&&e;o||i.data("bs.scrollspy",o=new s(this,r)),"string"==typeof e&&o[e]()})}s.VERSION="3.3.2",s.DEFAULTS={offset:10},s.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},s.prototype.refresh=function(){var s="offset",e=0;t.isWindow(this.$scrollElement[0])||(s="position",e=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var i=this;this.$body.find(this.selector).map(function(){var i=t(this),o=i.data("target")||i.attr("href"),r=/^#./.test(o)&&t(o);return r&&r.length&&r.is(":visible")&&[[r[s]().top+e,o]]||null}).sort(function(t,s){return t[0]-s[0]}).each(function(){i.offsets.push(this[0]),i.targets.push(this[1])})},s.prototype.process=function(){var t,s=this.$scrollElement.scrollTop()+this.options.offset,e=this.getScrollHeight(),i=this.options.offset+e-this.$scrollElement.height(),o=this.offsets,r=this.targets,l=this.activeTarget;if(this.scrollHeight!=e&&this.refresh(),s>=i)return l!=(t=r[r.length-1])&&this.activate(t);if(l&&s<o[0])return this.activeTarget=null,this.clear();for(t=o.length;t--;)l!=r[t]&&s>=o[t]&&(!o[t+1]||s<=o[t+1])&&this.activate(r[t])},s.prototype.activate=function(s){this.activeTarget=s,this.clear();var e=this.selector+'[data-target="'+s+'"],'+this.selector+'[href="'+s+'"]',i=t(e).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},s.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var i=t.fn.scrollspy;t.fn.scrollspy=e,t.fn.scrollspy.Constructor=s,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var s=t(this);e.call(s,s.data())})})}(jQuery);
+function(t){"use strict";function o(o){o&&3===o.which||(t(r).remove(),t(a).each(function(){var n=t(this),r=e(n),a={relatedTarget:this};r.hasClass("open")&&(r.trigger(o=t.Event("hide.bs.dropdown",a)),o.isDefaultPrevented()||(n.attr("aria-expanded","false"),r.removeClass("open").trigger("hidden.bs.dropdown",a)))}))}function e(o){var e=o.attr("data-target");e||(e=o.attr("href"),e=e&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var n=e&&t(e);return n&&n.length?n:o.parent()}function n(o){return this.each(function(){var e=t(this),n=e.data("bs.dropdown");n||e.data("bs.dropdown",n=new d(this)),"string"==typeof o&&n[o].call(e)})}var r=".dropdown-backdrop",a='[data-toggle="dropdown"]',d=function(o){t(o).on("click.bs.dropdown",this.toggle)};d.VERSION="3.3.2",d.prototype.toggle=function(n){var r=t(this);if(!r.is(".disabled, :disabled")){var a=e(r),d=a.hasClass("open");if(o(),!d){"ontouchstart"in document.documentElement&&!a.closest(".navbar-nav").length&&t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click",o);var i={relatedTarget:this};if(a.trigger(n=t.Event("show.bs.dropdown",i)),n.isDefaultPrevented())return;r.trigger("focus").attr("aria-expanded","true"),a.toggleClass("open").trigger("shown.bs.dropdown",i)}return!1}},d.prototype.keydown=function(o){if(/(38|40|27|32)/.test(o.which)&&!/input|textarea/i.test(o.target.tagName)){var n=t(this);if(o.preventDefault(),o.stopPropagation(),!n.is(".disabled, :disabled")){var r=e(n),d=r.hasClass("open");if(!d&&27!=o.which||d&&27==o.which)return 27==o.which&&r.find(a).trigger("focus"),n.trigger("click");var i=" li:not(.divider):visible a",s=r.find('[role="menu"]'+i+', [role="listbox"]'+i);if(s.length){var p=s.index(o.target);38==o.which&&p>0&&p--,40==o.which&&p<s.length-1&&p++,~p||(p=0),s.eq(p).trigger("focus")}}}};var i=t.fn.dropdown;t.fn.dropdown=n,t.fn.dropdown.Constructor=d,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=i,this},t(document).on("click.bs.dropdown.data-api",o).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",a,d.prototype.toggle).on("keydown.bs.dropdown.data-api",a,d.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',d.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',d.prototype.keydown)}(jQuery);