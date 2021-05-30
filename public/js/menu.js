$(document).ready(function () {
    $("#main_menu").height($("body").height() + 25);
    $("#link_menu_mobile").click(function () {
        $("#fundo_total").fadeToggle();
        $("#main_menu").fadeToggle();
        
        $("#main_menu").css("display", "table");
    });
});

$(document).ready(function () {
    $(".dropdown").click(function () {
        var el = $(this);
        if (el.hasClass("active")) {
            el.removeClass("active");
        } else {
            el.addClass("active");
        }
        el.children("ul").toggle();
    });
});