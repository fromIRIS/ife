var MYAPP = MYAPP || {};
MYAPP.reEditContent = {};//编辑任务时的临时内容
MYAPP.Data = [];//存放分类文件夹-所有任务
for (var i=0; i<1000; i++) {
    MYAPP.Data.push(new Array());
}
MYAPP.index = 0;//点击分类列表时当前index值赋给此全局变量
MYAPP.timeBoxList = [];//存放某个文件夹的time-task列表-所有任务
MYAPP.timeBoxListFinished = [];//存放某个文件夹的time-task列表-已完成
MYAPP.timeBoxListUnFinished = [];//存放某个文件夹的time-task列表-未完成
MYAPP.taskNum = [];
for (var i=0; i<100; i++) {
    MYAPP.taskNum.push(0);
}
MYAPP.subIndex = 0; //点击time-task列表时当前id值赋给此全局变量
// MYAPP.Num = 0;//添加新分类时就会累加Num
MYAPP.DataFinished = [];
for (var i=0; i<1000; i++) {
    MYAPP.DataFinished.push(new Array());
}
MYAPP.DataUnFinished = [];
for (var i=0; i<1000; i++) {
    MYAPP.DataUnFinished.push(new Array());
}
MYAPP.todoFunctions = {};

MYAPP.todoFunctions.classifySet = function () {
    var innerClassify = $("#all-tasklist-box").innerHTML;
    localStorage.setItem("classify", innerClassify);
    var classifyAlltaskCount = $("#all-task").innerHTML;
    localStorage.setItem("classifyAllTaskCount", classifyAlltaskCount);
    var classifyDefaultCount = $("#classify-default").getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML;
    localStorage.setItem("classifyDefaultCount", classifyDefaultCount);
}
MYAPP.todoFunctions.indexShow = function () {
    //初始设置
    $("#finish-time").innerHTML = "时间期限：" + new Date().getFullYear() +'-'+ parseInt(new Date().getMonth() + 1) +'-'+ new Date().getDate();
    //显示分类文件夹列表
    var a = localStorage.getItem("classify");
    if (a) {
        $("#all-tasklist-box").innerHTML = a;
        var aDd = $("#all-tasklist-box").getElementsByTagName("dd");
        var aDt = $("#all-tasklist-box").getElementsByTagName("dt");
        var defaultDt = $("#classify-default").getElementsByTagName("p");

        for (var i=0; i<aDd.length; i++) {
            removeClass(aDd[i], "classify-active");
        }
        addClass(defaultDt, "classify-active");
        for (var i=0; i<aDt.length; i++) {
            removeClass(aDt[i], "classify-active");
        }
    }
    if (localStorage.getItem("classifyAllTaskCount")) {
        $("#all-task").innerHTML = localStorage.getItem("classifyAllTaskCount");
    }
    if (localStorage.getItem("classifyDefaultCount")) {
        $("#classify-default").getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML = localStorage.getItem("classifyDefaultCount");
    }
    //显示任务列表
    var timeBoxList = JSON.parse(localStorage.getItem("MYAPP.timeBoxList"));
    var timeBoxListUnFinished = JSON.parse(localStorage.getItem("MYAPP.timeBoxListUnFinished"));
    var timeBoxListFinished = JSON.parse(localStorage.getItem("MYAPP.timeBoxListFinished"));
    if (timeBoxList) {
        $("#task-timelist-list").innerHTML = timeBoxList[MYAPP.index];
    }
    if (timeBoxListUnFinished) {
        $("#task-timelist-list-unfinished").innerHTML = timeBoxListUnFinished[MYAPP.index];
    }
    if (timeBoxListFinished) {
        $("#task-timelist-list-finished").innerHTML = timeBoxListFinished[MYAPP.index];
    }
}
MYAPP.todoFunctions.saveInterface = function () {
    var innerClassify = $("#all-tasklist-box").innerHTML;
    localStorage.setItem("classify", innerClassify);
    var classifyAlltaskCount = $("#all-task").innerHTML;
    localStorage.setItem("classifyAllTaskCount", classifyAlltaskCount);
    var classifyDefaultCount = $("#classify-default").getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML;
    localStorage.setItem("classifyDefaultCount", classifyDefaultCount);
    //将目前的time-task-all列表存到内存
    var MYAPPTimeBoxList = JSON.parse(localStorage.getItem("MYAPP.timeBoxList"));
    if (MYAPPTimeBoxList) {
        MYAPPTimeBoxList[MYAPP.index] = $("#task-timelist-list").innerHTML;
        localStorage.setItem("MYAPP.timeBoxList", JSON.stringify(MYAPPTimeBoxList));
    } else {
        MYAPP.timeBoxList[MYAPP.index] = $("#task-timelist-list").innerHTML;
        localStorage.setItem("MYAPP.timeBoxList", JSON.stringify(MYAPP.timeBoxList));
    }
    //将目前的time-task-finished列表存到内存
    var MYAPPTimeBoxListFinished = JSON.parse(localStorage.getItem("MYAPP.timeBoxListFinished"));
    if (MYAPPTimeBoxListFinished) {
        MYAPPTimeBoxListFinished[MYAPP.index] = $("#task-timelist-list-finished").innerHTML;
        localStorage.setItem("MYAPP.timeBoxListFinished", JSON.stringify(MYAPPTimeBoxListFinished));
    } else {
        MYAPP.timeBoxListFinished[MYAPP.index] = $("#task-timelist-list-finished").innerHTML;
        localStorage.setItem("MYAPP.timeBoxListFinished", JSON.stringify(MYAPP.timeBoxListFinished));
    }
    //将目前的time-task-unfinished-列表存到内存
    var MYAPPTimeBoxListUnFinished = JSON.parse(localStorage.getItem("MYAPP.timeBoxListUnFinished"));
    if (MYAPPTimeBoxListUnFinished) {
        MYAPPTimeBoxListUnFinished[MYAPP.index] = $("#task-timelist-list-unfinished").innerHTML;
        localStorage.setItem("MYAPP.timeBoxListUnFinished", JSON.stringify(MYAPPTimeBoxListUnFinished));
    } else {
        MYAPP.timeBoxListUnFinished[MYAPP.index] = $("#task-timelist-list-unfinished").innerHTML;
        localStorage.setItem("MYAPP.timeBoxListUnFinished", JSON.stringify(MYAPP.timeBoxListUnFinished));
    }
}

