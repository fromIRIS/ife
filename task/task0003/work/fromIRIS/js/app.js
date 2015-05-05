//是否要把文件夹的索引值设置为全局变量
var MYAPP = MYAPP || {};
MYAPP.Data = [];
MYAPP.index = 0;
MYAPP.todoFunctions = {};

MYAPP.classify = {};
MYAPP.classify.todoFunctions = {};
MYAPP.classify.ele = {};

MYAPP.timelist = {};
MYAPP.timelist.todoFunctions = {};
MYAPP.timelist.ele = {};


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
	var highLightbg = null;
	for (var i=0; i<aDt.length; i++) {
		if (aDt[i].className == "classify-active") {
			highLightbg = aDt[i];
		}
	}
	if (highLightbg) {
			highLightbg.parentNode.appendChild(bb);
	}
    var arrFile = [];
    MYAPP.Data.push(arrFile);
    console.log(MYAPP.Data)
}
MYAPP.classify.ele.buildDelete = function (ev) {
    var e = ev ||event;
    var target = e.target || e.srcElement;
    //加一个判断，如果移入时img存在了那就改变opacity，不存在则append一个
    if (target.getElementsByTagName("img").length > 0) {
        var aNodeChild = target.childNodes;
        for (var i=0; i<aNodeChild.length; i++) {
            if (aNodeChild[i].nodeName.toLowerCase() == "img") {
                aNodeChild[i].style.opacity = 1;
                aNodeChild[i].style.filter = 'alpha(opacity:' + 100 + ')';
            }
        }
    }else {
        var oImg = document.createElement("img");
        oImg.src = "img/icon_close.png";
        target.appendChild(oImg);
    }
}
MYAPP.classify.ele.offDelete = function (ev) {
    var e = ev ||event;
    var target = e.target || e.srcElement;
    var aNodeChild = target.childNodes;
    for (var i=0; i<aNodeChild.length; i++) {
        if (aNodeChild[i].nodeName.toLowerCase() == "img") {
            // target.removeChild(aNodeChild[i]);
            aNodeChild[i].style.opacity = 0;
            aNodeChild[i].style.filter = 'alpha(opacity:' + 0 + ')';
        }
    }
}
MYAPP.classify.todoFunctions.clickAll = function () {
	$.delegate("#main-sort", "li", "click", addbg);
	$.delegate("#all-tasklist-box", "dd", "click", addbg);
	$.delegate("#all-tasklist-box", "dt", "click", addbg);
	$.delegate("#classify-default", "p", "click", addbg)
	$.delegate("#all-tasklist-box", "dt", "click", tab);
    $.delegate("#all-tasklist-box", "img", "click", deleteFile);
    $.delegate("#all-tasklist-box", "dd", "click", updateTimeList);
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
    function deleteFile(ev) {
        var ff = confirm("确定要删除吗");
        if (ff == true) {
            var e = ev || event;
            var target = e.target || e.srcElement;
            console.log(target)
            if (target.parentNode.nodeName.toLowerCase() == "dt") {
                target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
            }else {
                target.parentNode.parentNode.removeChild(target.parentNode);
            }
        }
    }
    function updateTimeList(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        target.index = index(target);
        MYAPP.Data.index = target.index;
        console.log(MYAPP.Data.index)

    }
}
MYAPP.classify.todoFunctions.newClassify = function () {
	var newClassify = $("#newclassify");
	addClickEvent(newClassify, getNewClassify);

	function getNewClassify() {
        if ($("#classify-default").getElementsByTagName("p")[0].className == "classify-active") {
            alert("请点击\"分类列表\"新增分类")
        }else {
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
}
MYAPP.classify.todoFunctions.hoverDelete = function () {
	$.delegate("#all-tasklist-box", "dt", "mouseover", showDelete);
	$.delegate("#all-tasklist-box", "dd", "mouseover", showDelete);
    $.delegate("#all-tasklist-box", "img", "mouseover", showDeleteAgain);
	$.delegate("#all-tasklist-box", "dt", "mouseout", offDelete);
	$.delegate("#all-tasklist-box", "dd", "mouseout", offDelete);
    $.delegate("#all-tasklist-box", "img", "mouseout", offDeleteAgain);
	function showDelete(ev) {
        MYAPP.classify.ele.buildDelete(ev);
	}
    function offDelete(ev) {
        MYAPP.classify.ele.offDelete(ev);
    }
    function showDeleteAgain(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        target.style.opacity = 1;
        target.style.filter = 'alpha(opacity:' + 1 + ')';
    }
    function offDeleteAgain(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        target.style.opacity = 0;
        target.style.filter = 'alpha(opacity:' + 0 + ')';
    }
}


MYAPP.timelist.ele.buildEditor = function () {
    var oTaskMain = $(".task-main");
    oTaskMain.innerHTML = "";
    var oHeader = document.createElement("div");
    oHeader.id = "task-main-header";
    var oHeaderTxt = document.createTextNode("输入标题： ");
    oHeader.appendChild(oHeaderTxt);
    var oHeaderBox = document.createElement("input");
    oHeaderBox.type = "text";
    oHeader.appendChild(oHeaderBox);
    var oEditConfirm = document.createElement("ul");
    oEditConfirm.id = "edit-confirm";
    var oEditTrue = document.createElement("li");
    oEditTrue.id = "edit-true";
    oEditTrue.innerHTML = "确认";
    oEditConfirm.appendChild(oEditTrue);
    var oEditFalse = document.createElement("li");
    oEditFalse.id = "edit-false";
    oEditFalse.innerHTML = "取消";
    oEditConfirm.appendChild(oEditFalse);
    oHeader.appendChild(oEditConfirm);
    oTaskMain.appendChild(oHeader);
    var oTime = document.createElement("div");
    oTime.id = "finish-time";
    var oTimeTxt = document.createTextNode("完成时间： ");
    oTime.appendChild(oTimeTxt);
    var oTimeBox = document.createElement("input");
    oTimeBox.type = "text";
    oTime.appendChild(oTimeBox);
    oTaskMain.appendChild(oTime);
    var oTxt = document.createElement("div");
    oTxt.id = "task-main-content";
    var oTextArea = document.createElement("textarea");
    oTextArea.cols = 80;
    oTextArea.rows = 80;
    oTxt.appendChild(oTextArea);
    oTaskMain.appendChild(oTxt);
}
MYAPP.timelist.ele.removeEditor = function () {
    var oTaskMain = $(".task-main");
    oTaskMain.innerHTML = "";
    var oHeader = document.createElement("div");
    oHeader.id = "task-main-header";
    var oTitle = document.createElement("h1");
    oTitle.innerHTML = "ddd";
    oHeader.appendChild(oTitle);
    var oImgFinish = document.createElement("img");
    oImgFinish.src = "img/icon_write.png";
    oImgFinish.className = "icon-write";
    oHeader.appendChild(oImgFinish);

    var oImgEdit = document.createElement("img");
    oImgEdit.src = "img/icon_tick.png";
    oImgEdit.className = "icon-tick";
    oHeader.appendChild(oImgEdit);
    oTaskMain.appendChild(oHeader);

    var oTime = document.createElement("div");
    oTime.id = "finish-time";
    var oTimeTxt = document.createTextNode("完成时间： ");
    oTime.appendChild(oTimeTxt);
    oTaskMain.appendChild(oTime);

    var oTxt = document.createElement("div");
    oTxt.id = "task-main-content";
    var oTextArea = document.createElement("textarea");
    oTextArea.cols = 80;
    oTextArea.rows = 80;
    oTxt.appendChild(oTextArea);
    oTaskMain.appendChild(oTxt);
}
MYAPP.timelist.todoFunctions.newTask = function () {
    addClickEvent($("#newtask"), getNewTask);
    function getNewTask() {
        // if() {}  //需要判断可以新开任务的条件
        MYAPP.timelist.ele.buildEditor();
    }
}
MYAPP.timelist.todoFunctions.cancelNewTask = function () {
    $.delegate(".task-main", "li", "click", function (ev) {
        var e = ev || event;
        var target = e.event || e.srcElement;
        if (target.id == "edit-false") {
            MYAPP.timelist.ele.removeEditor();
        }
    });
}

//点击classify栏里的切换，背景改变
MYAPP.classify.todoFunctions.clickAll();
//生成一个新分类
MYAPP.classify.todoFunctions.newClassify();
//在类别上hover显示close
MYAPP.classify.todoFunctions.hoverDelete();

MYAPP.timelist.todoFunctions.cancelNewTask();

MYAPP.timelist.todoFunctions.newTask();//点击文件夹后才可以新建任务
