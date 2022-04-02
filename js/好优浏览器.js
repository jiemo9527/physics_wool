//耗时35分钟
APP_name = "好优浏览器极速版";
Package_name = "com.haoyou.browser";


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
    id("zxing_img").waitFor();
    sleep(5000);
    id("img_close").find().click();
    sleep(1000);
    //刷金币=30分钟
    id("title_alipay").className("android.widget.TextView").text("视频").findOne().parent().click();
    for (i = 0; i < 230; i++) {
        swipe(500, 1440, 500, 120, 400);
        sleep(7000);
    }
    //阅读120s加签到=5分钟
    id("title_alipay").className("android.widget.TextView").text("首页").findOne().parent().click();
    sleep(500);
    Tap(500, 600);
    sleep(5000);
    for (i = 0; i < 14; i++) {
        swipe(500, 1440, 500, 120, 400);
        sleep(10 * 1000);
    }
    back();
    sleep(2000);
    id("img_sign").findOne().click();
    sleep(1000);
    id("iv_sign").findOne().click();
    sleep(66 * 1000);
    //关闭广告 并不需要

}

start1 = start()
handle()
stop()





