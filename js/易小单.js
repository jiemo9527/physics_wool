//耗时1分: 版本1.4.0无广告
APP_name = "易小单";
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

function cccc() {
    className("android.widget.Image").text("ptOXkKzb98r9AgH75pY5N0u2QAAAABJRU5ErkJggg==").find().click();
    sleep(500);
    className("android.widget.TextView").text("+6666").find().click();
    sleep(500);
    className("android.widget.TextView").text("+12888").find().click();
    sleep(500);
    className("android.widget.TextView").text("置顶券").find().click();
    sleep(500);
    className("android.widget.TextView").text("+28888").find().click();
    sleep(500);
    className("android.widget.TextView").text("超级宝箱").find().click();
}

function handle() {
    className("android.widget.TextView").clickable(true).depth(14).findOne().click();
    sleep(1500);
    for (i = 0; i < 2; i++) {
        cccc();
        sleep(2000);
    }
    sleep(3000);
}

start1 = start()
handle()
stop()





