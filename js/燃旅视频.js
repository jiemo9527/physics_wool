//耗时7分钟
APP_name = "燃旅视频"

function start() {
    launch(getPackageName(APP_name));
    var sh = new Shell(true);
    return sh;
}

function stop(sh) {
    sh.exec("am force-stop " + getPackageName(APP_name));
    sleep(1000);
    sh.exit;
    toastLog("【" + APP_name + "】已完成计划任务并退出APP！");
}

function handle() {
    sleep(6000);
    back();
    id("main_home").findOne().click();
    sleep(2000);
    for (var i = 1; i <= 40; i++) {
        sleep(10000);
        swipe(800, 1500, 800, 300, 500);
    }
}

start1 = start()
handle()
stop(start1)