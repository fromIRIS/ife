function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === "[object Function]";
}
function isStr(str) {
    return Object.prototype.toString.call(str) === "[object String]";
}
function isBool(bool) {
    return Object.prototype.toString.call(bool) === "[object Boolean]";
}
function isNum(num) {
    return Object.prototype.toString.call(num) === "[object Number]";
}
console.log(isArray([]));
console.log(isFunction(function () {
    alert('a');
}));
/*console.log(isStr([]));
console.log(isBool(true));
console.log(isNum(8));*/

//判断数据类型的方法↑

function cloneObject(obj) {
    if (typeof(obj) != 'object'){
        return obj;
    }
    var result = {};
    for (var attr in obj){
        result[attr] = cloneObject(obj[attr]);
    }
    return result;
}
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    },
    c: ""
};

var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);     //2
console.log(abObj.b.b1[0]);    //"hello"

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

//递归法深克隆↑

function uniqArray(arr) {
    for (i=0; i < arr.length; i++) {
        for (j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j,1);
                j--;   //因为splice是直接在原数组里删除，删除掉j，后一位会前移代替原j，而j++就会跳过这个元素。
            }
        }
    }
    return arr;
}
var a = [1, 3, 3, 3, 5, 3, 5];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

// 数组去重↑

function trim(str) {
    var toTrim = "";
    for (i=0; i < str.length; i++) {
        if (str.charAt(i) != " "　&& str.charAt(i) != "　") {
            toTrim += str.charAt(i);
        }
    }
    return toTrim;
}
var str = '(hi!  )';
console.log(trim(str));


// 字符串去两端空格↑

function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);
        }
    }　
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(item + index)
}
each(arr, output);  // java, c, php, html

//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递↑

function getObjectLength(obj) {
    var i = 0;
    for (var attr in obj) {
        i++;
    }
    return i;
}
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
// 获取一个对象里面第一层元素的数量，返回一个整数↑

function isEmail(emailStr) {
    var reg = /^[0-9a-z_-]+@[a-z0-9]+\.[a-z]{2,4}$/;
    return reg.test(emailStr);
}
console.log(isEmail('417611525@qq.com'));
// 判断是否为邮箱地址↑

function isMobilePhone(phone) {
    var reg = /^[1][0-9]{10}$/g;//第一位是1
    return reg.test(phone);
}
console.log(isMobilePhone('15757184650'));
// 判断是否为手机号↑

function addClass(element, newClassName) {
    if (element.className == "") {
        element.className = newClassName;
    }else {
        var oldClassName = element.className;
        element.className = oldClassName + " " + newClassName;
    }
}
//addClass↑

function removeClass(element, oldClassName) {
    if (element.className == "") {
        return false;
    }else {
        var allOldName = element.className;
        var newClassName = allOldName.replace(eval('/' + oldClassName + '/'), "").replace(/^\s+|\s+$/,"");
        element.className = newClassName;
    }
}
// 移除dom中的样式oldClassName↑

function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}
// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值↑


function getPosition(element) {
    var disX = element.offsetLeft;
    var disY = element.offsetTop;
    var obj = {};
    obj.x = disX;
    obj.y = disY;
    return obj;
}
// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}↑

function $(selector) {
    return document.querySelector(selector);
}
