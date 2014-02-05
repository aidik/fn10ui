function showAndHide(id)
{
    $(".sah").hide();
    $("#" + id + ".sah").show();
}

function showMsgPanel(type, msg)
{
    var msgPanel = $("#msg-panel");
    msgPanel.width($("#msg-panel-wrap").width());
    if (type === "error")
    {
        msgPanel.addClass("error");
    }
    else if (type === "warning")
    {
        msgPanel.addClass("warning");
    }
    else if (type === "success")
    {
        msgPanel.addClass("success");
    }
    
    msgPanel.text(msg);
    msgPanel.fadeIn("slow");
    msgPanel.delay(5000).fadeOut("slow", function() {msgPanel.removeClass();});    
}

$(document).ready(function() {




    $("#blue-div").click(function() {
        if ($("#logo").hasClass("min"))
        {
            $("#logo").animate({
                opacity: 0.25,
                width: "toggle"
            }, 400, function() {

                $("#logo").removeClass("min");
                $("#logo").animate({
                    opacity: 1,
                    width: "toggle"
                }, 600, function() {
                });
                $("#menu").animate({
                    width: "230px"
                }, 500, function() {
                    $("#menu").removeClass("min");
                    $("#menu .menu-anchor-text").fadeIn("slow");
                });
                $("#content").animate({
                    marginLeft: "240px"
                }, 500, function() {
                    $("#content").removeClass("min");
                });
            });



        }
        else
        {
            $("#menu .menu-anchor-text").fadeOut("slow");
            $("#logo").animate({
                opacity: 0.25,
                width: "toggle"
            }, 600, function() {

                $("#logo").addClass("min");
                $("#logo").animate({
                    opacity: 1,
                    width: "toggle"
                }, 400, function() {
                });
                $("#menu").animate({
                    width: "44px"
                }, 300, function() {
                    $("#menu").addClass("min");
                });
                $("#content").animate({
                    marginLeft: "59px"
                }, 300, function() {
                    $("#content").addClass("min");
                });
            });
        }
    });
    ﻿
});
