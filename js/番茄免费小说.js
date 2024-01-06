//后台无耗;v59332
APP_name = "番茄免费小说";
Package_name = getPackageName(APP_name);


//常规启动
 function start() {
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
    clickNonClickable("继续阅读", 3, 500);
    className("android.widget.FrameLayout").clickable(true).depth(10).findOne().click()
    id("d0b").findOne().click();
    sleep(500);
    home();
    sleep(3 * 3600 * 1000);

} 
 
start1 = start() 
handle() 
stop()