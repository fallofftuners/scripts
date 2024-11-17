// QuantumultX Script Example to Modify HTML Content
// This script modifies the HTML content of a webpage

// QuantumultX script header
/*
[rewrite_local]
^https?:\/\/aawsdwd\.iimwcb0j5\.cc\/ url script-response-body jljd_craking_plugin.js

[mitm]
hostname = iimwcb0j5.cc
*/

// The actual script to modify HTML content
let res = $response;


console.log(res.status);
console.log(res.body);
if (res.status ===200){
body = res.body;
res.body = res.body.replace(ot,mt);
}



$done(res);
