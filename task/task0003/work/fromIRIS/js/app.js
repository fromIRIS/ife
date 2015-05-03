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
	bb.innerHTML = title + "<span></span>";
	aa.appendChild(bb);
	oo.insertBefore(aa, oFirst);
}
MYAPP.classify.ele.buildDd = function (title) {
	var bb = document.createElement("dd");
	bb.innerHTML = title + "<span></span>";
	var highLightbg = $("[class=classify-active]");
	highLightbg.parentNode.appendChild(bb);
}

MYAPP.classify.todoFunctions.clickHightlight = function () {
	$.delegate("#main-sort", "li", "click", addbg);
	$.delegate("#all-tasklist-box", "dd", "click", addbg);
	$.delegate("#all-tasklist-box", "dt", "click", addbg);
	$.delegate("#all-tasklist-box", "dt", "click", tab);
	function addbg (ev) {
		var aLi = $("#main-sort").getElementsByTagName("li");
		var aDd = $("#all-tasklist-box").getElementsByTagName("dd");
		var aDt = $("#all-tasklist-box").getElementsByTagName("dt");
		for (var i=0; i<aLi.length; i++) {
			removeClass(aLi[i], "classify-active");
		}
		for (var i=0; i<aDd.length; i++) {
			removeClass(aDd[i], "classify-active");
		}
		for (var i=0; i<aDt.length; i++) {
			removeClass(aDt[i], "classify-active");
		}
		var e = ev || event;
		var target = e.target || e.srcElement;
		addClass(target, "classify-active");

	}
	var isTab = true;
	function tab(ev) {
		var e = ev || event;
		var target = e.target || e.srcElement;
		var aDd = getSibling(target, "dd");
		console.log(aDd);
		if (aDd.length > 0) {
			if (aDd[0].className == "disappear") {
				for (var i=0; i<aDd.length; i++) {
					removeClass(aDd[i], "disappear");
				}
			}else {
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
			// MYAPP.classify.ele.buildDl(title);
			if ($("#all-tasklist").className == "classify-active") {
				MYAPP.classify.ele.buildDl(title)
			}else {
				MYAPP.classify.ele.buildDd(title);
			}
		}
	}
}
//点击classify栏里的切换，背景改变
MYAPP.classify.todoFunctions.clickHightlight();
//生成一个新分类
MYAPP.classify.todoFunctions.newClassify();
