/**
 * @fileoverview Example of HTTP rewrite.
 *
 * @supported Quantumult X (v1.0.5-build173)
 */

// $request, $response, $notify(title, subtitle, message), console.log(message)
// $request.scheme, $request.method, $request.url, $request.path, $request.headers
// $response.statusCode, $response.headers, $response.body
//
// $prefs is for persistent store and the data of $prefs will be cleared when Quantumult X is deleted.
// $prefs.setValueForKey(value, key), $prefs.removeValueForKey(key), $prefs.removeAllValues(). Returns true or false, value and key should be string.
// $prefs.valueForKey(key) returns value.
//
// setTimeout(function() { console.log("abc"); }, 1000);
//
// You can optional change the response headers at the same time by using $done({body: modifiedBody, headers: modifiedHeaders}); only change the response headers is not allowed for script-response-body. The modifiedHeaders can be copied and modified from $response.headers, please do not change the content length, type and encoding field.
// Response status can also be optional changed by using $done({body: modifiedBody, headers: modifiedHeaders, status: modifiedStatus}), the modifiedStatus should be like "HTTP/1.1 200 OK"

var body = $response.body;
var obj = JSON.parse(body);



// import CryptoJS from 'crypto-js'
var global_n = [], global_i = []
var type_a = "undefined" !== typeof Uint8Array ? Uint8Array : Array;

function init() {
    for (var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, l = o.length; s < l; ++s)
        global_n[s] = o[s],
        global_i[o.charCodeAt(s)] = s;

}

function func_h(e) {
    return global_n[e >> 18 & 63] + global_n[e >> 12 & 63] + global_n[e >> 6 & 63] + global_n[63 & e]
}
function func_p(e, t, r) {
    for (var n, i = [], a = t; a < r; a += 3)
        n = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]),
        i.push(func_h(n));
    return i.join("")
}

function func_g(e) {
    // 将字节数组转换为Base64字符串。
    for (var t, r = e.length, i = r % 3, a = [], o = 16383, s = 0, l = r - i; s < l; s += o)
        a.push(func_p(e, s, s + o > l ? l : s + o));
    return 1 === i ? (t = e[r - 1],
    a.push(global_n[t >> 2] + global_n[t << 4 & 63] + "==")) : 2 === i && (t = (e[r - 2] << 8) + e[r - 1],
    a.push(global_n[t >> 10] + global_n[t >> 4 & 63] + global_n[t << 2 & 63] + "=")),
    a.join("")
}

function func_d(e, t, r) {
    return 3 * (t + r) / 4 - r
}


function func_f(e) {
    // 将字符串转换为type_a类型的字节数组。
    var t, r, n = func_c(e), o = n[0], s = n[1], l = new type_a(func_d(e, o, s)), u = 0, f = s > 0 ? o - 4 : o;
    for (r = 0; r < f; r += 4)
        t = global_i[e.charCodeAt(r)] << 18 | global_i[e.charCodeAt(r + 1)] << 12 | global_i[e.charCodeAt(r + 2)] << 6 | global_i[e.charCodeAt(r + 3)],
        l[u++] = t >> 16 & 255,
        l[u++] = t >> 8 & 255,
        l[u++] = 255 & t;
    return 2 === s && (t = global_i[e.charCodeAt(r)] << 2 | global_i[e.charCodeAt(r + 1)] >> 4,
    l[u++] = 255 & t),
    1 === s && (t = global_i[e.charCodeAt(r)] << 10 | global_i[e.charCodeAt(r + 1)] << 4 | global_i[e.charCodeAt(r + 2)] >> 2,
    l[u++] = t >> 8 & 255,
    l[u++] = 255 & t),
    l
}

