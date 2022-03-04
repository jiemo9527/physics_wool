//耗时11分钟
//下载地址： https://m.xiaicn.cn/invite/89210
APP_name = "喜爱帮";
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
    text("我的").findOne().click();
    text("会员奖励").findOne().click();
    text("每日任务").findOne().click();
    sleep(2000);
    for (i = 0; i < 10; i++) {
        if (!text("立即观看").exists()) {
            text("领取奖励").find().click();
            break;
        }
        text("立即观看").findOne().click();
        id("tt_video_ad_close_layout").findOne().click();
        sleep(2500);
    }
    text("立即签到").findOne().click();
    className("android.view.View").desc("立即签到 需观看一段广告视频").findOne().click();
    id("tt_video_ad_close_layout").findOne().click();
    sleep(1000);
    text("领取奖励").find().click();


}

start1 = start()
handle()
stop()





