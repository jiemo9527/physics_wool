function send_get(url){ 
 url = url ? url:"http://speed.tom.jie02.link:88/add.php";
 var res = http.get(url,{ 
 headers: { 
 'Accept-Language': 'zh-cn,zh;q=0.5', 
 'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11' 
        } 
    }); 
 toastLog(url+"响应内容："+res.body.string()); 
}

send_get("http://speed.tom.jie02.link:88/add.php")
send_get("http://speed.cc.jie02.link:88/add.php")