function func_c(e) {
    var t = e.length;
    if (t % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
    var r = e.indexOf("=");
    -1 === r && (r = t);
    var n = r === t ? 0 : 4 - r % 4;
    return [r, n]
}

function func_L(e) {
    //将字符串转换为字节数组（URL编码形式）。

    const t = encodeURIComponent(e)
      , r = [];
    for (let n = 0; n < t.length; n++) {
        const e = t.charAt(n);
        if ("%" === e) {
            const e = t.charAt(n + 1) + t.charAt(n + 2)
              , i = parseInt(e, 16);
            r.push(i),
            n += 2
        } else
            r.push(e.charCodeAt(0))
    }
    return r
}

function func_O(e) {
    //将十六进制字符串转换为字节数组。

    let t = 0
        , r = e.length;
    if (r % 2 !== 0)
        return null;
    r /= 2;
    const n = [];
    for (let i = 0; i < r; i++) {
        const r = e.substr(t, 2)
            , i = parseInt(r, 16);
        n.push(i),
        t += 2
    }
    return n
}

function decrypt(e){

    const t = "vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN"
        , r = 12
        , o = Array.from(func_f(e))
        , s = o.splice(0, r)
        , l = func_L(t)
        , c = [...l, ...s]
        , u = parseInt(c.length / 2)
        , d = func_g(c)
        , f = CryptoJS.enc.Base64.parse(d)
        , h = func_O(CryptoJS.SHA256(f).toString())
        , p = h.splice(8, 16)
        , a = [...p, ...c.splice(0, u)]
        , v = func_g(a)
        , m = CryptoJS.enc.Base64.parse(v)
        , y = func_O(CryptoJS.SHA256(m).toString())
        , b = [...c, ...p]
        , x = func_g(b)
        , w = CryptoJS.enc.Base64.parse(x)
        , E = func_O(CryptoJS.SHA256(w).toString())
        , S = [...y.splice(0, 8), ...E.splice(8, 16), ...y.splice(16, 24)]
        , T = [...E.splice(0, 4), ...y.splice(4, 8), ...E.splice(8, 12)]
        , k = func_g(o)
        , C = CryptoJS.enc.Base64.parse(func_g(S))
        , _ = CryptoJS.enc.Base64.parse(func_g(T))
        , A = CryptoJS.AES.decrypt(k, C, {
        iv: _,
        mode: CryptoJS.mode.CBC
    });
    let a_str = A.toString(CryptoJS.enc.Utf8)
    let a_json = JSON.parse(a_str);
    // console.log(a_json);
    return a_json;

}


function encrypt(json) {
    let plaintext = JSON.stringify(json);
    const t = "vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN"
        , prexfix_length = 16
        , randomPrefix = "abcdejghijklmnop"
        , s = func_f(randomPrefix)
        , l = func_L(t)
        , c = [...l, ...s]
        , u = parseInt(c.length / 2)
        , d = func_g(c)
        , f = CryptoJS.enc.Base64.parse(d)
        , h = func_O(CryptoJS.SHA256(f).toString())
        , p = h.splice(8, 16)
        , a = [...p, ...c.splice(0, u)]
        , v = func_g(a)
        , m = CryptoJS.enc.Base64.parse(v)
        , y = func_O(CryptoJS.SHA256(m).toString())
        , b = [...c, ...p]
        , x = func_g(b)
        , w = CryptoJS.enc.Base64.parse(x)
        , E = func_O(CryptoJS.SHA256(w).toString())
        , S = [...y.splice(0, 8), ...E.splice(8, 16), ...y.splice(16, 24)]
        , T = [...E.splice(0, 4), ...y.splice(4, 8), ...E.splice(8, 12)]
        , C = CryptoJS.enc.Base64.parse(func_g(S))
        , _ = CryptoJS.enc.Base64.parse(func_g(T))
        , encrypted = CryptoJS.AES.encrypt(plaintext, C, {
        iv: _,
        mode: CryptoJS.mode.CBC
    });
    // let decrypted = CryptoJS.AES.decrypt(encrypted.toString(), C, {
    //     iv: _,
    //     mode: CryptoJS.mode.CBC
    // });
    const output = randomPrefix + encrypted.toString();
    // console.log("decrypted data: ", decrypted.toString(CryptoJS.enc.Utf8));
    return output;
}
init();

// let response_data = obj;
let data = decrypt(obj.data);

// console.log("original data: ", response_data.data);
//console.log("decrypt data: ", data);

data.totalDownloadTimes=99;
data.totalWatchTimes=99;
data.leftWatchTimes=99;
data.leftDownloadTimes=99;
data.vipType=4;
data.sVipType=4;
data.dVipType=4;
data.aVipType=4;
data.VipExpire=4070880000;
data.dVipExpire=4070880000;
data.sVipExpire=4070880000;
data.aVipExpire=4070880000;
data.VipExpireTime="2099-01-01T00:00:00Z";
data.sVipExpireTime="2099-01-01T00:00:00Z";
data.dVipExpireTime="2099-01-01T00:00:00Z";
data.aVipExpireTime="2099-01-01T00:00:00Z";
data.code=200;
data.watchCount=99;
data.playable=true;
data = encrypt(data)

// console.log("encrypt modified data: ", e_data);
// let de_e_data = decrypt(e_data);
// console.log("decrypt modified data: ", de_e_data);

// Convert the modified object back to JSON string

body = JSON.stringify(data);

// console.log(body);

$done(body);
