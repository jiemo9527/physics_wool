//耗时1分钟
APP_name = "趣拼吧";
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
    id("sgin_LinearLayout").findOne().click();
    id("sgin_TextView").findOne().click();
    //id("tt_video_ad_close_layout").findOne().click();
    sleep(48 * 1000);
    back();
    sleep(2000);

}

start1 = start()
handle()
stop()





