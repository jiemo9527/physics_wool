//耗时1分钟:签收满月才能获得收益
APP_name = "行行生才";
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

function get_dsec_id() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var week = now.getDay();
    if (week == 0) {
        str = "星期日";
    } else if (week == 1) {
        str = "星期一";
    } else if (week == 2) {
        str = "星期二";
    } else if (week == 3) {
        str = "星期三";
    } else if (week == 4) {
        str = "星期四";
    } else if (week == 5) {
        str = "星期五";
    } else if (week == 6) {
        str = "星期六";
    }

    return all = date + ", " + year + "年" + month + "月" + date + "日" + str;
    toastLog(all);
}

function handle() {
    className("android.widget.ImageView").desc("热门搜索词").waitFor();
    sleep(500);
    Tap(200, 800);
    sleep(2000);
    className("android.view.View").desc(get_dsec_id()).findOne().click()
    sleep(3500);
}


start1 = start()
handle()
stop()





