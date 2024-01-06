//Root方式的版本
function requestRoot() {
    // 使用Java的Runtime执行su命令
    var process = java.lang.Runtime.getRuntime().exec("su");
    var outputStream = new java.io.DataOutputStream(process.getOutputStream());

    // 执行需要Root权限的命令
    outputStream.writeBytes("pm disable-user " + Package_name + "\n");
    outputStream.writeBytes("pm enable " + Package_name + "\n");
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();



// 应用停用/启用切换，修改APP_name即可
var APP_name = "Google Play 服务";
var Package_name = getPackageName(APP_name);

// shell环境执行
function start() {
    var sh = new Shell(true);

    // 获取pid进程
    var cmd = "pidof " + Package_name;
    var flag = shell(cmd, true).result;

    // 停用/启用
    if (flag !== "") {
        sh.exec("pm disable-user " + Package_name);
        toastLog(APP_name + "已停用");
    } else {
        sh.exec("pm enable " + Package_name);
        toastLog(APP_name + "已启用");
    }

    sleep(1000);
    
    sh.exit;
}

start();
}

// 请求Root权限
requestRoot();