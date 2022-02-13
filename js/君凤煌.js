//耗时10分钟
APP_name = "君凤煌";
Package_name = getPackageName(APP_name);
x = [200, 500, 900];
y = [1300, 1600, 1800];

//黑阈临时启动
function start() {
    home();
    sleep(500);
    text("执行指令").findOne().click();
    id("command").setText("launch-instant " + Package_name);
    sleep(500);
    id("exec").findOne().click();
}


function stop() {
    launch(getPackageName(APP_name));
    var sh = new Shell(true);
    sh.exec("am force-stop " + getPackageName(APP_name));
    sleep(1000);
    sh.exit;
    toastLog("【" + APP_name + "】已完成计划任务并退出APP！");
}

function handle() {
    id("nav_mine").findOne().click();
    id("tv_calenda").findOne().click();
    sleep(2000);
    swipe(500, 1500, 500, 300, 500);
    sleep(500);
    for (i = 0; i < x.length; i++) {
        for (j = 0; j < y.length; j++) {
            Tap(x[i], y[j]);
            if (i = 2 && j == 2) {
                break;
            }
            sleep(35 * 1000);
            className("android.widget.ImageView").clickable(true).find().click();
            sleep(1000);
            className("android.widget.ImageView").find().click();
            sleep(1000);
            className("android.widget.Image").text("ams_icon_background_close").findOne().parent().click();
            //back();
            sleep(1000);
            toastLog("君凤煌计数器：" + (i + 1));
        }
    }


}

start1 = start()
handle()
stop()





