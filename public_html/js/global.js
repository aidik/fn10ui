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
                    width: "75px"
                }, 300, function() {
                    $("#menu").addClass("min");
                });
                $("#content").animate({
                    marginLeft: "85px"
                }, 300, function() {
                    $("#content").addClass("min");
                });
            });
        }
    });
    ﻿
});
