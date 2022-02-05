//耗时5分钟
APP_name = "完美看看";

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
    sleep(15000);
    back();
    className("android.view.View").desc("任务\n第 3 个标签，共 4 个").findOne().click();
    className("android.view.View").desc("签到").findOne().click();
    className("android.widget.ImageView").clickable(true).depth(10).findOne().click();
    sleep(1000);
    Tap(850, 1200);
    sleep(1000);
    className("android.view.View").desc("1\n庆余年").findOne().click();
    sleep(1000);
    back();
    className("android.view.View").desc("3\n斗罗大陆").findOne().click();
    sleep(1000);
    back();
    sleep(1000);
    className("android.view.View").desc("任务\n第 3 个标签，共 4 个").findOne().click();
    sleep(1000);
    Tap(850, 1400);
    sleep(69000);
    id("tt_video_ad_close_layout").find().click();
    back();


}

start1 = start()
handle()
stop(start1)










