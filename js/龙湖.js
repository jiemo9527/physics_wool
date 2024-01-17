//耗时1分钟内
APP_name = "龙湖U享家"; 
Package_name = getPackageName(APP_name); 
 
 
//黑阈临时启动APP
function start() {
    home();
    sleep(500);
    text("执行指令").findOne().click();
    id("command").setText("launch-instant " + Package_name);
    sleep(600);
    id("exec").findOne().click();
}

//常规启动APP
function start0() {
    launch(getPackageName(APP_name));
    var sh = new Shell(true);
    return sh;
}
//退出APP
function stop() {
    launch(getPackageName(APP_name));
    var sh = new Shell(true);
    sh.exec("am force-stop " + Package_name);
    sleep(1000);
    sh.exit;
    toastLog("【" + APP_name + "】已完成计划任务并退出APP！");
}
//点击clickable=false的元素
function clickNonClickable(targetText, maxRetries, retryDelay) {
    for (var attempt = 1; attempt <= maxRetries; attempt++) {
        var target = text(targetText).findOne();

        if (target) {
            // 尝试直接使用click函数点击目标控件
            if (target.clickable()) {
                target.click();
                return;
            } else {
                // 如果clickable属性为false，尝试使用坐标点击
                var centerX = target.bounds().centerX();
                var centerY = target.bounds().centerY();

                click(centerX, centerY);
                return;
            }
        } else {
            sleep(retryDelay);
        }
    }
    toast("达到最大重试次数，点击" + targetText + "失败");
}

//点击置顶层元素
function clickToplayerByText(buttonText) {
    // 通过元素识别方法获取目标按钮的坐标
    var targetButton = text(buttonText).findOne();
    if (!targetButton) {
        toast("未找到目标按钮：" + buttonText);
        return false;
    }
    // 获取目标按钮的坐标
    var targetButtonX = targetButton.bounds().centerX();
    var targetButtonY = targetButton.bounds().centerY();
    // 模拟点击目标按钮
    gesture(500, [targetButtonX, targetButtonY], [targetButtonX, targetButtonY], [targetButtonX, targetButtonY]);
    return true;
}
//Tap坐标bounds（适应分辨率）
function clickNonClickableByBounds(boundsString, maxRetries, retryDelay) {
    // 解析传入的bounds字符串
    var regex = /\((\d+),(\d+),(\d+),(\d+)\)/;
    var match = boundsString.match(regex);

    if (!match) {
        console.error("传入的bounds格式不正确");
        return;
    }

    // 获取设备宽度和高度
    var screenWidth = device.width;
    var screenHeight = device.height;

    // 计算目标区域的中心点坐标
    var left = parseInt(match[1]) * screenWidth / 1080; // 1080是假设的标准分辨率
    var top = parseInt(match[2]) * screenHeight / 2400; // 1920是假设的标准分辨率
    var right = parseInt(match[3]) * screenWidth / 1080;
    var bottom = parseInt(match[4]) * screenHeight / 2400;

    var centerX = (left + right) / 2;
    var centerY = (top + bottom) / 2;

    // 输出调试信息
    // console.log("目标区域中心点坐标：" + centerX + ", " + centerY);

    // 使用click函数点击目标区域的中心点
    Tap(centerX, centerY);
}

//点击第n个&可超时
function clickNthNonClickableN(targetText, n, maxRetries, retryDelay) {
    var foundCount = 0;

    for (var attempt = 1; attempt <= maxRetries; attempt++) {
        var targets = text(targetText).find();
        if (targets.length > 0) {
            // 检查是否存在足够的匹配项
            if (foundCount + targets.length >= n) {
                // 找到第n个匹配项
                var targetIndex = n - foundCount - 1;
                var target = targets[targetIndex];

                // 尝试直接使用click函数点击目标控件
                if (target.clickable()) {
                    target.click();
                    foundCount++;
                    return;
                } else {
                    // 如果clickable属性为false，尝试使用坐标点击
                    var centerX = target.bounds().centerX();
                    var centerY = target.bounds().centerY();

                    click(centerX, centerY);
                    foundCount++;
                    return;
                }
            } else {
                // 增加已找到的计数
                foundCount += targets.length;
            }
        } else {
            sleep(retryDelay);
        }
    }
    toast("达到最大重试次数，未找到第 " + n + " 个匹配项：" + targetText);
}


function handle() {
    id("tiv_mine").findOne().click();
    sleep(500);
    clickNonClickable("明细", 3, 500);
    clickNonClickable("去使用", 3, 500);
    sleep(6600);
    clickNonClickableByBounds("(0,1433,1080,1613)", 3, 500);
    sleep(3800);
    clickNonClickable("返回", 3, 500);
    sleep(4500);
    clickNonClickableByBounds("(0,1610,1080,1769)", 3, 500);   //S2
    clickNonClickable("获取更多抽奖机会", 3, 500);
    sleep(1000);
    clickNthNonClickableN("签 到", 1,2, 500);//clickNonClickable("签 到", 3, 500);
    sleep(1000);
    clickNonClickable("返回", 3, 500);
    sleep(2900);
    clickNonClickableByBounds("(0,1610,1080,1769)", 3, 500); //S2
    sleep(3000);
    //马上抽奖
    click(500/1080*device.width,1795/2400*device.height);
    sleep(6500);

} 
 
start1 = start() 
handle() 
stop()