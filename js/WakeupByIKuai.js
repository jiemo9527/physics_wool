"ui";

importClass(java.io.BufferedReader);
importClass(java.io.BufferedWriter);
importClass(java.io.InputStreamReader);
importClass(java.io.OutputStreamWriter);
importClass(java.net.URL);
importClass(java.security.SecureRandom);
importClass(java.security.cert.X509Certificate);
importClass(javax.net.ssl.HostnameVerifier);
importClass(javax.net.ssl.HttpsURLConnection);
importClass(javax.net.ssl.SSLContext);
importClass(javax.net.ssl.SSLSession);
importClass(javax.net.ssl.X509TrustManager);

var LOGIN_URL = "https:///Action/login";
var CALL_URL = "https:///Action/call";

var unsafeSocketFactory = buildUnsafeSocketFactory();
var unsafeHostnameVerifier = new JavaAdapter(HostnameVerifier, {
    verify: function(hostname, session) {
        return true;
    }
});

ui.layout(
    <scroll>
        <vertical padding="16">
            <text text="接口唤醒工具" textSize="22sp" textStyle="bold" />
            <text
                marginTop="8"
                text="逻辑和原始 Python 一致：先登录拿 Cookie，等待 1.6 秒，再执行 wakeup。当前版本同样跳过 HTTPS 证书校验。"
                textSize="14sp" />

            <text text="username" marginTop="18" />
            <input id="username" singleLine="true" />

            <text text="passwd" marginTop="12" />
            <input id="passwd" singleLine="true" />

            <text text="pass" marginTop="12" />
            <input id="passToken" singleLine="true" />

            <text text="device id" marginTop="12" />
            <input id="deviceId" inputType="number" singleLine="true" />

            <text
                id="btnWakeup"
                marginTop="18"
                padding="12"
                bg="#2563EB"
                textColor="#FFFFFF"
                gravity="center"
                clickable="true"
                focusable="true"
                text="执行唤醒" />

            <text text="结果" marginTop="18" textStyle="bold" />
            <text id="result" text="等待执行" textIsSelectable="true" marginTop="8" />
        </vertical>
    </scroll>
);

ui.username.setText("1234");
ui.passwd.setText("1234");
ui.passToken.setText("1234");
ui.deviceId.setText("2");

ui.btnWakeup.on("click", function() {
    var username = ui.username.getText().toString().trim();
    var passwd = ui.passwd.getText().toString().trim();
    var passToken = ui.passToken.getText().toString().trim();
    var deviceIdText = ui.deviceId.getText().toString().trim();

    if (!username || !passwd || !passToken || !deviceIdText) {
        toast("请先把参数填完整");
        return;
    }

    var deviceId = parseInt(deviceIdText, 10);
    if (isNaN(deviceId)) {
        toast("设备 ID 必须是数字");
        return;
    }

    setLoading(true, "正在登录并发送唤醒请求...");

    threads.start(function() {
        var message;
        try {
            message = performWakeup(username, passwd, passToken, deviceId);
        } catch (e) {
            message = "执行异常\n" + e;
        }

        ui.run(function() {
            setLoading(false, message);
        });
    });
});

function setLoading(loading, message) {
    ui.btnWakeup.setEnabled(!loading);
    ui.btnWakeup.setText(loading ? "执行中..." : "执行唤醒");
    if (message !== undefined) {
        ui.result.setText(String(message));
    }
}

