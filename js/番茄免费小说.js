//耗时约3小时;v59332
APP_name = "番茄免费小说";
Package_name = getPackageName(APP_name);


//常规启动
 function start() {
     launch(getPackageName(APP_name));
    var sh = new Shell(true);
     return sh;
 }

function stop() {
    var sh = new Shell(true);
    sh.exec("am force-stop " + Package_name);
    sleep(1000);
    sh.exit;
    toastLog("【" + APP_name + "】已完成计划任务并退出APP！");
}

//点击text/id;单个/首个目标
function clickNonClickable(selector, maxRetries, retryDelay) {
    for (var attempt = 1; attempt <= maxRetries; attempt++) {
        var target = null;

        if (selector.startsWith("#")) {
            // 如果选择器以"#"开头，表示使用id
            target = id(selector.substring(1)).findOne();
        } else {
            // 否则，默认使用text
            target = text(selector).findOne();
        }

        if (target) {
            // 尝试直接使用click函数点击目标控件
            if (target.clickable()) {
                target.click();
                return;
            } else {
                // 如果clickable属性为false，尝试使用坐标点击
                var centerX = target.bounds().centerX();
                var centerY = target.bounds().centerY();

                click(centerX, centerY);
                return;
            }
        } else {
            sleep(retryDelay);
        }
    }
    toast("达到最大重试次数，点击" + selector + "失败");
}
//点击第n个text/id;可超时
function clickNonClickableN(selector, n, maxRetries, retryDelay) {
    var foundCount = 0;

    for (var attempt = 1; attempt <= maxRetries; attempt++) {
        var targets = selector.startsWith("#") ? id(selector.substring(1)).find() : text(selector).find();
        if (targets.length > 0) {
            // 检查是否存在足够的匹配项
            if (foundCount + targets.length >= n) {
                // 找到第n个匹配项
                var targetIndex = n - foundCount - 1;
                var target = targets[targetIndex];

                // 尝试直接使用click函数点击目标控件
                if (target.clickable()) {
                    target.click();
                    foundCount++;
                    return;
                } else {
                    // 如果clickable属性为false，尝试使用坐标点击
                    var centerX = target.bounds().centerX();
                    var centerY = target.bounds().centerY();

                    click(centerX, centerY);
                    foundCount++;
                    return;
                }
            } else {
                // 增加已找到的计数
                foundCount += targets.length;
            }
        } else {
            sleep(retryDelay);
        }
    }
    toast("达到最大重试次数，未找到第 " + n + " 个匹配项：" + selector);
}



function handle() {
    id("v4").waitFor();
    sleep(2900);
    if(text("继续听").exists()){
        clickNonClickable("继续听", 2, 500);
        // clickNonClickable("#a84", 2, 500);
        id("d0b").findOne().click();
        sleep(500);
        click(device.width/2,device.height/2);
        //home();
        sleep(3 * 3600 * 1000);
    }else{
        clickNonClickable("继续阅读", 3, 500);
        className("android.widget.FrameLayout").clickable(true).depth(10).findOne().click()
        id("d0b").findOne().click();
        sleep(500);
        click(device.width/2,device.height/2);
        //home();
        sleep(3 * 3600 * 1000);
    }


} 
 
start1 = start() 
handle() 
stop()