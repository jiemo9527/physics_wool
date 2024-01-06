//后台无耗时 
APP_name = "番茄免费小说"; 
Package_name = getPackageName(APP_name); 
 
 
//常规启动 
 function start() { 
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
} 
 
function handle() {
    id("e82").findOne().click();
    sleep(3000); 
    home(); 
    sleep(3 * 3600 * 1000);
    sleep(300*1000); 
    sleep(4500); 
} 
 
start1 = start() 
handle() 
stop()