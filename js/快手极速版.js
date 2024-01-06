//耗时5-20分钟
APP_name = "快手极速版";
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
    launch(getPackageName(APP_name));
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

function handle() {
    clickNonClickable("首页", 3, 500);
    sleep(3900);
    for (var i = 0; i < random(240, 400); i++) {
        if (id("live_simple_play_swipe_text").exists()) {
            back();
            sleep(300);
            continue;
        }
        // 生成随机坐标和滑动时间
        var startX = random(600, 1100);
        var startY = random(2210, 2399);
        var endX = random(900, 1020);
        var endY = random(200, 399);
        var duration = random(420, 720);

        swipe(startX, startY, endX, endY, duration);
        toastLog(APP_name + "计数器：" + (i + 1));
        // 生成2.6到8.7之间的随机数
        var randomSleep = random(2600, 8700);

        sleep(randomSleep);
    }
}

start1 = start()
handle()
stop()





