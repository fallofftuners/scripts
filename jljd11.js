
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
res_body = res.body;

ot=`Te=async()=>{try{const t=await G.mediaPlay({id:Number(B.currentRoute.value.query.id)});if(t.code===200)console.log(t.data),ue.value=t.data.collectInfo,o.value=t.data.mediaInfo,y.value=t.data.code,b.value=t.data.playable,$.value=t.data.watchCount,console.log(o.value.videoUrl);else return m(t.tip)}catch(t){return console.log(t)`;
mt=`Te=async()=>{try{const t=await G.mediaPlay({id:Number(B.currentRoute.value.query.id)});if(t.code===200)t.data.playable=true,t.data.watchCount=999,t.data.mediaInfo.isBuy=true,t.data.collectInfo=0,t.data.mediaInfo.videoUrl=t.data.mediaInfo.videoUrl.replace("http://","https://"),console.log(t.data),ue.value=t.data.collectInfo,o.value=t.data.mediaInfo,y.value=t.data.code,b.value=t.data.playable,$.value=t.data.watchCount,console.log(o.value.videoUrl);else return m(t.tip)}catch(t){console.log(t)}}`;

if (res_body.includes(ot)) {
  res_body = res_body.replace(ot,mt);
  console.log(res_body);
}





$done({body:res_body});
