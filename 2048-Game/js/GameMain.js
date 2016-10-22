/**
 * Created by LCH on 2015/10/22.
 */
//存储位置
var locations;
//方块数
var keys = [ "0", "1", "2", "3", "4",
    "5", "6", "7", "8", "9",
    "10", "11", "12", "13", "14",
    "15", "16", "17", "18", "19",
    "20", "21", "22", "23", "24" ];
// 不同的数字对于不同的颜色,
// colors是颜色的数组
var colors = [ "#FFF", "PINK", "GRAY", "#ABCDEF", "#0FF0FF", "#FF0", "#CDF0AB",
    "#FEDCBA", "#F0F", "#BBBBBB", "#00F", "#00FF00" ];

/**
 * 初始化操作
 */
function init() {
    //初始化位置
    locations = [ 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0];
    //随机生成两个数字，并放在随机生成的位置上
    locations[createLocation()] = createNumber();
    locations[createLocation()] = createNumber();
    //显示
    paint();
    $('#btn1').removeAttr('disabled');
    $('#btn2').removeAttr('disabled');
    $('#btn3').removeAttr('disabled');
    $('#btn4').removeAttr('disabled');
    /*
     //按键控制
     $(document).keydown(function (e) {
     var keycode;
     if (!e) {
     e = window.event;
     }
     if (document.all) {
     keycode = e.keyCode;
     } else {
     keycode = e.which;
     }
     switch (keycode) {
     //上键 或 W键
     case 38 :
     case 87 :
     toUp();
     isEnd();
     break;
     //下键 或 S键
     case 40 :
     case 83 :
     toDown();
     isEnd();
     break;
     //左键 或 A键
     case 37 :
     case 65 :
     toLeft();
     isEnd();
     break;
     //右键 或 D键
     case 39 :
     case 68 :
     toRight();
     isEnd();
     break;
     }
     });
     */
}

function operated(m) {
    switch (m) {
        //上键 或 W键
        case 38 :
            toUp();
            isEnd();
            break;
        //下键 或 S键
        case 40 :
            toDown();
            isEnd();
            break;
        //左键 或 A键
        case 37 :
            toLeft();
            isEnd();
            break;
        //右键 或 D键
        case 39 :
            toRight();
            isEnd();
            break;
    }
}

/**
 * 生成数字显示位置
 * @returns {number} 生成0~25的随机数
 */
function createLocation() {
    //生成显示的位置，向下取整
    var num = Math.floor(Math.random() * 25);
    //判断该位置上是否有数字，如果有重新生成
    while (locations[num] != 0) {
        num = Math.floor(Math.random() * 25);
    }
    return num;
}

/**
 * 随机生成数字
 * @returns {number} 随机生成的2或4
 */
function createNumber() {
    //随机生成数字（2和4），出现4的概率为80%
    return Math.random() < 0.8 ? 2 : 4;
}

/**
 * 显示数字
 */
function paint() {
    //循环遍历，显示数字
    for (var i = 0; i < 25; i++) {
        //显示数字
        var box = "#box" + keys[i];
        $(box).text((locations[i] == 0) ? "" : locations[i]);
        //显示颜色，依据是获取当前位置显示数字的二进制数的长度-1，即为这个数的2的次方数
        var index = locations[i] == 0 ? 0 : locations[i].toString(2).length - 1;
        $(box).css({background: colors[index]});
    }
}

/**
 * 判断数组中的每个下标对应的值是否为0
 * @param r 获取一行或一列的显示数字的数组
 * @returns {boolean} true or false
 */
function isZero(r) {
    return r[0] == 0 && r[1] == 0 && r[2] == 0 && r[3] == 0 && r[4] == 0;
}

/**
 * 重置数组
 * @param r 获取一行或一列的显示数字的数组
 * @returns r 合并后的数组
 */
function makeArray(r) {
    //判断数组中是否全部为0
    if (!isZero(r)) {
        //遍历数组中的每一个数值，将0移至数组尾端
        for (var m = 0; m < 5; m++) {
            for (var n = 0; n < 4; n++) {
                if (r[n] == 0) {
                    r[n] = r[n + 1];
                    r[n + 1] = 0;
                }
            }
        }
    }
    //将相邻两个数字比较，相同则相加，后面的部分向前移，末尾置0
    for (var f = 0; f < 4; f++) {
        if (r[f] == r[f + 1]) {
            r[f] += r[f + 1];
            var k = f;
            while (++k < 4) {
                r[k] = r[k + 1];
            }
            r[4] = 0;
        }
    }
    return r;
}

