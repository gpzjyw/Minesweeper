//获得特定id和className的元素节点
function $_id(id){
	return document.getElementById(id);
}
function $_class(className){
	return document.getElementsByClassName(className);
}

//跨浏览器的添加/删除事件
function addEvent(ele, type, handler){
	if (ele.addEventListener) {
		ele.addEventListener(type, handler, false);
	} else if (ele.attachEvent){
		ele.attachEvent("on" + type, handler);
	} else {
		ele["on" + type] = handler;
	}
}
function removeEvent(ele, type, handler){
	if (ele.removeEventListener) {
		ele.removeEventListener(type, handler, false);
	} else if (ele.detachEvent){
		ele.detachEvent("on" + type, handler);
	} else {
		ele["on" + type] = null;
	}
}

//跨浏览器获取/设置/删除标签的自定义属性,自定义属性均加上data-前缀
function getDataset(ele, attr){
	if(ele.dataset){
		return ele.dataset[attr];
	} else if(ele.getAttribute) {
		return ele.getAttribute("data-" + attr);
	} else {
		return ele["data-" + attr];
	}
}
function setDataset(ele, attr, value){
	if(ele.dataset){
		ele.dataset[attr] = value;
	} else if(ele.setAttribute) {
		ele.setAttribute("data-" + attr, value);
	} else {
		ele["data-" + attr] = value;
	}
}
function deleteDataset(ele, attr){
	if(ele.dataset){
		ele.dataset[attr] = null;
	} else if(ele.removeAttribute){
		ele.removeAttribute("data-" + attr);
	} else {
		ele["data-" + attr] = null;
	}
}

//获取/设置cookie
function getCookie(){
    var cookie = {};
    var all = document.cookie;
    if (all === "")
        return cookie;
    var list = all.split("; ");
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var p = item.indexOf("=");
        var name = item.substring(0, p);
        name = decodeURIComponent(name);
        var value = item.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}
function setCookie(name, value, expires, path, domain, secure){
    var cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires)
        cookie += "; expires=" + expires.toGMTString();
    if (path)
        cookie += "; path=" + path;
    if (domain)
        cookie += "; domain=" + domain;
    if (secure)
        cookie += "; secure=" + secure;
    document.cookie = cookie;
}

//给url尾部添加查询参数
function addURLComponent(url, name, value){
	url += (url.indexOf("?") == -1 ? "?" : "&");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}