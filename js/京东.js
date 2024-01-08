//耗时3-15分钟
APP_name = "京东";
Package_name = getPackageName(APP_name);


//黑阈临时启动
function start() {
    home();
    sleep(500);
    text("执行指令").findOne().click();
    id("command").setText("launch-instant " + Package_name);
    sleep(600);
    id("exec").findOne().click();
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

function BrushVideos(a, b) {
    for (var i = 0; i < random(a, b); i++) {
        // 生成随机坐标和滑动时间
        var startX = random(800 / 1440 * device.width, 1100 / 1440 * device.width);
        var startY = random(2210 / 3168 * device.height, 2399 / 3168 * device.height);
        var endX = random(900 / 1440 * device.width, 1020 / 1440 * device.width);
        var endY = random(200 / 3168 * device.height, 399 / 3168 * device.height);
        var duration = random(410, 720);

        swipe(startX, startY, endX, endY, duration);
        toastLog(APP_name + "计数器：" + (i + 1));
        // 生成2.6到8.7之间的随机数
        sleep(random(2600, 8700));
    }
}

function handle() {
    sleep(3700);
    clickNonClickable("逛", 3, 500);
    sleep(4300);
    BrushVideos(241, 394);
}

start1 = start()
handle()
stop()





