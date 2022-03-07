//黑号终于白回来了...耗时45分钟
APP_name = "点淘";
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
    id("tl_right_action_layout").waitFor();
    sleep(1000);
    swipe(800, 500, 100, 500, 400);
    sleep(3000);
    for (i = 0; i < 400; i++) {
        swipe(500, 1440, 500, 120, 400);
        sleep(6000);
        toastLog(APP_name + "计数器：" + (i + 1));
    }
}

start1 = start()
handle()
stop()





