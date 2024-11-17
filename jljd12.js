
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


ot=`{const t=await G.mediaPlay({id:Number(B.currentRoute.value.query.id)});if(t.code===200)console.log(t.data),ue.value=t.data.collectInfo,o.value=t.data.mediaInfo,y.value=t.data.code,b.value=t.data.playable,$.value=t.data.watchCount,console.log(o.value.videoUrl);else return m(t.tip)}`;
mt=`{const t=await G.mediaPlay({id:Number(B.currentRoute.value.query.id)});if(t.code===200)t.data.playable=true,t.data.watchCount=999,t.data.mediaInfo.isBuy=true,console.log(t.data),ue.value=t.data.collectInfo,o.value=t.data.mediaInfo,y.value=t.data.code,b.value=t.data.playable,$.value=t.data.watchCount,console.log(o.value.videoUrl);else return m(t.tip)}`;

if (res.body.includes(ot)) {
  console.log("111");
  res.body = res.body.replace(ot,mt);
  console.log("222");
}





$done(res);
