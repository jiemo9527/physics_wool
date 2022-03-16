//耗时10分钟:仅限幸运用户
APP_name = "快手";
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
    id("search_btn").waitFor();
    sleep(1000);
    //Tap(500, 500);
    back();
    for (i = 0; i < 100; i++) {
        sleep(5500);
        swipe(500, 1440, 500, 120, 400);
    }
}

start1 = start()
handle()
stop()





