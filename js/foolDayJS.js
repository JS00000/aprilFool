//控制器 =======================================
var Controller = {};
Controller.new = function(name,obj){
  this[name]=obj;
}
Controller.init=function(name){
  this[name].init();
}
//AJAX 模块 =======================================
//对象序列化为 GET 请求格式
var GETParam=function(obj) {
  var result=[];
  for (key in obj){
    result.push(key+'='+obj[key]);
  }
  return result.join('&');
}
var GETParse=function(str) {
  var str = str.slice(1).split('&');
  var obj = {};
  for(i in str){
    var temp = str[i].split('=');
    obj[temp[0]]=temp[1];
  }
  return obj;
}
//数据载入类 
var Dataloader = {};
//添加数据载入项
Dataloader.new = function(name,url,model){
  this[name]={
    url:url,
    model:model
  };
};
//载入数据
Dataloader.load = function(name,data,callback){
  data = (Object.prototype.toString.call(data)==='[object Object]')
  ?GETParam(data):data;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState==4 && xhr.status==200){
        if (Object.prototype.toString.call(callback)==='[object Function]') {
          callback(xhr.responseText);
        }
      }
  }
  if (this[name].model == 'GET') {
    xhr.open("GET",this[name].url+data,true);
    xhr.send();
  } else {
    xhr.open("POST",this[name].url,true);
    xhr.send(data);
  }
};

//场景切换器 =======================================
//场景对象
var Stage={};
//Stage
Stage.load = function(name,data){
  document.getElementById('wrap').innerHTML=template(name,data);
  Controller.init(name);
  $func=Controller[name];
};