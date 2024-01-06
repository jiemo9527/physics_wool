//点亮屏幕&解锁&执行操作&息屏
APP_name = "钉钉";
Package_name = getPackageName(APP_name);

// 请求Root权限
function requestRoot() {
    var process = java.lang.Runtime.getRuntime().exec("su");
    var outputStream = new java.io.DataOutputStream(process.getOutputStream());
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
}

// 亮屏/输入设备密码/打开移动数据
function unlockScreen() {
    shell("input keyevent 26", true);
    sleep(2500);
    shell("input swipe 500 2000 600 300 950", true);
    sleep(600);
    shell("input text 替换密码", true);
    sleep(500); // 等待一段时间，确保焦点正确
    shell("input text 替换密码", true);
    sleep(800);
    // 关闭 WiFi
    shell("svc wifi disable", true);
    // 打开移动数据
    shell("svc data enable", true);

}


//黑阈临时启动
function start() {
    home();
    sleep(500);
    text("执行指令").findOne().click();
    id("command").setText("launch-instant " + Package_name);
    sleep(800);
    id("exec").findOne().click();
}

//常规启动
function start0() {
    launch(getPackageName(APP_name));
    var sh = new Shell(true);
    return sh;
}

function stop() {
    launch(getPackageName(APP_name));
    var sh = new Shell(true);
    sh.exec("am force-stop " + Package_name);
    sleep(1000);
    sh.exit;
    toastLog("【" + APP_name + "】已完成计划任务并退出APP！");
    sleep(1000);
    shell("input keyevent 26", true);
}


// 请求Root权限
requestRoot();
// 亮屏并输入设备密码
unlockScreen();
start1 = start();
sleep(9000);
stop()