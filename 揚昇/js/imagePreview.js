var ImagePreview = {
    default_params: {},
    init: function(param) {
        if (param) {
            $.extend(this.default_params, param);
        }
        ip_global_img_list = [];
        var id = this.default_params.id;
        if (typeof id == 'string') {
            if ((ip_global_img_list = $("#" + id).find("img")).length == 0) {
                return;
            }
        } else if (typeof id == 'object' && id != null) {
            ip_global_img_list = $(id);
        }
        this.fnGenerateHtml();
        this.fnBindEvent(ip_global_img_list);
    },
    fnBindEvent: function(ip_global_img_list) {
        if (ip_global_img_list.length == 0) {
            return;
        }
        $(ip_global_img_list).on("click", this.onClickEvent);
        this.onDragEvent($("#ip-img-preview"));
        $("#ip-img-preview").on('mousewheel DOMMouseScroll', this.onMouseScrollEvent);

        $('#ip-img-floatshadow').on("click", function() {
            $('#ip-img-preview').hide();
            $("#ip-left").hide();
            $("#ip-right").hide();
            $("#picture_info").hide();
            $('#ip-img-floatshadow').hide();
            $('#ip-img-preview').attr("src", "");
        });
        $("#ip-left").hover(this.fnMouseOver, this.fnMouseOut).click(this.fnPrev);
        $("#ip-right").hover(this.fnMouseOver, this.fnMouseOut).click(this.fnNext);
    },
    fnGenerateHtml: function() {
        $("#ip-img-preview").remove();
        $("#ip-img-floatshadow").remove();
        $("#picture_info").remove();
        $("body").append('<img id="ip-img-preview" style="position: fixed;left: 50%;top: 50%;transform: translate(-50%, -50%);z-index: 19941206;cursor: move;display: none"/>' +
            '<div id="ip-img-floatshadow" style="z-index: 19941205;background-color: #000;opacity: .5;top: 0;left: 0;width: 100%;height: 100%;position: fixed;display: none" title="點擊空白處關閉"></div>');
        /* $("body").append('<div id="ip-left" style="display: none; width: 100px; height: 100px;left: 5px; top: 50%; position:fixed;z-index:19941207; cursor: pointer;">' +
             '<div style="left:-30px;border: 50px solid;border-color: transparent #1CB9C4 transparent transparent;position: absolute;"></div></div>');
         $("body").append('<div id="ip-right" style="display: none; width: 100px; height: 100px; right: 5px; top: 50%; position:fixed; z-index:19941207;cursor: pointer;">' +
             '<div style="left:30px;border: 50px solid;border-color: transparent transparent transparent #1CB9C4;position: absolute;"></div></div>');*/
        $("body").append('<div id="picture_info" style="display: none;font-weight:bold;color:white;font-size:30px;text-align:center; width:0px ; height: 50px; left:0px;top:0px;position:fixed;z-index:19941207;margin:0px">' +
            '</div>'); //background-color:white;
    },
    fnMouseOver: function() {
        $(this).css("background", "rgb(134, 134, 134)");
        $(this).css("border", "1px solid rgb(111, 111, 111)");
    },
    fnMouseOut: function() {
        $(this).css("background", "");
        $(this).css("border", "");
    },
    /*fnPrev: function() {
        if (typeof(ip_global_cur) == "number" && ip_global_cur > 0) {
            ImagePreview.fnReset();
            $("#ip-img-preview").animate({ left: "48%" }, 100);
            $("#ip-img-preview").attr("src", ip_global_img_list[--ip_global_cur].src);
            $("#ip-img-preview").attr("title", ip_global_img_list[--ip_global_cur].id.substr(3));
            $("#ip-img-preview").animate({ left: "50.5%" }, 100);
            $("#ip-img-preview").animate({ left: "50%" }, 100);
            ImagePreview.fnAdjustMaxWidth();
        }
    },
    fnNext: function() {
        if (typeof(ip_global_cur) == "number" && ip_global_cur < ip_global_img_list.length - 1) {
            ImagePreview.fnReset();
            $("#ip-img-preview").animate({ left: "52%" }, 100);
            $("#ip-img-preview").attr("src", ip_global_img_list[++ip_global_cur].src);
            $("#ip-img-preview").attr("title", ip_global_img_list[++ip_global_cur].id.substr(3));
            $("#ip-img-preview").animate({ left: "49.5%" }, 100);
            $("#ip-img-preview").animate({ left: "50%" }, 100);
            ImagePreview.fnAdjustMaxWidth();
        }
    },*/
    fnGetIndexOfCurImg: function(cur) {
        for (var i = 0; i < ip_global_img_list.length; i++) {
            if ($(ip_global_img_list[i]).is(cur)) {
                return i;
            }
        }
    },
    onClickEvent: function(e) {
        ImagePreview.fnReset();
        $("#ip-img-preview").attr("src", $(this).attr("src"));
        $("#ip-img-preview").attr("title", $(this).attr("id").substr(3));
        //$(this).attr("info");
        ImagePreview.fnAdjustMaxWidth();
        ip_global_cur = ImagePreview.fnGetIndexOfCurImg($(this));
        $("#ip-img-floatshadow").fadeIn();
        $("#ip-img-preview").fadeIn();
        $("#picture_info").fadeIn();
        $("#picture_info").html($(this).attr("info"));
        $("#picture_info").width($("#ip-img-preview").width());
        $("#picture_info").css("left", $("#ip-img-preview").offset().left);
        $("#picture_info").css("top", $("#ip-img-preview").offset().top + $("#ip-img-preview").height());
        $("#picture_info").css("font-size", "30px");
        console.log($("#picture_info").offset().top, $("#ip-img-preview").offset().top + " " + $("#ip-img-preview").height());
        //$("#ip-left").fadeIn();
        //$("#ip-right").fadeIn();
    },
    fnAdjustMaxWidth: function() {
        var widthFlag = true;
        var max = $("#ip-img-preview").width();
        if (max < $("#ip-img-preview").height()) {
            widthFlag = false;
            max = $("#ip-img-preview").height();
        }
        if (widthFlag && $(window).width() < max) {
            $("#ip-img-preview").css("width", "75%");
        } else if (!widthFlag && $(window).height() < max) {
            $("#ip-img-preview").css("height", "75%");
        }
    },
    fnReset: function() {
        $("#ip-img-preview").css("left", "50%");
        $("#ip-img-preview").css("top", "50%");
        $("#ip-img-preview").css("width", "");
        $("#ip-img-preview").css("height", "");
    },
    onMouseScrollEvent: function(e) {
        e.preventDefault();
        var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        var delta = Math.max(-1, Math.min(1, wheel));
        let fontSize = parseInt($("#picture_info").css("font-size"));
        if (delta < 0) { //向下滾動
            $(this).width($(this).width() / 1.1);
            $(this).height($(this).height() / 1.1);
            $("#picture_info").css("font-size", (fontSize - 1) + "px");
        } else { //向上滾動
            $(this).width($(this).width() * 1.1);
            $(this).height($(this).height() * 1.1);
            $("#picture_info").css("font-size", (fontSize + 1) + "px");
        }
        $("#picture_info").css("left", $("#ip-img-preview").offset().left);
        $("#picture_info").css("top", $("#ip-img-preview").offset().top + $("#ip-img-preview").height());
        $("#picture_info").width($("#ip-img-preview").width());
    },
    onDragEvent: function(obj) {
        obj.bind("mousedown", start);

        function start(event) {
            if (event.button == 0) {
                gapX = event.clientX - obj.offset().left;
                gapY = event.clientY - obj.offset().top;
                $(document).bind("mousemove", move);
                $(document).bind("mouseup", stop);
            }
            return false;
        }

        function move(event) {
            obj.css({
                "left": (event.clientX - gapX + obj.width() / 2) + "px",
                "top": (event.clientY - gapY + obj.height() / 2) + "px"
            });
            $("#picture_info").css("left", $("#ip-img-preview").offset().left);
            $("#picture_info").css("top", $("#ip-img-preview").offset().top + $("#ip-img-preview").height());
            console.log($("#picture_info").offset().top, $("#ip-img-preview").offset().top, $("#ip-img-preview").height());
            console.log($("#picture_info").offset().top, $("#ip-img-preview").offset().top + $("#ip-img-preview").height());
            return false;
        }

        function stop() {
            $(document).unbind("mousemove", move);
            $(document).unbind("mouseup", stop);
        }

    }
};