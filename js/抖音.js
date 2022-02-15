//耗时
APP_name = "抖音";
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
    id("d0t").waitFor();
    sleep(2000);
    back();
    for (i = 0; i < 200; i++) {
        swipe(500, 1440, 500, 120, 500);
        sleep(2000);
        // if (!id("redFloat").exists()) {
        //     swipe(500, 1600, 500, 250, 500);
        // }
        sleep(3500);
        toastLog(APP_name + "计数器：" + (i + 1));
    }
}

start1 = start()
handle()
stop()





