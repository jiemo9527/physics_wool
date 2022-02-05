//耗时5分钟
//APP下载地址：http://gameforum.adspools.cn/appweb/index.html?appId=511&uid=7811365
APP_name = "易小单";

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
    className("android.widget.TextView").text("查看全部").findOne().click();
    sleep(3000);
    text("领0.3元").find().click();
    for (i = 0; i < 3; i++) {
        sleep(59 * 1000);
        // back();
        // sleep(500);
        // id("ksad_end_close_btn").find().click();
        // sleep(500);
        // id("tt_video_ad_close_layout").find().click();
        Tap(950, 120);
        sleep(1000);
        text("领0.3元").find().click();
        sleep(1000);
        if (text("已领取").exists()) {
            break;
        }

    }
}

start1 = start()
handle()
stop(start1)





