//入口：微信收藏链接→http://m.kuntuzc.bar/?upuid=3437661
//耗时5分钟（建议该脚本一天执行1-4次）
APP_name = "微信"
surl = "http://m.mimkwg.bar/?upuid=3437661"

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
    //进入微信收藏并点击
    text("我").waitFor();
    click("我");
    sleep(1000);
    Tap(500, 900);
    //点击收藏
    sleep(1000);
    Tap(500, 800);
    sleep(1000);
    Tap(500, 222);
    sleep(4000);
    Tap(500, 320);
    sleep(2000);
    Tap(500, 750);
    sleep(7000);
    //开始自动阅读
    for (i = 0; i < 26; i++) {
        sleep(3000);
        back();
        sleep(7000);
    }
}

start1 = start()
handle()
stop(start1)