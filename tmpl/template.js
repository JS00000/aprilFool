/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = this.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('page0',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,username=$data.username,descirbe=$data.descirbe,$out='';$out+='<div class="container"> <div class="header"> <span class="icon"></span> 秘密宝箱 </div> <div class="body"> <div class="row"> <h1>';
$out+=$escape(username);
$out+='分享了一个秘密</h1> </div> <div class="row"> <input type="text" placeholder="点此输入密码，查看';
$out+=$escape(username);
$out+='分享的秘密"> </div> <div class="row"> <p class="intro">密码提示：';
$out+=$escape(username);
$out+=$escape(descirbe);
$out+='</p> </div> <div class="row margin-top"> <button onclick="$func.at()">点击查看</button> </div> </div> </div>';
return new String($out);
});/*v:1*/
template('page1','');/*v:1*/
template('page_1',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,currentSecret=$data.currentSecret,$out='';$out+='<div class="viewport v1"> <p>';
$out+=$escape(name);
$out+='分享了一个秘密</p> <img class="bg" src="img/bg_1.png"> <input id="input-1" type="text"> <a class="abs button" onclick="javascript:$func.hint_onclick()" href="#"></a> <a id="confirm-1" class="abs confirm" onclick="javascript:$func.confirm1_onclick();" href="#"></a> <a class="abs logo" href="http://baike.baidu.com/link?url=brlzLwvc93bGBkl3HTxXHFWphbVkFYLq2fE_bj4bkS9xsiM9Lz20yV6cysVAncfjyVLOrFiVZvxefhlWXF03kq"></a> </div> <div class="mask" onclick="javascript:$func.mask_onclick()"> </div> <img class="wrong" src="img/wrong.png"> <div class="hint" onclick="javascript:$func.hintdiv_onclick()"> <img style="position: relative;" src="img/hint.png"> <p> ';
$out+=$escape(name);
$out+=$escape(currentSecret);
$out+=' </p> </div>';
return new String($out);
});/*v:1*/
template('page_2',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,count=$data.count,name=$data.name,currentSecret=$data.currentSecret,$out='';$out+='<div class="viewport v2"> <p class="one">你是第<span> ';
$out+=$escape(count+1);
$out+=' </span>个认为</p> <p class="two"> <span>';
$out+=$escape(name);
$out+=$escape(currentSecret);
$out+='</span>的人</p> <img class="bg" src="img/bg_2.png"> <a class="abs button" onclick="javascript:$func.play_onclick()" ></a> <a class="abs logo" href="http://baike.baidu.com/link?url=brlzLwvc93bGBkl3HTxXHFWphbVkFYLq2fE_bj4bkS9xsiM9Lz20yV6cysVAncfjyVLOrFiVZvxefhlWXF03kq"></a> </div>';
return new String($out);
});/*v:1*/
template('page_3',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,s1=$data.s1,s2=$data.s2,s3=$data.s3,s4=$data.s4,s5=$data.s5,s6=$data.s6,$out='';$out+='<div class="viewport v3"> <img class="bg" src="img/bg_3.png"> <input class="play" type="text" id="name"> <form name="form1"> <div> <label for="t1"> <input name="test" id="t1" type="radio" value="1"> <img src="img/click.png"> <span> ';
$out+=$escape(s1);
$out+=' </span> </label> <label for="t2"> <input name="test" id="t2" type="radio" value="2"> <img src="img/click.png"> <span> ';
$out+=$escape(s2);
$out+=' </span> </label> <label for="t3"> <input name="test" id="t3" type="radio" value="3"> <img src="img/click.png"> <span>';
$out+=$escape(s3);
$out+='</span> </label> </div> <div> <label for="t4"> <input name="test" id="t4" type="radio" value="4"> <img src="img/click.png"> <span>';
$out+=$escape(s4);
$out+='</span> </label> <label for="t5"> <input name="test" id="t5" type="radio" value="5"> <img src="img/click.png"> <span>';
$out+=$escape(s5);
$out+='</span> </label> <label for="t6"> <input name="test" id="t6" type="radio" value="6"> <img src="img/click.png"> <span>';
$out+=$escape(s6);
$out+='</span> </label> </div> </form> <a class="abs confirm" href="#" onclick="$func.confirm_onclick()"></a> <a class="abs logo" href="http://baike.baidu.com/link?url=brlzLwvc93bGBkl3HTxXHFWphbVkFYLq2fE_bj4bkS9xsiM9Lz20yV6cysVAncfjyVLOrFiVZvxefhlWXF03kq"></a> <img class="point" src="img/point.png"> </div>';
return new String($out);
});/*v:1*/
template('page_4','<div class="viewport v4"> <p id="content"></p> <img class="bg" src="img/bg_4.png"> <a id="confirm-1" class="abs confirm" onclick="javascript:$func.play_onclick()"></a> <a class="abs logo" href="http://baike.baidu.com/link?url=brlzLwvc93bGBkl3HTxXHFWphbVkFYLq2fE_bj4bkS9xsiM9Lz20yV6cysVAncfjyVLOrFiVZvxefhlWXF03kq"></a> </div> <a onclick="javascript:$func.play_display()" id="mask_back"> <div></div> </a> <div class="info"> <img src="img/point.png" id="point"> </div> ');/*v:1*/
template('page_5',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,count=$data.count,$out='';$out+='<div class="viewport v2"> <p class="one">有<span> ';
$out+=$escape(count);
$out+=' </span>个人认为你</p> <p class="two"> <span id="content"> </span></p> <img class="bg" src="img/bg_5.png"> <div class="abs button" id="toshare" onclick="$func.play_onclick();" ></div> <a class="abs logo" href="http://baike.baidu.com/link?url=brlzLwvc93bGBkl3HTxXHFWphbVkFYLq2fE_bj4bkS9xsiM9Lz20yV6cysVAncfjyVLOrFiVZvxefhlWXF03kq"></a> </div>';
return new String($out);
});

}()