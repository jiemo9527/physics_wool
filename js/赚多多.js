//耗时30分钟
//先解决监测作弊环境：root、无障碍、usb调试，再运行
APP_name = "赚多多";
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
    id("arg").className("android.widget.ImageView").clickable(true).findOne().click();
    sleep(4500);
    for (i = 0; i < 36; i++) {
        Tap(500, 1170);
        sleep(5000);
        if (text("游戏赚").exists()) {
            Tap(500, 1170);
        }
        id("ksad_end_close_btn").findOne().click();
        sleep(4000);
        id("tt_insert_dislike_icon_img").findOne().click();
    }

}

start1 = start()
handle()
stop()





