var MYAPP = MYAPP || {};
MYAPP.todoFunctions = {};
MYAPP.classify = {};
MYAPP.classify.todoFunctions = {};
MYAPP.classify.ele = {};

MYAPP.classify.ele.buildDl = function (title) {
	var oo = $("#all-tasklist-box");
	var oFirst = oo.getElementsByTagName("dl")[0];
	var aa = document.createElement("dl");
	var bb = document.createElement("dt");
    // bb.style.position = "relative";
	bb.innerHTML = title + "<span></span>";
	aa.appendChild(bb);
	if (oFirst) {
		oo.insertBefore(aa, oFirst);
	}else {
		oo.appendChild(aa);
	}

}
MYAPP.classify.ele.buildDd = function (title) {
	var aDt = $("#all-tasklist-box").getElementsByTagName("dt");
	var bb = document.createElement("dd");
	bb.innerHTML = title + "<span></span>";
    // bb.style.position = "relative";
	/*if ($("[class=classify-active]")) {
		var highLightbg = $("[class=classify-active]");
		if (highLightbg.nodeName.toLowerCase() == "dt") {
			highLightbg.parentNode.appendChild(bb);
		}
	}*/ //IE8不兼容$("[class=classify-active]")
	var highLightbg = null;
	for (var i=0; i<aDt.length; i++) {
		if (aDt[i].className == "classify-active") {
			highLightbg = aDt[i];
		}
	}
	if (highLightbg) {
			highLightbg.parentNode.appendChild(bb);
		}
}
MYAPP.classify.ele.buildDelete = function (ev) {
    var e = ev ||event;
    var target = e.target || e.srcElement;
    var oImg = document.createElement("img");
    oImg.src = "img/icon_close.png";
    target.appendChild(oImg);
}
MYAPP.classify.ele.offDelete = function (ev) {
    var e = ev ||event;
    var target = e.target || e.srcElement;
    var aNodeChild = target.childNodes;
    console.log(aNodeChild)
    for (var i=0; i<aNodeChild.length; i++) {
        if (aNodeChild[i].nodeName.toLowerCase() == "img") {
            target.removeChild(aNodeChild[i]);
        }
    }
}
MYAPP.classify.todoFunctions.clickHightlight = function () {
	$.delegate("#main-sort", "li", "click", addbg);
	$.delegate("#all-tasklist-box", "dd", "click", addbg);
	$.delegate("#all-tasklist-box", "dt", "click", addbg);
	$.delegate("#classify-default", "p", "click", addbg)
	$.delegate("#all-tasklist-box", "dt", "click", tab);
	function addbg (ev) {
		var aLi = $("#main-sort").getElementsByTagName("li");
		var aDd = $("#all-tasklist-box").getElementsByTagName("dd");
		var aDt = $("#all-tasklist-box").getElementsByTagName("dt");
		var defaultDt = $("#classify-default").getElementsByTagName("p")[0];
		for (var i=0; i<aLi.length; i++) {
			removeClass(aLi[i], "classify-active");
		}
		for (var i=0; i<aDd.length; i++) {
			removeClass(aDd[i], "classify-active");
		}
		for (var i=0; i<aDt.length; i++) {
			removeClass(aDt[i], "classify-active");
		}
		removeClass(defaultDt, "classify-active");
		var e = ev || event;
		var target = e.target || e.srcElement;
		addClass(target, "classify-active");

	}
	function tab(ev) {
		var e = ev || event;
		var target = e.target || e.srcElement;
		var aDd = getSibling(target, "dd");
		// console.log(aDd);
		if (aDd.length > 0) {
			if (aDd[0].className == "disappear") {
				for (var i=0; i<aDd.length; i++) {
					removeClass(aDd[i], "disappear");
				}
			}else {
				removeClass(target, "classify-active");
				for (var i=0; i<aDd.length; i++) {
					addClass(aDd[i], "disappear");
				}
			}
		}
	}
}
MYAPP.classify.todoFunctions.newClassify = function () {
	var newClassify = $("#newclassify");
	addClickEvent(newClassify, getNewClassify);

	function getNewClassify() {
		var title = prompt("请输入新分类名称");
		if (title != null && title != "") {
				//总分类选中时
			if ($("#all-tasklist").className == "classify-active") {
				MYAPP.classify.ele.buildDl(title)
			}else {//
				MYAPP.classify.ele.buildDd(title);
			}
		}
	}
}
MYAPP.classify.todoFunctions.hoverDelete = function () {
	$.delegate("#all-tasklist-box", "dt", "mouseover", showDelete);
	$.delegate("#all-tasklist-box", "dd", "mouseover", showDelete);
	$.delegate("#all-tasklist-box", "dt", "mouseout", offDelete);
	$.delegate("#all-tasklist-box", "dd", "mouseout", offDelete);
	function showDelete(ev) {
        MYAPP.classify.ele.buildDelete(ev);
	}
    function offDelete(ev) {
        MYAPP.classify.ele.offDelete(ev);
    }
}
//点击classify栏里的切换，背景改变
MYAPP.classify.todoFunctions.clickHightlight();
//生成一个新分类
MYAPP.classify.todoFunctions.newClassify();
//在类别上hover显示close
MYAPP.classify.todoFunctions.hoverDelete();