/**
 * 向上，并随机生成一个数字
 */
function toUp() {
    for (var i = 0; i < 5; i++) {
        //获取每一列的数据
        var row = [locations[i], locations[i + 5], locations[i + 10], locations[i + 15], locations[i + 20]];
        //向上合并
        marginUp(i, row);
    }
    //随机生成一个位置和数字
    locations[createLocation()] = createNumber();
    paint();
}

/**
 * 向下，并随机生成一个数字
 */
function toDown() {
    for (var i = 0; i < 5; i++) {
        //获取每一列的数据
        var row = [locations[i + 20], locations[i + 15], locations[i + 10], locations[i + 5], locations[i]];
        //向下合并
        marginDown(i, row);
    }
    //随机生成一个位置和数字
    locations[createLocation()] = createNumber();
    paint();
}

/**
 * 向左，并随机生成一个数字
 */
function toLeft() {
    for (var i = 0; i < 5; i++) {
        var row = [locations[5 * i], locations[5 * i + 1], locations[5 * i + 2], locations[5 * i + 3], locations[5 * i + 4]];
        marginLeft(i, row);
    }
    //随机生成一个位置和数字
    locations[createLocation()] = createNumber();
    paint();
}

/**
 * 向右，并随机生成一个数字
 */
function toRight() {
    for (var i = 0; i < 5; i++) {
        var row = [locations[5 * i + 4], locations[5 * i + 3], locations[5 * i + 2], locations[5 * i + 1], locations[5 * i]];
        marginRight(i, row);
    }
    //随机生成一个位置和数字
    locations[createLocation()] = createNumber();
    paint();
}

/*
 向上合并
 i : 表示第几列
 r : 表示该列的数值数组
 */
function marginUp(i, r) {
    //重置数组
    makeArray(r);
    //将合并后的值重置
    for (var j = 0; j < 5; j++) {
        locations[5 * j + i] = r[j];
    }
}

/*
 向下合并
 i : 表示第几列
 r : 表示该列的数值数组
 */
function marginDown(i, r) {
    //重置数组
    makeArray(r);
    //将合并后的值重置
    for (var j = 0; j < 5; j++) {
        locations[5 * (4 - j) + i] = r[j];
    }
}

/*
 向左合并
 i : 表示第几行
 r : 表示该列的数值数组
 */
function marginLeft(i, r) {
    //重置数组
    makeArray(r);
    //将合并后的值重置
    for (var j = 0; j < 5; j++) {
        locations[5 * i + j] = r[j];
    }
}

/*
 向右合并
 i : 表示第几行
 r : 表示该列的数值数组
 */
function marginRight(i, r) {
    //重置数组
    makeArray(r);
    //将合并后的值重置
    for (var j = 0; j < 5; j++) {
        locations[4 + 5 * i - j] = r[j];
    }
}

/**
 * 是否结束
 */
function isEnd() {
    if (isEndX() && isEndY()) {
        alert("游戏结束！")
    }
}

/**
 * 行是否结束
 */
function isEndX() {
    //标记
    var f = false;
    var w = new Array(5);
    // 判断横向的数组
    // 如果相邻位置的数不相同,就结束
    for (var m = 0; m < 5; m++) {
        for (var n = 0; n < 5; n++) {
            w[n] = locations[5 * m + n];
        }
        f = (w[0] != w[1] && w[1] != w[2] && w[2] != w[3] && w[3] != w[4]); // 如果为真,表示相邻的两个数不相等
        if (!f) {
            break;
        }
    }
    return f;
}

/**
 * 列是否结束
 */
function isEndY() {
    //标记
    var f = false;
    var w = new Array(5);
    // 判断横向的数组
    // 如果相邻位置的数不相同,就结束
    for (var m = 0; m < 5; m++) {
        for (var n = 0; n < 5; n++) {
            w[n] = locations[5 * n + m];
        }
        f = (w[0] != w[1] && w[1] != w[2] && w[2] != w[3] && w[3] != w[4]); // 如果为真,表示相邻的两个数不相等
        if (!f) {
            break;
        }
    }
    return f;
}
