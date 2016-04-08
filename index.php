<?php 
namespace Zixunminda\API;
use Zixunminda\Config\DatetimeConfig;
use Zixunminda\Config\WechatConfig;
use Zixunminda\Wechat\Core\JSSDK;
require_once '/var/www/zixunminda/src/autoload.php';
date_default_timezone_set(DatetimeConfig::$timeZone);
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$url = "{$protocol}{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
$wechatInstance = WechatConfig::$currInstance;
$appId          = WechatConfig::$instances[$wechatInstance]['appid'];
$appSecret      = WechatConfig::$instances[$wechatInstance]['appsecret'];
$jssdk          = new JSSDK($appId, $appSecret);
$arr            = $jssdk->getSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>告诉你一个秘密</title>
    <meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=1">
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="apple-touch-icon-precomposed" href="./img/thumbnail.png">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="tmpl/template.js"></script>
    <script src="js/foolDayJS.js"></script>
    <script src="js/stage.js"></script>
    <script src="js/controller.js"></script>
    <script src="js/dataloader.js"></script>
    <script> var _hmt = _hmt || []; (function() {  var hm = document.createElement("script");  hm.src = "//hm.baidu.com/hm.js?d86374d171158b5f0043cc7d7cbfec87";  var s = document.getElementsByTagName("script")[0];  s.parentNode.insertBefore(hm, s); })(); </script> 
<script type="text/javascript">
  wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: "<?=$arr['appId']?>", // 必填，公众号的唯一标识
      timestamp: <?=$arr['timestamp']?>, // 必填，生成签名的时间戳
      nonceStr: "<?=$arr['nonceStr']?>", // 必填，生成签名的随机串
      signature: "<?=$arr['signature']?>",// 必填，签名，见附录1
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "onMenuShareQZone"
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  wx.error(function(res){
    console.log(res);
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });
</script>
</head>
<body>
<div style='margin:0 auto;width:0px;height:0px;overflow:hidden;'>
    <!-- <img src="img/thumbnail.png" width="700"> -->
</div>
    <div id="wrap"></div>
    <!-- <a style="display:block;position:fixed;right:10px;top:10px;width:1rem;height:1rem;background-color:#6cf;background-size:100% 100%;border-radius:50%;text-align:center;color:white;font-size:0.25rem;line-height:1rem;text-decoration:none;" href="javascript:location.replace('http://192.168.43.136:8001/')">Reload</a> -->
</body>
<script>
window.onload = function() {
    Dataloader.load('getSecrets','',function(Secrets){
        a=GETParse(location.search);
        // a={code:"test", state:"a96b080102d35b136f1fc6e0d1d509faee721e21"};
        Dataloader.load('page_1',a,function(ajaxVal){
          Secrets=JSON.parse(Secrets).data;
          data1=JSON.parse(ajaxVal).data.secret;
          user=JSON.parse(ajaxVal).data.user;
          data1.currentSecret=Secrets[parseInt(data1.secret)].value;
          data1.secret0=Secrets[0].value;
          data1.secret1=Secrets[1].value;
          data1.secret2=Secrets[2].value;
          data1.secret3=Secrets[3].value;
          data1.secret4=Secrets[4].value;
          data1.secret5=Secrets[5].value;
          data1.secret6=Secrets[6].value;
          window.secretVal=[Secrets[0].value, Secrets[1].value, Secrets[2].value, Secrets[3].value, Secrets[4].value, Secrets[5].value, Secrets[6].value];
          if (user.is_author==true) {
            Stage.load("page_5",data1);
          } 
          else
          {
            Stage.load('page_1',data1);
          }
        })
    })
    // data1 = {
    //   name:"黑帝",
    //   currentSecret:2,
    // };
    // window.secretVal=["1", "2", "3", "4", "5", "6"];
    // Stage.load('page_1',data1);

}
</script>
</html> 