//JSON.parse(localStorage.getItem("MYAPP.Data"));
//JSON.parse(localStorage.getItem("MYAPP.DataFinished"))
//JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))
//JSON.parse(localStorage.getItem("MYAPP.timeBoxList"))
//JSON.parse(localStorage.getItem("MYAPP.timeBoxListUnFinished"))
//JSON.parse(localStorage.getItem("MYAPP.timeBoxListFinished"))

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

        // MYAPP.Num ++;
        var numItems = parseInt(localStorage.getItem("MYAPP.Num"));
        if (localStorage.getItem("MYAPP.Num")) {
            numItems = numItems + 1;
            console.log(numItems)
            localStorage.setItem("MYAPP.Num", numItems);
        } else {
            localStorage.setItem("MYAPP.Num", 1);
        }
        bb.id = parseInt(localStorage.getItem("MYAPP.Num"));
        highLightbg.parentNode.appendChild(bb);
        /*var arrFile = [];
        MYAPP.Data.length += 1;*/
    }

    console.log("分类文件夹数组个数" + MYAPP.Data.length)
    console.log("新生成文件夹的数量" + parseInt(localStorage.getItem("MYAPP.Num")))
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
    $.delegate("#all-tasklist-box", "img", "click", clearTimeList);
    $.delegate("#all-tasklist-box", "dd", "click", updateIndex);
    $.delegate("#all-tasklist-box", "dd", "click", updateTimeList);
    $.delegate("#classify-default", "p", "click", updateIndex);
    $.delegate("#classify-default", "p", "click", updateTimeList);

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
        //分类列表的数字显示
        
            var aClassifyDt = $("#all-tasklist-box").getElementsByTagName("dt");
            for (var i=0; i<aClassifyDt.length; i++) {
                var aDdOfDl = getSibling(aClassifyDt[i], "dd");
                var countOfDl = 0;
                if (aDdOfDl.length > 0) {
                    for (var j=0; j<aDdOfDl.length; j++) {
                        countOfDl += parseInt(aDdOfDl[j].getElementsByTagName("span")[0].innerHTML.match(/\d+/));
                    }
                }
                aClassifyDt[i].getElementsByTagName("span")[0].innerHTML = '(' + countOfDl + ')';
            }

            //所有任务的计数
            var aDt = $("#all-tasklist-box").getElementsByTagName("dt");
            var countOfAll = 0;
            for (var i=0; i<aDt.length; i++) {
                countOfAll += parseInt(aDt[i].getElementsByTagName("span")[0].innerHTML.match(/\d+/));
            }
            var countOfAllAddDefault = countOfAll + parseInt(JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[0].length);
            $("#all-task").getElementsByTagName("span")[0].innerHTML = '(' + countOfAllAddDefault + ')';

            //默认分类计数
            $("#classify-default").getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML = '(' + parseInt(JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[0].length) + ')';

            //保存页面
            MYAPP.todoFunctions.saveInterface();
    }
    function updateIndex(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        // target.index = index(target);
        // target.index = target.index;
        MYAPP.index = target.id;
        // localStorage.setItem("MYAPP.index", MYAPP.index)
        console.log("点击文件夹时的序号MYAPP.index" + MYAPP.index)
    }

    function clearTimeList() {
        $("#task-timelist-list").innerHTML = "";
        MYAPP.timelist.ele.removeEditor("欢迎使用DD任务", "无限制", "xxx");
        $(".icon-tick").style.display = "none";
        $(".icon-write").style.display = "none";
    }
    function updateTimeList() {
        // $("#task-timelist-list").innerHTML = "";
        MYAPP.timelist.ele.removeEditor("欢迎使用DD任务", "无限制", "xxx");
        $(".icon-tick").style.display = "none";
        $(".icon-write").style.display = "none";
        //task-time-all列表
        if (JSON.parse(localStorage.getItem("MYAPP.timeBoxList"))) {
            if (JSON.parse(localStorage.getItem("MYAPP.timeBoxList"))[MYAPP.index]) {
                $("#task-timelist-list").innerHTML = JSON.parse(localStorage.getItem("MYAPP.timeBoxList"))[MYAPP.index];
            } else {
                $("#task-timelist-list").innerHTML = "";
            }
        }
        //task-time-finished列表
        if (JSON.parse(localStorage.getItem("MYAPP.timeBoxListFinished"))) {
            if (JSON.parse(localStorage.getItem("MYAPP.timeBoxListFinished"))[MYAPP.index]) {
                $("#task-timelist-list-finished").innerHTML = JSON.parse(localStorage.getItem("MYAPP.timeBoxListFinished"))[MYAPP.index];
            } else {
                $("#task-timelist-list-finished").innerHTML = "";
            }
        }
        //task-time-unfinished列表
        if (JSON.parse(localStorage.getItem("MYAPP.timeBoxListUnFinished"))) {
            if (JSON.parse(localStorage.getItem("MYAPP.timeBoxListUnFinished"))[MYAPP.index]) {
                $("#task-timelist-list-unfinished").innerHTML = JSON.parse(localStorage.getItem("MYAPP.timeBoxListUnFinished"))[MYAPP.index];
            } else {
                $("#task-timelist-list-unfinished").innerHTML = "";
            }
        }
    }
}
MYAPP.classify.todoFunctions.newClassify = function () {
    var newClassify = $("#newclassify");
    addClickEvent(newClassify, getNewClassify);

    function getNewClassify() {
        if ($("#classify-default").getElementsByTagName("p")[0].className == "classify-active") {
            alert("请先点击\"分类列表\"新增一级分类; Tips: 点击一级分类再点击")
        }else {
            var title = prompt("请输入新分类名称");
            if (title != null && title != "") {
                    //总分类选中时
                if ($("#all-tasklist").className == "classify-active") {
                    MYAPP.classify.ele.buildDl(title)
                }else {//
                    MYAPP.classify.ele.buildDd(title);
                }
                MYAPP.todoFunctions.classifySet();
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


MYAPP.timelist.ele.buildEditorNewTask = function () {//1.title 2.time 3.content
    var oTaskMain = $(".task-main");
    oTaskMain.innerHTML = "";
    var oHeader = document.createElement("div");
    oHeader.id = "task-main-header";
    var oHeaderTxt = document.createTextNode("输入标题： ");
    oHeader.appendChild(oHeaderTxt);
    var oHeaderBox = document.createElement("input");
    oHeaderBox.type = "text";
    oHeaderBox.placeholder = "控制字数15以内";
    if (arguments[0]) {
        oHeaderBox.value = arguments[0];
    }
    oHeader.appendChild(oHeaderBox);
    var oEditConfirm = document.createElement("ul");
    oEditConfirm.id = "newtask-edit-confirm";
    var oEditTrue = document.createElement("li");
    oEditTrue.id = "newtask-edit-true";
    oEditTrue.innerHTML = "确认";
    oEditConfirm.appendChild(oEditTrue);
    var oEditFalse = document.createElement("li");
    oEditFalse.id = "newtask-edit-false";
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
    oTimeBox.placeholder = "yyyy-mm-dd";
    if (arguments[1]) {
        oTimeBox.value = arguments[1];
    }
    oTime.appendChild(oTimeBox);
    oTaskMain.appendChild(oTime);
    var oTxt = document.createElement("div");
    oTxt.id = "task-main-content";
    var oTextArea = document.createElement("textarea");
    oTextArea.cols = 80;
    oTextArea.rows = 80;
    if (arguments[2]) {
        oTextArea.value = arguments[2];
    }
    oTxt.appendChild(oTextArea);
    oTaskMain.appendChild(oTxt);
}
MYAPP.timelist.ele.buildEditorEditTask = function () {//1.title 2.time 3.content
    var oTaskMain = $(".task-main");
    oTaskMain.innerHTML = "";
    var oHeader = document.createElement("div");
    oHeader.id = "task-main-header";
    var oHeaderTxt = document.createTextNode("输入标题： ");
    oHeader.appendChild(oHeaderTxt);
    var oHeaderBox = document.createElement("input");
    oHeaderBox.type = "text";
    oHeaderBox.placeholder = "控制字数15以内";
    if (arguments[0]) {
        oHeaderBox.value = arguments[0];
    }
    oHeader.appendChild(oHeaderBox);
    var oEditConfirm = document.createElement("ul");
    oEditConfirm.id = "edittask-edit-confirm";
    var oEditTrue = document.createElement("li");
    oEditTrue.id = "edittask-edit-true";
    oEditTrue.innerHTML = "确认";
    oEditConfirm.appendChild(oEditTrue);
    var oEditFalse = document.createElement("li");
    oEditFalse.id = "edittask-edit-false";
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
    oTimeBox.placeholder = "yyyy-mm-dd";
    if (arguments[1]) {
        oTimeBox.value = arguments[1];
    }
    oTime.appendChild(oTimeBox);
    oTaskMain.appendChild(oTime);
    var oTxt = document.createElement("div");
    oTxt.id = "task-main-content";
    var oTextArea = document.createElement("textarea");
    oTextArea.cols = 80;
    oTextArea.rows = 80;
    if (arguments[2]) {
        oTextArea.value = arguments[2];
    }
    oTxt.appendChild(oTextArea);
    oTaskMain.appendChild(oTxt);
}
MYAPP.timelist.ele.removeEditor = function () {//1.title 2.time 3.content
    var oTaskMain = $(".task-main");
    oTaskMain.innerHTML = "";
    var oHeader = document.createElement("div");
    oHeader.id = "task-main-header";
    var oTitle = document.createElement("h1");
    if (arguments[0]) {
        oTitle.innerHTML = arguments[0];
    }
    oHeader.appendChild(oTitle);
    var oImgFinish = document.createElement("img");
    oImgFinish.src = "img/icon_write.png";
    oImgFinish.className = "icon-write";
    oImgFinish.width = 20;
    oHeader.appendChild(oImgFinish);

    var oImgEdit = document.createElement("img");
    oImgEdit.src = "img/icon_tick.png";
    oImgEdit.className = "icon-tick";
    oImgEdit.width = 22;
    oHeader.appendChild(oImgEdit);
    oTaskMain.appendChild(oHeader);

    var oTime = document.createElement("div");
    oTime.id = "finish-time";
    var oTimeTxt = document.createTextNode("时间期限: ");
    // oTimeTxt.innerHTML = "时间期限: ";
    oTime.appendChild(oTimeTxt);
    var oTimeTxtValue = document.createElement("span");
    if (arguments[1]) {
        oTimeTxtValue.innerHTML = arguments[1];
    }
    oTime.appendChild(oTimeTxtValue);
    oTaskMain.appendChild(oTime);

    var oTxt = document.createElement("div");
    oTxt.id = "task-main-content";
    var oTextArea = document.createElement("p");
    if (arguments[2]) {
        oTextArea.innerHTML = arguments[2];
    }
    oTxt.appendChild(oTextArea);
    oTaskMain.appendChild(oTxt);
}
MYAPP.timelist.ele.addArrayTaskInfo = function () {
    if ($("#finish-time").getElementsByTagName("input")[0].value.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
        var oContent = {};
        oContent.titleTxt = $("#task-main-header").getElementsByTagName("input")[0].value;
        oContent.timeTxt = $("#finish-time").getElementsByTagName("input")[0].value;
        oContent.contentTxt = $("#task-main-content").getElementsByTagName("textarea")[0].value;
        var MYAPPData = JSON.parse(localStorage.getItem("MYAPP.Data"));
        if (MYAPPData) {
            MYAPPData[MYAPP.index].push(oContent);
            localStorage.setItem("MYAPP.Data", JSON.stringify(MYAPPData));
        } else {
            MYAPP.Data[MYAPP.index].push(oContent);
            localStorage.setItem("MYAPP.Data", JSON.stringify(MYAPP.Data));
        }
    } else {
        alert("请输入yyyy-mm-dd格式的日期");
        return ;
    }
}
MYAPP.timelist.ele.addArrayUnfinished = function () {
    var newArr = cloneObject(JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index], []);
    console.log(JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index])
    console.log("以下为复制的数组")
    console.log(newArr.length)
    for (var i=0; i<newArr.length; i++) {
        console.log(newArr[i])
    }

    for (var i=0; i<newArr.length; i++) {
        if (JSON.parse(localStorage.getItem("MYAPP.DataFinished"))) {
            console.log(i)
            for (var j=0; j<JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index].length; j++) {
                if (newArr[i].contentTxt == JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][j].contentTxt && newArr[i].titleTxt == JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][j].titleTxt) {
                        newArr.splice(i, 1);
                    i--;
                    break;      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!fuck!!!!
                }
            }
        }
    }
    console.log("以下为unfinished的数组")
    console.log(newArr)
    //将未完成的数组存入全局
    var MYAPPDataUnfinished = JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"));
    if (MYAPPDataUnfinished) {
        MYAPPDataUnfinished[MYAPP.index] = cloneObject(newArr, []);
        localStorage.setItem("MYAPP.DataUnFinished", JSON.stringify(MYAPPDataUnfinished));
    } else {
        MYAPP.DataUnFinished[MYAPP.index] = cloneObject(newArr, []);
        localStorage.setItem("MYAPP.DataUnFinished", JSON.stringify(MYAPP.DataUnFinished));
    }
}
MYAPP.timelist.ele.updateTaskInfo = function () {
    var oTimeBox = $("#task-timelist-list");
    var listObj = MYAPP.Data[MYAPP.index];
    var oTimeBoxDt = oTimeBox.getElementsByTagName("dt");
    for (var i=0; i<oTimeBoxDt.length; i++) {
        if (oTimeBoxDt[i].innerHTML == listObj[listObj.length-1].timeTxt) {
            var oDd = document.createElement("dd");
            oDd.id = MYAPP.taskNum[MYAPP.index] ++;
            oDd.innerHTML = listObj[listObj.length-1].titleTxt;
            oTimeBoxDt[i].parentNode.appendChild(oDd);
            return;
        }
    }

    var oDl = document.createElement("dl");
    var oDt = document.createElement("dt");
    oDt.innerHTML = listObj[listObj.length-1].timeTxt;
    oDl.appendChild(oDt);
    var oDd = document.createElement("dd");
    oDd.id = MYAPP.taskNum[MYAPP.index] ++;
    console.log("生成任务列表的task-id" + oDd.id )
    oDd.innerHTML = listObj[listObj.length-1].titleTxt;
    oDl.appendChild(oDd);
    oTimeBox.appendChild(oDl);

    var arrNewDl = [];
    var aDl = oTimeBox.getElementsByTagName("dl");
    for (var i=0; i<aDl.length; i++ ) {
        arrNewDl.push(aDl[i]);
    }
    //将生成的dl按照dl下的dt进行排序
    var d = new Date();
    arrNewDl.sort(function (x, y) {
        a1 = x.getElementsByTagName("dt")[0].innerHTML;
        a2 = y.getElementsByTagName("dt")[0].innerHTML;
        o1 = d.setFullYear(a1.split("-")[0], a1.split("-")[1], a1.split("-")[2]);
        o2 = d.setFullYear(a2.split("-")[0], a2.split("-")[1], a2.split("-")[2]);
        return o1 - o2;
    })
    console.log(arrNewDl)
    oTimeBox.innerHTML = "";
    for (var i=0; i<arrNewDl.length; i++) {
        var oDl2 = document.createElement("dl");
        oDl2.innerHTML = arrNewDl[i].innerHTML;
        oTimeBox.appendChild(oDl2);
    }
}

