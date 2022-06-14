//耗时30分钟（滑鸭可以强制关闭对话框后继续使用，不推荐了）
APP_name = "福鲤趣看"
Package_name = getPackageName(APP_name);


//黑阈临时启动
function start() {
    home();
    sleep(500);
    text("执行指令").findOne().click();
    id("command").setText("launch-instant " + Package_name);
    sleep(500);
    id("exec").findOne().click();
}

//常规启动
// function start() {
//     launch(getPackageName(APP_name));
//     var sh = new Shell(true);
//     return sh;
// }

function stop() {
    launch(getPackageName(APP_name));
    var sh = new Shell(true);
    sh.exec("am force-stop " + getPackageName(APP_name));
    sleep(1000);
    sh.exit;
    toastLog("【" + APP_name + "】已完成计划任务并退出APP！");
}

function handle() {
    id("ll_wallet").findOne().click();
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
stop()






