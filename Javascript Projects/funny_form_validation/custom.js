$(document).ready(function () {
    $("#password").on('keyup', function () {
        // console.log($(this).val())
        if ($(this).val() == "funny") {
            $(".btn-group").removeClass("wrong");
            $(".btn-group").addClass("correct");
        } else if ($(this).val() == "") {
            $(".btn-group").removeClass("wrong correct")
        } else {
            $(".btn-group").addClass("wrong")
        }
        $(".btn-group.wrong button").hover(function () {
            $("button").addClass("swiper-left");
        });
    });

});