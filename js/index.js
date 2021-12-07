/*
 * @Author: mayuxin
 * @Date:   2017-12-01 11:01:40
 * @Last Modified by:   mayuxin
 * @LastModified time: 2018-12-11 10:35:14
 */
//https://rmrbapi.peopletech.cn/api/paper/paperlist.php?pjCode=rmrb_2_201803&paperName=rmrb&pagesSize=700x1000&date=20211015&sysCode=sysCode
//https://peopledally.peopletech.cn/detail/paper/20211015_25883593
//https://rmrbapi.peopletech.cn/api/paper/paperdetail.php?pjCode=rmrb_2_201803&paperName=rmrb&platform=h5&sysCode=paper&articleId=20211015_25883592&_t=1634620261
var testdata = {
    "title":"LieRen Web Site"
}

// var playState = 0; //0初始 1播放 2暂停

$(document).ready(function() {
    renderReady();
    renderHtml(testdata);
})

function renderHtml(json) {
    renderHeader(json);
    renderImage(json);
    renderContent(json);
    bindEvent();
    renderHtmlFinish(json);
}
/**
 * 渲染头部
 */
function renderHeader(json) {
    if (json.authors) {
        json.authors = json.authors.replace(/<br>/g, " ");
        json.authors = json.authors.replace(/<br\/>/g, " ");
    }
    var header = template("tmpHeader", json);
    $("#htmlHeader").html(header);
    if (!json.introTitle) {
        $('sho_title').hide();
    }
    if (!json.subTitle) {
        $('sub_title').hide();
    }
    if (json.authors) {
        $(".authors").show();
    }
}
/**
 * 渲染图片
 */
function renderImage(json) {
    if (json.imgall != " " && json.imgall.length > 0) {
        for (var i = 0; i < json.imgall.length; i++) {
            var img = template('tmpImg', json.imgall[i]);
            $("#htmlImage").append(img);
        }

    }

}
/**
 * 渲染正文
 */
function renderContent(json) {
    $("#htmlDetail").html(json.content + '<div class="allTip"><p>- 已显示全部内容 -</p></div>');
}
/**
 *渲染视频
 */
function renderMedia(json) {
    if (json.type == "video" && json.medias != " " && json.medias.length > 0) {
        var htmlMedia = $("#htmlMedia");
        htmlMedia.show();
        var w = htmlMedia.css("width");
        var h = parseFloat(w) * 9 / 16 + "px";
        htmlMedia.css("height", h);
        // var x=htmlMedia.offset().left*window.devicePixelRatio;
        // var y=htmlMedia.offset().top*window.devicePixelRatio;
        // var h=htmlMedia.height()*window.devicePixelRatio;
        // var w=htmlMedia.width()*window.devicePixelRatio;
        // log("x="+x+",y="+y+",w="+w+",h="+h+"scale="+window.devicePixelRatio);
        // var tmp='{"x":'+x+","+'"y":'+y+","+'"w":'+w+","+'"h":'+h+'}'
        var json = {};
        json.x = htmlMedia.offset().left * window.devicePixelRatio;
        json.y = htmlMedia.offset().top * window.devicePixelRatio;
        json.h = htmlMedia.height() * window.devicePixelRatio;
        json.w = htmlMedia.width() * window.devicePixelRatio;
        addMedia(JSON.stringify(json));
    }
}
/**
 *事件绑定
 */
function bindEvent() {
    $("body").unbind('click').on("click", '#content img', function(e) {
        var index = $("#content img").index(this);
        var url = new Array();
        $("#content img").each(function(i) {
            url[i] = '"' + $(this).attr("src") + '"';
        });
        var json = '{"position":' + index + ',"urls":[' + url + ']}';
        checkBigPic(json);
    });
    $('#content img').error(function() {
        $(this).attr('src', "css/img/pic_default_common.png");
    });
    $('.playBtn').unbind('click').on("click", function(e) {
        handlerVoice();
    });
    $('.stopBtn').unbind('click').on("click", function(e) {
        stopVoiceUi();
        stopVoice();
    });
}
/**
 * 渲染结束
 */
function renderHtmlFinish(json) {
    $('#loading').css('visibility', 'hidden');
    if (json.content) {
        $('#readlay').css('visibility', 'visible');
    }
    renderFinish();
}
/**
 * 处理播放按钮ui   
 */
function handlerVoiceUI(state) {
    if (state == 0) {
        stopVoiceUi();
    } else if (state == 1) {
        $('.playBtn').attr('src', "css/img/pic_audio_pause.gif");
        $('.stopBtn').show();
    } else if (state == 2) {
        $('.playBtn').attr('src', "css/img/pic_audio_play.png");
    }
}

/**
 * 停止播放
 */
function stopVoiceUi() {
    $('.stopBtn').hide();
    $('.playBtn').attr('src', "css/img/pic_audio_normal.png");
}

function setFontSize(size) {
    $("#htmlDetail").css("font-size", getFontSizeClass(size));
}

function getFontSizeClass(size) {
    if (size == 1) {
        return "0.12rem";
    } else if (size == 2) {
        return "0.14rem";
    } else if (size == 3) {
        return "0.16rem";
    } else if (size == 4) {
        return "0.18rem";
    } else if (size == 5) {
        return "0.2rem";
    } else {
        return "2.66em";

    }
}

/*****************native funtion**************/

/**
 * 准备发起网络请求
 */
function renderReady() {
    invoke("renderReady", "{}");
}
/**
 * 页面加载完成
 */
function renderFinish() {
    invoke("renderFinish", "{}");
}

/**
 * 查看大图
 */
function checkBigPic(index) {
    invoke("checkBigPic", index);
}
/**
 * 添加播放器
 */
function addMedia(json) {
    invoke("addMedia", json);
}
/**
 * 从暂停状态开始语音播报
 */
function playVoice() {
    invoke("playVoice", "{}");
}
/**
 * 开始语音播报
 */
function startVoice() {
    invoke("startVoice", "{}");
}
/**
 * 暂停语音播报
 */
function pauseVoice() {
    invoke("pauseVoice", "{}");
}
/**
 *停止语音播报
 */
function stopVoice() {
    invoke("stopVoice", "{}");
}

function handlerVoice() {
    invoke("handlerVoice", "{}");
}
/**
 * log 输出
 */
function log(str) {
    var log = '{"log":' + str + '}'
    invoke("log", log);

}

function invoke(func, json) {
    var fjson = '{"func":"' + func + '","data":' + json + '}';
    // if(isAndroid){
    //  window.jsobj.invoke(func,json);
    //     // window.jsobj[func](json);
    // }
    if (window.jsobj && window.jsobj.invoke) {
            window.jsobj.invoke(fjson);
    }
    // if(isIOS){
    //  window.webkit.messageHandlers.invoke.postMessage(func,json);
    //  // window.webkit.messageHandlers[func].postMessage(json);
    // }
    //鸿蒙
    if (window.jsobj && window.jsobj.call) {
        window.jsobj.call(fjson);
    }
}