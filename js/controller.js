Controller.new('page0',function(){
  var obj = {};
  obj.at=function() {
    alert('test');
  };
  return obj; 
}());
Controller.new('page_1',function(){
  var obj = {};
  obj.init=function(){
    this.elements={
      tip      :document.getElementById('tip'),
      input1   :document.getElementById('input-1'),
      confirm1 :document.getElementById('confirm-1'),
      mask     :document.getElementsByClassName('mask')[0],
      wrong    :document.getElementsByClassName('wrong')[0],
      hint     :document.getElementsByClassName('button')[0],
      hintdiv  :document.getElementsByClassName('hint')[0]
    };
  };
  var te = /[@#\$%\^&\*]/; 
  obj.confirm1_onclick = function(){
    if(this.elements.input1.value.length>10){
      alert("最多只能输入10个字符哦");
      this.elements.input1.value = "";
    }
    else if(this.elements.input1.value == ""){
      alert("密码不能为空");
    }
    else if(te.test(this.elements.input1.value) == true){
      alert("里面含有非法字符");
    }
    else if(this.elements.input1.value != data1.name+data1.currentSecret){
     this.elements.wrong.style.display = "block";
     this.elements.mask.style.display = "block";
     this.elements.input1.value = "";
    }
    else if(this.elements.input1.value == data1.name+data1.currentSecret){
      location.search
      b = {
        openid:user.openid,
        state:GETParse(location.search).state
      };
      Dataloader.load('already',b,function(data){
        // console.log(data);
      });
      Stage.load("page_2",data1);
    }
    else{
      this.elements.confirm1.onclick = function(){
      }
    }
  }
  obj.wrong_onclick = function(){
    this.elements.mask.style.display = "none";
    this.elements.wrong.style.display = "none";
  }
  obj.hint_onclick = function(){
    this.elements.mask.style.display = "block";
    this.elements.hintdiv.style.display = "block";
  }
  obj.hintdiv_onclick = function(){
    this.elements.mask.style.display = "none";
    this.elements.hintdiv.style.display = "none";
  }
  obj.mask_onclick = function(){
    this.elements.hintdiv.style.display = "none";
    this.elements.mask.style.display = "none";
    this.elements.wrong.style.display = "none";
  }
  /*var name = "黑帝"*/
  // var p = document.getElementsByTagName('p')[0];
  // p.innerHTML = name;
  // tip.innerHTML=secret;
  /*var secret = "黑帝很帅";*/
  return obj;
}());


Controller.new('page_2',function(){
  var obj = {} ;
  obj.init=function(){
    this.elements={
      play     : document.getElementsByClassName('button')[0],
    }
    data2={ 
      s1:data1.secret1,
      s2:data1.secret2,
      s3:data1.secret3,
      s4:data1.secret4,
      s5:data1.secret5,
      s6:data1.secret6
    };
  };
  obj.play_onclick = function(){
    Stage.load("page_3", data2);
  };

  return obj;
}());


Controller.new('page_3',function(){
  var obj = {} ;
  obj.init=function(){
    this.elements={
      play     : document.getElementsByClassName('play')[0],
      confirm  : document.getElementsByClassName('confirm')[0],
      success  : document.getElementsByClassName('success')[0],
      mask     : document.getElementsByClassName('mask')[0],
      point    : document.getElementsByClassName('point')[0]
    }
    data={ 

    };
  };

  var te = /[@#\$%\^&\*]/;
  obj.confirm_onclick = function(){
    if (this.elements.play.value == "") {
      alert("密码不能为空");
    }
    else if(te.test(this.elements.play.value) == true){
      alert("里面含有非法字符");
      this.elements.play.value = "";
    }
    else if(this.elements.play.value.length>5){
      alert("最多只能输入5个字符哦");
      this.elements.play.value = "";
    }
    else{
      window.j; 
      for(i=0;i<document.form1.test.length;i++)
        if(document.form1.test[i].checked) window.j=document.form1.test[i].value;
      var name=document.getElementById("name").value;
      data3={
        openid:1,
        checked:window.j,
        name:name
      };
      Stage.load("page_4", data3);
    }   
  };
  return obj;
}());

Controller.new('page_4',function(){
  var obj = {} ;
  obj.init=function(){
    this.elements={
    }
      // console.log(user.openid);  
      document.getElementById('content').innerHTML = data3.name+window.secretVal[data3.checked];
      // document.getElementById('content').innerHTML = data3.name+window.secretVal[data3.checked];
  };

  obj.play_onclick = function(){
    document.getElementById("mask_back").style.display = "block";
    document.getElementById("point").style.display = "block";
    b = {
      openid:user.openid,
      name:data3.name,
      secret:data3.checked,
      state:GETParse(location.search).state
    };
    Dataloader.load('already',b,function(data){
      // console.log(data);
      callbackObj = JSON.parse(data);
      if (callbackObj.status!=200) {
        location=location;
      }
      else
      {
        wx.onMenuShareTimeline({
            title: data3.name+"告诉你一个小秘密", // 分享标题
            link: callbackObj.data.share_uri, // 分享链接
            imgUrl: 'http://www.stuzone.com/aprilfool/src/front-end/img/secret_share.png', // 分享图标
            success: function () { 
            },
            cancel: function () { 
            }
        });
        wx.onMenuShareAppMessage({
            title: data3.name+"告诉你一个小秘密", // 分享标题
            desc: '', // 分享描述
            link: callbackObj.data.share_uri, // 分享链接
            imgUrl: 'http://www.stuzone.com/aprilfool/src/front-end/img/secret_share.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
            },
            cancel: function () { 
            }
        });
      }
    });

  };
  obj.play_display = function(){
    document.getElementById("mask_back").style.display = "none";
    document.getElementById("point").style.display = "none";
  };
 
  return obj;
}());
 

Controller.new('page_5',function(){
  var obj = {} ;
  obj.init=function(){
    this.elements={
    }
      document.getElementById('content').innerHTML = window.secretVal[data1.secret];
  };

  obj.play_onclick = function(){
    data2 = {
      s1:window.secretVal[1],
      s2:window.secretVal[2],
      s3:window.secretVal[3],
      s4:window.secretVal[4],
      s5:window.secretVal[5],
      s6:window.secretVal[6]
    };
    Stage.load("page_3", data2); 
  };
  return obj;
}());