MYAPP.timelist.ele.updateTimeListReEdit = function (ele, whichFile) {
    var oTimeBox = ele;//包裹器
    oTimeBox.innerHTML = "";
    var listObj = whichFile;//所有的/已完成的文件夹
    var oTimeBoxDt = oTimeBox.getElementsByTagName("dt");
    MYAPP.taskNum[MYAPP.index] = 0; //重设变量
    outer: for (var i=0; i<listObj.length; i++) {
        for (var j=0; j<oTimeBoxDt.length; j++) {
            if (oTimeBoxDt[j].innerHTML == listObj[i].timeTxt) {
                var oDd = document.createElement("dd");
                oDd.id = MYAPP.taskNum[MYAPP.index] ++;
                oDd.innerHTML = listObj[i].titleTxt;
                oTimeBoxDt[j].parentNode.appendChild(oDd);
                continue outer;
            }
        }
        var oDl = document.createElement("dl");
        var oDt = document.createElement("dt");
        oDt.innerHTML = listObj[i].timeTxt;
        oDl.appendChild(oDt);
        var oDd = document.createElement("dd");
        oDd.id = MYAPP.taskNum[MYAPP.index] ++;
        console.log("生成任务列表的task-id " + oDd.id )
        oDd.innerHTML = listObj[i].titleTxt;
        oDl.appendChild(oDd);
        oTimeBox.appendChild(oDl);
    }
    var arrNewDl = [];
    var aDl = oTimeBox.getElementsByTagName("dl");
    for (var i=0; i<aDl.length; i++ ) {
        arrNewDl.push(aDl[i]);
    }
    //将生成的dl按照dl下的dt进行排序
    var d = new Date();
    arrNewDl.sort(function (x, y) {
        a1 = x.getElementsByTagName("dt")[0].innerHTML;
        a2 = y.getElementsByTagName("dt")[0].innerHTML;
        o1 = d.setFullYear(a1.split("-")[0], a1.split("-")[1], a1.split("-")[2]);
        o2 = d.setFullYear(a2.split("-")[0], a2.split("-")[1], a2.split("-")[2]);
        return o1 - o2;
    })
    console.log(arrNewDl)
    oTimeBox.innerHTML = "";
    for (var i=0; i<arrNewDl.length; i++) {
        var oDl2 = document.createElement("dl");
        oDl2.innerHTML = arrNewDl[i].innerHTML;
        oTimeBox.appendChild(oDl2);
    }
}
MYAPP.timelist.todoFunctions.cancelReEdit = function () {
    $.delegate(".task-main", "li", "click", function (ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        if (target.id == "edittask-edit-false") {
            var oTitle = MYAPP.reEditContent.titleTxt;
            var oTime = MYAPP.reEditContent.timeTxt;
            var oContent = MYAPP.reEditContent.contentTxt;
            MYAPP.timelist.ele.removeEditor(oTitle, oTime, oContent);
        }
    });
}
MYAPP.timelist.todoFunctions.cancelNewTask = function () {
    $.delegate(".task-main", "li", "click", function (ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        if (target.id == "newtask-edit-false") {
            // var oTitle = $("#task-main-header").getElementsByTagName("input")[0].value;
            // var oTime = $("#finish-time").getElementsByTagName("input")[0].value;
            // var oContent = $("#task-main-content").getElementsByTagName("textarea")[0].value;
            MYAPP.timelist.ele.removeEditor("欢迎使用DD任务", "无限制", "xxx");
        }
    });
}
MYAPP.timelist.todoFunctions.confirmNewTask = function () {
    $.delegate(".task-main", "li", "click", function (ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        if (target.id == "newtask-edit-true") {

            //更新了task-time-all-列表
            // MYAPP.timelist.ele.addArrayTaskInfo();
            if ($("#finish-time").getElementsByTagName("input")[0].value.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
                var oContent = {};
                oContent.titleTxt = $("#task-main-header").getElementsByTagName("input")[0].value;
                oContent.timeTxt = $("#finish-time").getElementsByTagName("input")[0].value;
                oContent.contentTxt = $("#task-main-content").getElementsByTagName("textarea")[0].value;
                var MYAPPData = JSON.parse(localStorage.getItem("MYAPP.Data"));
                if (MYAPPData) {
                    MYAPPData[MYAPP.index].push(oContent);
                    localStorage.setItem("MYAPP.Data", JSON.stringify(MYAPPData));
                } else {
                    MYAPP.Data[MYAPP.index].push(oContent);
                    localStorage.setItem("MYAPP.Data", JSON.stringify(MYAPP.Data));
                }
            } else {
                alert("请输入yyyy-mm-dd格式的日期");
                return ;
            }
            var a = JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index];
            console.log("下方当前分类文件夹的对象集合")
            console.log(a)
            MYAPP.timelist.ele.updateTimeListReEdit($("#task-timelist-list"), a);

            //给已完成的task加上样式
            var aDd = $("#task-timelist-list").getElementsByTagName("dd");
            for (var i=0; i<aDd.length; i++) {
                if (JSON.parse(localStorage.getItem("MYAPP.DataFinished"))) {
                    for (var j=0; j<JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index].length; j++) {
                        if (aDd[i].innerHTML == JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][j].titleTxt && aDd[i].parentNode.getElementsByTagName("dt")[0].innerHTML == JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][j].timeTxt) {
                            addClass(aDd[i], "task-list-finished");
                        }
                    }
                }
            }

            //更新了未完成的task-time-unfinished列表
            MYAPP.timelist.ele.addArrayUnfinished();
            MYAPP.timelist.ele.updateTimeListReEdit($("#task-timelist-list-unfinished"), JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[MYAPP.index]);

            //保存页面
            MYAPP.todoFunctions.saveInterface();

            //分类列表的数字显示
            //各个文件夹未完成task计数
            var aClassifyDd = $("#all-tasklist-box").getElementsByTagName("dd");
            for (var i=0; i<aClassifyDd.length; i++) {
                if (aClassifyDd[i].id == MYAPP.index) {
                    aClassifyDd[i].getElementsByTagName("span")[0].innerHTML = '(' + parseInt(JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[MYAPP.index].length) + ')';
                    var oDl = aClassifyDd[i].parentNode.getElementsByTagName("dt")[0];
                    var aDdOfDl = getSibling(oDl, "dd");

                    var countOfDl = 0;
                    for (var j=0; j<aDdOfDl.length; j++) {
                        countOfDl += parseInt(aDdOfDl[j].getElementsByTagName("span")[0].innerHTML.match(/\d+/));
                    }
                    oDl.getElementsByTagName("span")[0].innerHTML = '(' + countOfDl + ')';
                    break;
                }
            }
            //所有任务的计数
            var aDt = $("#all-tasklist-box").getElementsByTagName("dt");
            var countOfAll = 0;
            for (var i=0; i<aDt.length; i++) {
                countOfAll += parseInt(aDt[i].getElementsByTagName("span")[0].innerHTML.match(/\d+/));
            }
            var countOfAllAddDefault = countOfAll + parseInt(JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[0].length);
            $("#all-task").getElementsByTagName("span")[0].innerHTML = '(' + countOfAllAddDefault + ')';

            //默认分类计数
            $("#classify-default").getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML = '(' + parseInt(JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[0].length) + ')';

            //生成详情页面
            var oTitle = $("#task-main-header").getElementsByTagName("input")[0].value;
            var oTime = $("#finish-time").getElementsByTagName("input")[0].value;
            var oContent = $("#task-main-content").getElementsByTagName("textarea")[0].value;
            MYAPP.timelist.ele.removeEditor(oTitle, oTime, oContent);

            //保存页面
            MYAPP.todoFunctions.classifySet();

        }
    });
}
MYAPP.timelist.todoFunctions.confirmReEdit = function () {
    $.delegate(".task-main", "li", "click", function (ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        if (target.id == "edittask-edit-true") {

            var oTitle = $("#task-main-header").getElementsByTagName("input")[0].value;
            var oTime = $("#finish-time").getElementsByTagName("input")[0].value;
            var oContent = $("#task-main-content").getElementsByTagName("textarea")[0].value;
            if ($("#finish-time").getElementsByTagName("input")[0].value.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
                //将内存中的对象的值修改掉
                var MYAPPData = JSON.parse(localStorage.getItem("MYAPP.Data"));
                MYAPPData[MYAPP.index][MYAPP.subIndex].titleTxt = oTitle;
                MYAPPData[MYAPP.index][MYAPP.subIndex].timeTxt = oTime;
                MYAPPData[MYAPP.index][MYAPP.subIndex].contentTxt = oContent;
                localStorage.setItem("MYAPP.Data", JSON.stringify(MYAPPData));
            } else {
                alert("请输入yyyy-mm-dd格式的日期");
                return;
            }
            console.log("修改后的对象")
            console.log(JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index])

            //更新time-task-all列表
            MYAPP.timelist.ele.updateTimeListReEdit($("#task-timelist-list"), JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index]);

            //更新了未完成的task-time-unfinished列表
            MYAPP.timelist.ele.addArrayUnfinished();
            MYAPP.timelist.ele.updateTimeListReEdit($("#task-timelist-list-unfinished"), JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[MYAPP.index]);


            //给已完成的task加上样式
            var aDd = $("#task-timelist-list").getElementsByTagName("dd");
            for (var i=0; i<aDd.length; i++) {
                if (JSON.parse(localStorage.getItem("MYAPP.DataFinished"))) {
                    console.log("给已完成的task加上样式")
                    for (var j=0; j<JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index].length; j++) {
                        if (aDd[i].innerHTML == JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][j].titleTxt && aDd[i].parentNode.getElementsByTagName("dt")[0].innerHTML == JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][j].timeTxt) {
                            addClass(aDd[i], "task-list-finished");
                        }
                    }
                }
            }
            /*//点击确认增加时把当前task-time-all列表，存到内存
            var MYAPPTimeBoxList = JSON.parse(localStorage.getItem("MYAPP.timeBoxList"));
            if (MYAPPTimeBoxList) {
                MYAPPTimeBoxList[MYAPP.index] = $("#task-timelist-list").innerHTML;
                localStorage.setItem("MYAPP.timeBoxList", JSON.stringify(MYAPPTimeBoxList));
            } else {
                MYAPP.timeBoxList[MYAPP.index] = $("#task-timelist-list").innerHTML;
                localStorage.setItem("MYAPP.timeBoxList", JSON.stringify(MYAPP.timeBoxList));
            }

            //将目前的time-task-unfinished-列表存到内存
            var MYAPPTimeBoxListUnFinished = JSON.parse(localStorage.getItem("MYAPP.timeBoxListUnFinished"));
            if (MYAPPTimeBoxListUnFinished) {
                MYAPPTimeBoxListUnFinished[MYAPP.index] = $("#task-timelist-list-unfinished").innerHTML;
                localStorage.setItem("MYAPP.timeBoxListUnFinished", JSON.stringify(MYAPPTimeBoxListUnFinished));
            } else {
                MYAPP.timeBoxListUnFinished[MYAPP.index] = $("#task-timelist-list-unfinished").innerHTML;
                localStorage.setItem("MYAPP.timeBoxListUnFinished", JSON.stringify(MYAPP.timeBoxListUnFinished));
            }*/
            MYAPP.todoFunctions.saveInterface();

            MYAPP.timelist.ele.removeEditor(oTitle, oTime, oContent);
            //保存页面
            MYAPP.todoFunctions.classifySet();

        }
    });
}
MYAPP.timelist.todoFunctions.clickTimeList = function () {
    $.delegate("#task-timelist-list", "dd", "click", showTaskInfo);
    function showTaskInfo(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        var aP = $("#task-timelist-list").getElementsByTagName("dd");
        for (var i=0; i<aP.length; i++) {
            removeClass(aP[i], "time-active");
        }
        addClass(target, "time-active");
        // target.index = index(target);
        console.log( "task的序号 " + target.id)
        MYAPP.subIndex = target.id;

        var oTitle = JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index][target.id].titleTxt;
        var oTime = JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index][target.id].timeTxt;
        var oContent = JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index][target.id].contentTxt;
        //分两种情况：1-点击完成的；2-点击未完成的
        if (JSON.parse(localStorage.getItem("MYAPP.DataFinished"))) {
            for (var i=0; i<JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index].length; i++) {
                if (target.innerHTML == JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][i].titleTxt && target.parentNode.getElementsByTagName("dt")[0].innerHTML == JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][i].timeTxt) {
                    MYAPP.timelist.ele.removeEditor(oTitle, oTime, oContent);
                    $(".icon-tick").style.display = "none";
                    $(".icon-write").style.display = "none";
                    return;
                }
            }
        }
        MYAPP.timelist.ele.removeEditor(oTitle, oTime, oContent);
    }

    $.delegate("#task-timelist-list-finished", "dd", "click", showTaskInfoFinished);
    function showTaskInfoFinished(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        var aP = $("#task-timelist-list-finished").getElementsByTagName("dd");
        for (var i=0; i<aP.length; i++) {
            removeClass(aP[i], "time-active");
        }
        addClass(target, "time-active");
        // target.index = index(target);
        console.log( "task的序号 " + target.id)
        MYAPP.subIndex = target.id;
        var oTitle = JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][target.id].titleTxt;
        var oTime = JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][target.id].timeTxt;
        var oContent = JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index][target.id].contentTxt;
        MYAPP.timelist.ele.removeEditor(oTitle, oTime, oContent);
        $(".icon-tick").style.display = "none";
        $(".icon-write").style.display = "none";
    }

    $.delegate("#task-timelist-list-unfinished", "dd", "click", showTaskInfoUnFinished);
    function showTaskInfoUnFinished(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        var aP = $("#task-timelist-list-unfinished").getElementsByTagName("dd");
        for (var i=0; i<aP.length; i++) {
            removeClass(aP[i], "time-active");
        }
        addClass(target, "time-active");
        // target.index = index(target);
        console.log( "task的序号 " + target.id)
        MYAPP.subIndex = target.id;
        var oTitle = JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[MYAPP.index][target.id].titleTxt;
        var oTime = JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[MYAPP.index][target.id].timeTxt;
        var oContent = JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[MYAPP.index][target.id].contentTxt;
        MYAPP.timelist.ele.removeEditor(oTitle, oTime, oContent);
        $(".icon-tick").style.display = "none";
        $(".icon-write").style.display = "none";
    }
}
MYAPP.timelist.todoFunctions.reEdit = function () {
    $.delegate(".task-main", "img", "click", reEditTask);
    function reEditTask(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        if (target.className == "icon-write") {
            var oTitle = $("#task-main-header").getElementsByTagName("h1")[0].innerHTML;
            var oTime = $("#finish-time").getElementsByTagName("span")[0].innerHTML;
            var oContent = $("#task-main-content").getElementsByTagName("p")[0].innerHTML;
            MYAPP.timelist.ele.buildEditorEditTask(oTitle, oTime, oContent);
            MYAPP.reEditContent.titleTxt = oTitle;
            MYAPP.reEditContent.timeTxt = oTime;
            MYAPP.reEditContent.contentTxt = oContent;
        }
    }
}
MYAPP.timelist.todoFunctions.newTask = function () {
    addClickEvent($("#newtask"), getNewTask);
    function getNewTask() {
        // if() {}  //需要判断可以新开任务的条件
        var aDd = $("#all-tasklist-box").getElementsByTagName("dd");
        for (var i=0; i<aDd.length; i++) {
            if (aDd[i].className == "classify-active") {
                MYAPP.timelist.ele.buildEditorNewTask();
                return;
            }
        }
        if ($("#classify-default").getElementsByTagName("p")[0].className == "classify-active") {
            MYAPP.timelist.ele.buildEditorNewTask();
            return;
        }
    }
}
MYAPP.timelist.todoFunctions.finish = function () {
    $.delegate(".task-main", "img", "click", reEditTask);
    function reEditTask(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        if (target.className == "icon-tick") {
            var trueFinish = confirm("完成任务后将不能修改，确认完成？");
            if (trueFinish == true) {
            //更新了已完成的task-time-finished的数组
                var MYAPPDataFinished = JSON.parse(localStorage.getItem("MYAPP.DataFinished"));
                if (MYAPPDataFinished) {
                    MYAPPDataFinished[MYAPP.index].push(JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index][MYAPP.subIndex]);
                    localStorage.setItem("MYAPP.DataFinished", JSON.stringify(MYAPPDataFinished));
                } else {
                    MYAPP.DataFinished[MYAPP.index].push(JSON.parse(localStorage.getItem("MYAPP.Data"))[MYAPP.index][MYAPP.subIndex]);
                    localStorage.setItem("MYAPP.DataFinished", JSON.stringify(MYAPP.DataFinished));
                }
                //更新了已完成的task-time-finished列表
                MYAPP.timelist.ele.updateTimeListReEdit($("#task-timelist-list-finished"), JSON.parse(localStorage.getItem("MYAPP.DataFinished"))[MYAPP.index]);


                //task-time列表处的已完成字体变化
                var aDd = $("#task-timelist-list").getElementsByTagName("dd");
                for (var i=0; i<aDd.length; i++ ) {
                    if (aDd[i].id == MYAPP.subIndex) {
                        addClass(aDd[i], "task-list-finished");
                    }
                }

                //更新了未完成的task-time-unfinished列表
                MYAPP.timelist.ele.addArrayUnfinished();
                MYAPP.timelist.ele.updateTimeListReEdit($("#task-timelist-list-unfinished"), JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[MYAPP.index]);

                //分类列表的数字显示
            //各个文件夹未完成task计数
            var aClassifyDd = $("#all-tasklist-box").getElementsByTagName("dd");
            for (var i=0; i<aClassifyDd.length; i++) {
                if (aClassifyDd[i].id == MYAPP.index) {
                    aClassifyDd[i].getElementsByTagName("span")[0].innerHTML = '(' + parseInt(JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[MYAPP.index].length) + ')';
                    var oDl = aClassifyDd[i].parentNode.getElementsByTagName("dt")[0];
                    var aDdOfDl = getSibling(oDl, "dd");

                    var countOfDl = 0;
                    for (var j=0; j<aDdOfDl.length; j++) {
                        countOfDl += parseInt(aDdOfDl[j].getElementsByTagName("span")[0].innerHTML.match(/\d+/));
                    }
                    oDl.getElementsByTagName("span")[0].innerHTML = '(' + countOfDl + ')';
                    break;
                }
            }
            //所有任务的计数
            var aDt = $("#all-tasklist-box").getElementsByTagName("dt");
            var countOfAll = 0;
            for (var i=0; i<aDt.length; i++) {
                countOfAll += parseInt(aDt[i].getElementsByTagName("span")[0].innerHTML.match(/\d+/));
            }
            var countOfAllAddDefault = countOfAll + parseInt(JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[0].length);
            $("#all-task").getElementsByTagName("span")[0].innerHTML = '(' + countOfAllAddDefault + ')';

            //默认分类计数
            $("#classify-default").getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML = '(' + parseInt(JSON.parse(localStorage.getItem("MYAPP.DataUnFinished"))[0].length) + ')';


                /*//点击确认增加时把当前task-time-all列表，存到内存
                var MYAPPTimeBoxList = JSON.parse(localStorage.getItem("MYAPP.timeBoxList"));
                if (MYAPPTimeBoxList) {
                    MYAPPTimeBoxList[MYAPP.index] = $("#task-timelist-list").innerHTML;
                    localStorage.setItem("MYAPP.timeBoxList", JSON.stringify(MYAPPTimeBoxList));
                } else {
                    MYAPP.timeBoxList[MYAPP.index] = $("#task-timelist-list").innerHTML;
                    localStorage.setItem("MYAPP.timeBoxList", JSON.stringify(MYAPP.timeBoxList));
                }
                //将目前的time-task-finished列表存到内存
                var MYAPPTimeBoxListFinished = JSON.parse(localStorage.getItem("MYAPP.timeBoxListFinished"));
                if (MYAPPTimeBoxListFinished) {
                    MYAPPTimeBoxListFinished[MYAPP.index] = $("#task-timelist-list-finished").innerHTML;
                    localStorage.setItem("MYAPP.timeBoxListFinished", JSON.stringify(MYAPPTimeBoxListFinished));
                } else {
                    MYAPP.timeBoxListFinished[MYAPP.index] = $("#task-timelist-list-finished").innerHTML;
                    localStorage.setItem("MYAPP.timeBoxListFinished", JSON.stringify(MYAPP.timeBoxListFinished));
                }
                //将目前的time-task-unfinished-列表存到内存
                var MYAPPTimeBoxListUnFinished = JSON.parse(localStorage.getItem("MYAPP.timeBoxListUnFinished"));
                if (MYAPPTimeBoxListUnFinished) {
                    MYAPPTimeBoxListUnFinished[MYAPP.index] = $("#task-timelist-list-unfinished").innerHTML;
                    localStorage.setItem("MYAPP.timeBoxListUnFinished", JSON.stringify(MYAPPTimeBoxListUnFinished));
                } else {
                    MYAPP.timeBoxListUnFinished[MYAPP.index] = $("#task-timelist-list-unfinished").innerHTML;
                    localStorage.setItem("MYAPP.timeBoxListUnFinished", JSON.stringify(MYAPP.timeBoxListUnFinished));
                }*/
                MYAPP.todoFunctions.saveInterface();

                //将编辑和完成两个按钮隐藏
                $(".icon-tick").style.display = "none";
                $(".icon-write").style.display = "none";

                MYAPP.todoFunctions.classifySet();
            }
        }
    }
}
MYAPP.timelist.todoFunctions.clickTimeTaskNav = function () {
    $.delegate("#task-timelist-header", "li", "click", changeNav);
    function changeNav(ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        var aLi = $("#task-timelist-header").getElementsByTagName("li");
        var aDiv = $("#timetask-box").getElementsByTagName("div");
        for (var i=0; i<aLi.length; i++ ) {
            removeClass(aLi[i], "list-header-active")
        }
        addClass(target, "list-header-active");
        for (var j=0; j<aDiv.length; j++ ) {
            removeClass(aDiv[j], "timebox-active");
        }
        addClass(aDiv[target.id], "timebox-active");
    }
}


//点击classify栏里的切换，背景改变
MYAPP.classify.todoFunctions.clickAll();
//生成一个新分类
MYAPP.classify.todoFunctions.newClassify();
//在类别上hover显示close
MYAPP.classify.todoFunctions.hoverDelete();
//取消修改编辑
MYAPP.timelist.todoFunctions.cancelReEdit();
//取消新增任务
MYAPP.timelist.todoFunctions.cancelNewTask();
//确认新增任务
MYAPP.timelist.todoFunctions.confirmNewTask();
//点击新增任务
MYAPP.timelist.todoFunctions.newTask();//点击文件夹后才可以新建任务
//点击time-task列表
MYAPP.timelist.todoFunctions.clickTimeList();
//点击重新编辑
MYAPP.timelist.todoFunctions.reEdit();
//确认重新编辑
MYAPP.timelist.todoFunctions.confirmReEdit();
MYAPP.timelist.todoFunctions.finish();
MYAPP.timelist.todoFunctions.clickTimeTaskNav();

//重启出现页面
MYAPP.todoFunctions.indexShow();
