APP_name1 = "内存杀手";
Package_name1 = getPackageName(APP_name1); 

 
 
//黑阈临时启动 
function start(Package_name) { 
    home(); 
    sleep(500); 
    text("执行指令").findOne().click(); 
    id("command").setText("launch-instant " + Package_name); 
    sleep(600); 
    id("exec").findOne().click(); 
} 
 

 
function stop(Package_name) { 
    launch(getPackageName(APP_name)); 
    var sh = new Shell(true); 
    sh.exec("am force-stop " + Package_name); 
    sleep(1000); 
    sh.exit; 
    toastLog("【" + APP_name + "】已完成计划任务并退出APP！"); 
} 
 
function handle() {
    start(Package_name1);
    id("button").findOne().click(); 
    sleep(25*1000);
  stop(Package_name1);
} 

handle()