function performWakeup(username, passwd, passToken, deviceId) {
    var loginBody = JSON.stringify({
        username: username,
        passwd: passwd,
        pass: passToken,
        remember_password: ""
    });

    var loginResponse = postJson(LOGIN_URL, loginBody, null);
    if (loginResponse.code < 200 || loginResponse.code >= 300) {
        return "登录失败\nHTTP " + loginResponse.code + "\n" + loginResponse.body;
    }

    if (!loginResponse.cookie) {
        return "登录失败\n服务器没有返回 Cookie\n" + loginResponse.body;
    }

    sleep(1600);

    var wakeupBody = JSON.stringify({
        func_name: "wakeup",
        action: "wake_id",
        param: {
            id: deviceId
        }
    });

    var wakeupResponse = postJson(CALL_URL, wakeupBody, loginResponse.cookie);
    if (wakeupResponse.code >= 200 && wakeupResponse.code < 300) {
        return "唤醒请求已发送\nHTTP " + wakeupResponse.code + "\n" + wakeupResponse.body;
    }

    return "唤醒失败\nHTTP " + wakeupResponse.code + "\n" + wakeupResponse.body;
}

function postJson(url, jsonBody, cookieHeader) {
    var connection = openUnsafeConnection(url);
    var writer;
    var code;
    var body;
    var cookie;
    try {
        connection.setRequestMethod("POST");
        connection.setConnectTimeout(15000);
        connection.setReadTimeout(20000);
        connection.setDoInput(true);
        connection.setDoOutput(true);
        connection.setUseCaches(false);
        connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        connection.setRequestProperty("Accept", "application/json");
        if (cookieHeader) {
            connection.setRequestProperty("Cookie", cookieHeader);
        }

        writer = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream(), "UTF-8"));
        writer.write(jsonBody);
        writer.flush();
        writer.close();

        code = connection.getResponseCode();
        body = readResponseBody(connection, code);
        cookie = extractCookieHeader(connection);
        return {
            code: code,
            body: body,
            cookie: cookie
        };
    } finally {
        connection.disconnect();
    }
}

function openUnsafeConnection(url) {
    var connection = new URL(url).openConnection();
    if (!(connection instanceof HttpsURLConnection)) {
        throw new Error("只支持 HTTPS 请求");
    }
    connection.setSSLSocketFactory(unsafeSocketFactory);
    connection.setHostnameVerifier(unsafeHostnameVerifier);
    return connection;
}

function buildUnsafeSocketFactory() {
    var trustManager = new JavaAdapter(X509TrustManager, {
        checkClientTrusted: function(chain, authType) {},
        checkServerTrusted: function(chain, authType) {},
        getAcceptedIssuers: function() {
            return java.lang.reflect.Array.newInstance(X509Certificate, 0);
        }
    });

    var trustManagers = java.lang.reflect.Array.newInstance(javax.net.ssl.TrustManager, 1);
    java.lang.reflect.Array.set(trustManagers, 0, trustManager);

    var sslContext = SSLContext.getInstance("TLS");
    sslContext.init(null, trustManagers, new SecureRandom());
    return sslContext.getSocketFactory();
}

function extractCookieHeader(connection) {
    var headerFields = connection.getHeaderFields();
    var setCookieList;
    var cookieParts;
    var i;
    var rawCookie;
    var pair;

    if (!headerFields) {
        return "";
    }

    setCookieList = headerFields.get("Set-Cookie");
    if (!setCookieList) {
        setCookieList = headerFields.get("set-cookie");
    }
    if (!setCookieList) {
        return "";
    }

    cookieParts = [];
    for (i = 0; i < setCookieList.size(); i++) {
        rawCookie = String(setCookieList.get(i));
        pair = rawCookie.split(";")[0].trim();
        if (pair) {
            cookieParts.push(pair);
        }
    }
    return cookieParts.join("; ");
}

function readResponseBody(connection, code) {
    var stream = code >= 400 ? connection.getErrorStream() : connection.getInputStream();
    var reader;
    var lines;
    var line;

    if (stream == null) {
        return "";
    }

    reader = new BufferedReader(new InputStreamReader(stream, "UTF-8"));
    try {
        lines = [];
        line = reader.readLine();
        while (line != null) {
            lines.push(String(line));
            line = reader.readLine();
        }
        return lines.join("\n");
    } finally {
        reader.close();
    }
}
