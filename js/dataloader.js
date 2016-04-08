// var domain = 'http://192.168.0.105/aprilFool/src/API/';
var domain = 'http://www.stuzone.com/aprilfool/src/back-end/API/';
Dataloader.new('getSecrets',domain+'secrets_config.json','GET');
// Dataloader.new('getSecrets',domain+'secrets_config.php','GET');
Dataloader.new('page_1',domain+'api.php?','GET');
Dataloader.new('already',domain+'api.php?','GET');

var js_sdk_domain = "http://www.stuzone.com/aprilfool/";
Dataloader.new('js_sdk',js_sdk_domain+'get_sign_package.php?','GET');
