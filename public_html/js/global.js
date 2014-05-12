function showAndHide(id)
{
    if (id === undefined)
    {
        return;
    }
    else
    {
        $(".sah").hide();
        $("#" + id + ".sah").fadeIn("fast");
    }
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

    msgPanel.children(".msg").text(msg);
    msgPanel.fadeIn("slow");
    msgPanel.delay(15000).fadeOut("slow", function() {
        msgPanel.removeClass();
    });
}

function makePie(Options)
{
    if (Options !== undefined && $.isNumeric(Options.width))
    {
        var width = Options.width;
    }
    else
    {
        var width = 450;
    }

    if (Options !== undefined && $.isNumeric(Options.height))
    {
        var height = Options.height;
    }
    else
    {
        var height = 300;
    }

    if (Options !== undefined && Options.colors !== undefined)
    {
        var colors = Options.colors;
    }
    else
    {
        var colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
    }

    if (Options !== undefined && Options.source !== undefined)
    {
        var source = Options.source;
    }
    else
    {
        var source = "data.csv";
    }

    if (Options !== undefined && Options.donut !== undefined)
    {
        var donut = Options.donut;
    }
    else
    {
        var donut = true;
    }

    if (Options !== undefined && Options.attachTo !== undefined)
    {
        var attachTo = Options.attachTo;
    }
    else
    {
        var attachTo = "#d3graph";
    }


    var radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
            .range(colors);

    if (donut === true)
    {
        var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius * 0.3);
    }
    else
    {
        var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);
    }


    var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d.population;
            });

    var svg = d3.select(attachTo).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv(source, function(error, data) {

        data.forEach(function(d) {
            d.population = +d.population;
        });

        var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

        g.append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return color(d.data.age);
                });

        g.append("text")
                .attr("transform", function(d) {
                    return "translate(" + arc.centroid(d) + ")";
                })
                .attr("dy", ".35em")
                .attr("data-link", function(d) {
                    return d.data.link;
                })
                .style("text-anchor", "middle")
                .text(function(d) {
                    return d.data.age;
                });

    });
}

function callPckryLayout()
{
    pckry.layout();
}

function getParametrs()
{
    var urlParams;
    (window.onpopstate = function() {
        var match,
                pl = /\+/g, // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function(s) {
                    return decodeURIComponent(s.replace(pl, " "));
                },
                query = window.location.search.substring(1);

        urlParams = {};
        while (match === search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    })();

    return urlParams['id'];
}



$(document).ready(function() {

    showAndHide(getParametrs());
    
    $( ".jbod " ).selectable();
    
    $("button.close").click(function() {
        $("#msg-panel").fadeOut("fast", function() {
            $("#msg-panel").removeClass();
        });
    });

    d3.selectAll(".arc").on("click", function() {
        alert(d3.select(this).select("text").attr("data-link") + " was clicked");
    });

    $(".lock").click(function() {
        if ($(this).text() === 'LOCK ME')
        {
            $(this).text("LOCKED");
            $(this).parent().addClass("stamp");
            pckry.stamp('.stamp');
        }
        else
        {
            $(this).text("LOCK ME");
            $(this).parent().removeClass("stamp");
            pckry.unstamp('.stamp');
            pckry.stamp('.stamp');
        }
        pckry.layout();
    });


    $(".minimize").click(function() {
        $(this).parent("legend").next(".vdev-group").slideToggle('slow');
        if ($(this).text() === "[+]")
        {
            $(this).text("[-]");
        }
        else
        {
            $(this).text("[+]");
        }
    });

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
}
);
