//耗时3小时
APP_name = "快手极速版";

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
    id("thanos_home_top_search").waitFor();
    sleep(8000);
    Tap(200, 200);
    back;
    for (i = 0; i < 940; i++) {
        swipe(500, 1440, 500, 120, 500);
        sleep(2000);
        if (!id("redFloat").exists()) {
            swipe(500, 1600, 500, 250, 600);
        }
        sleep(8000);
        toastLog(APP_name + "计数器：" + (i + 1));
    }
}

start1 = start()
handle()
stop(start1)





