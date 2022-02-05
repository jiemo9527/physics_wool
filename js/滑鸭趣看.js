//耗时30分钟
//APP必须是3.0.2版本，不要更新
APP_name = "滑鸭趣看"

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
    id("iv_close").findOne().click();
    sleep(2000);
    for (i = 0; i < 999; i++) {
        click("广告");
        sleep(6000);
        swipe(500, 1400, 500, 1000, 500);
        //等待广告
        if (text("请稍后").exists()) {
            sleep(121 * 1000);
            swipe(500, 250, 500, 1600, 500);
        }
        //完成跳出
        if (text("已完成").exists()
            && id("ll_wallet").exists()) {
            break;
        }
        //关闭广告页
        if (!id("ll_wallet").exists()) {

            sleep(1000);
            className("android.widget.ImageView").find().click();
            sleep(1000);
            id("tt_video_ad_close_layout").find().click();
            sleep(1000);
        }
        //关闭更新提示
        id("iv_close").find().click();

    }


}

start1 = start()
handle()
stop(start1)






