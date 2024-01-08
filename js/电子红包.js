//耗时
APP_name = "电子红包";
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

//点击text/id;单个/首个目标
function clickNonClickable(selector, maxRetries, retryDelay) {
    for (var attempt = 1; attempt <= maxRetries; attempt++) {
        var target = null;

        if (selector.startsWith("#")) {
            // 如果选择器以"#"开头，表示使用id
            target = id(selector.substring(1)).findOne();
        } else {
            // 否则，默认使用text
            target = text(selector).findOne();
        }

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
    toast("达到最大重试次数，点击" + selector + "失败");
}

//点击置顶层text/id
function clickToplayer(selector) {
    // 通过元素识别方法获取目标按钮的坐标
    var targetElement = null;

    if (selector.startsWith("#")) {
        // 如果选择器以"#"开头，表示使用id
        targetElement = id(selector.substring(1)).findOne();
    } else {
        // 否则，默认使用text
        targetElement = text(selector).findOne();
    }

    if (!targetElement) {
        toast("未找到目标元素：" + selector);
        return false;
    }

    // 获取目标元素的坐标
    var targetX = targetElement.bounds().centerX();
    var targetY = targetElement.bounds().centerY();

    // 模拟点击目标元素
    gesture(500, [targetX, targetY], [targetX, targetY], [targetX, targetY]);
    return true;
}

//Tap/click/press:坐标bounds（适应分辨率）
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
    var left = parseInt(match[1]) * screenWidth / 1440; // 1080是假设的标准分辨率
    var top = parseInt(match[2]) * screenHeight / 3168; // 1920是假设的标准分辨率
    var right = parseInt(match[3]) * screenWidth / 1440;
    var bottom = parseInt(match[4]) * screenHeight / 3168;

    var centerX = (left + right) / 2;
    var centerY = (top + bottom) / 2;

    // 输出调试信息
    // console.log("目标区域中心点坐标：" + centerX + ", " + centerY);

    // 使用click函数点击目标区域的中心点
    Tap(centerX, centerY);
}

//点击第n个text/id;可超时
function clickNonClickableN(selector, n, maxRetries, retryDelay) {
    var foundCount = 0;

    for (var attempt = 1; attempt <= maxRetries; attempt++) {
        var targets = selector.startsWith("#") ? id(selector.substring(1)).find() : text(selector).find();
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
    toast("达到最大重试次数，未找到第 " + n + " 个匹配项：" + selector);
}


function handle() {
    clickNonClickableN("#activityAppGuideTransparentClose",1, 3, 3000);
    clickNonClickableN("#dialogHomeInputCodeCloseIv",1, 3, 3000);
    clickNonClickable("签到红包",3,500);
    sleep(6600);
    var count = text("+0.1红包").find().size();
    for(i=0;i<count;i++){
        clickNonClickableN("+0.1红包",1,2, 5000);
        sleep(36000);
        clickNonClickableN("关闭按钮",1,3,1000);
        clickNonClickableByBounds("(1260,240,1380,360)",3,1000);
        clickNonClickableByBounds("(1275,80,1363,168)",3,1000);  
        sleep(6500);
        if(id("toolbar_buttons").exists()){
            start()
            sleep(4500);
            clickNonClickableN("关闭按钮",1,3,5000);
        }
        sleep(5800);
    }
    clickNonClickable("赚红包",3,500);
    sleep(36000);
    clickNonClickableN("关闭按钮",1,3,300);
    clickNonClickableByBounds("(1279,97,1343,161)",3,300);
    clickNonClickableByBounds("(1259,172,1362,274)",3,300);
    sleep(6500);
    if(id("toolbar_buttons").exists()){
        start()
        sleep(4500);
        clickNonClickableN("关闭按钮",1,3,5000);
    }
    sleep(5000);
    clickNonClickable("赚红包",3,500);
    sleep(6500);
    clickNonClickable("#appPubliconlyTimeImageClose",1,500);


}

start()
handle()
stop()





