!function(e){"use strict";for(var n,t=0,i="webkit moz ms o".split(" "),a=e.requestAnimationFrame,m=e.cancelAnimationFrame,o=0;o<i.length&&(!a||!m);o++)n=i[o],a=a||e[n+"RequestAnimationFrame"],m=m||e[n+"CancelAnimationFrame"]||e[n+"CancelRequestAnimationFrame"];a&&m||(a=function(n){var i=(new Date).getTime(),a=Math.max(0,16-(i-t)),m=e.setTimeout(function(){n(i+a)},a);return t=i+a,m},m=function(n){e.clearTimeout(n)}),e.requestAnimationFrame=a,e.cancelAnimationFrame=m}(window);