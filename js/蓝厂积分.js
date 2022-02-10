//耗时2分钟
APP_name = ["软件商店", "OPPO 商城", "我的一加", "主题商店"]

function start() {
    launch(getPackageName(APP_name[i]));
    var sh = new Shell(true);
    return sh;
}

function stop(sh) {
    sh.exec("am force-stop " + getPackageName(APP_name));
    sleep(1000);
    sh.exit;
    //toastLog("【" + APP_name + "】已完成计划任务并退出APP！");
}

function handle(name) {
    sleep(3000);
    if (name != APP_name[2]) {
        click("我的");
    }
    sleep(1000);
    click("签到");
    id("activity_credit_main_sign_btn").find().click();
    sleep(500);
    click("签到");
    sleep(1000);
}

for (i = 0; i < APP_name.length; i++) {
    start1 = start()
    handle(APP_name[i])
    stop(start1)
}
