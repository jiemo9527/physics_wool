//耗时约3小时
APP_name = "速读免费小说";
Package_name = getPackageName(APP_name);

//黑阈临时启动APP
function start() {
    home();
    sleep(500);
    clickNonClickable("执行指令", 5, 600);
    id("command").setText("launch-instant " + Package_name);
    sleep(800);
    clickNonClickable("#exec", 5, 600);
}

//常规启动
function start0() {
    launch(getPackageName(APP_name));
    var sh = new Shell(true);
    return sh;
}

function stop() {
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

//浮窗当前APP
function FloatingCurrentAPP() {
    sleep(500);
    // 打开多任务视图
    recents();
    desc("更多").findOne().click();
    sleep(150);
    click("浮窗");
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
    console.log("目标区域中心点坐标：" + centerX + ", " + centerY);
    sleep(100);
    // 使用click函数点击目标区域的中心点
    Tap(centerX, centerY);
}

function handle() {
    sleep(2500);
    if (desc("bookstore_button").exists()) {
        clickNonClickable("继续阅读", 2, 500);
        sleep(800);
        Tap(600, 1200);
        // clickNonClickableByBounds("(0,0,1440,3168)", 2, 500);
        clickNonClickable("听书", 2, 500);
        clickNonClickableN("边听边读", 1, 2, 500);
        sleep(1500);
        FloatingCurrentAPP();
    }
    sleep(3 * 3660 * 1000);

}

start1 = start0()
handle()
stop()