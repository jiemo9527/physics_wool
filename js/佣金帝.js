//耗时忽略
APP_name = "佣金帝";
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

function handle() {
    clickNonClickable("签到赚钱", 3, 500);
    sleep(6500);
    if (text("立即签到 +30 ").exists()) {
        clickNonClickable("立即签到 +30 ", 3, 500);
    }
    sleep(2500);
}

start1 = start()
handle()
stop()