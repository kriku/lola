var Ajax=function(){return"undefined"==typeof XMLHttpRequest&&(XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}throw new Error("This browser does not support XMLHttpRequest.")}),new XMLHttpRequest};