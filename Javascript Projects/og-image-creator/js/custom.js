var fileextension = "";
$(document).ready(function () {
    $("#check-my-og").on('click', function () {
        reset()
        fileextension = $("#imageinput").val().slice(($("#imageinput").val().lastIndexOf(".") - 1 >>> 0) + 2);
        $(".page-title ").text($("#pagetitle").val()).removeClass("d-none")
        if ($("#badgetext").val() != "") {
            $(".get-std-btn").text($("#badgetext").val()).removeClass("d-none")
        }

        if (fileextension == "svg") {
            load_svg_source_into_div($("#imageinput").val())
        } else {
            $(".og-img").attr("src", $("#imageinput").val()).removeClass("d-none")
        }
        $("html, body").animate({ scrollTop: 1000 })
        $(".action-block").removeClass("d-none")
    });
    $("#download-my-og").on('click', function () {
        window.setTimeout(takeshot(), 10000);
    });
    $("#layout-width").on('change', function () {
        if ($(this).val() == "full") {
            $(".og-image-holder").addClass("full-wide")
        } else {
            $(".og-image-holder").removeClass("full-wide")
        }
    })
});

function takeshot() {

    let div = document.getElementById('screen-area');
    html2canvas(div, {
        allowTaint: true,
        useCORS: true,
        scrollY: -window.scrollY,
        windowWidth: div.scrollWidth,
        windowHeight: div.scrollHeight
        // onrendered: function (canvas) {

        // }
    }).then(function (canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = $("#pagetitle").val() + '_og.jpg';
        a.click();
    });



}

function load_svg_source_into_div(imgurl) {
    var settings = {
        "url": imgurl,
        "method": "GET",
        "timeout": 0
    };

    $.ajax(settings).done(function (response) {
        var responseimg
        if (response.childNodes[1] == undefined) {
            responseimg = response.childNodes[0]
        } else {
            responseimg = response.childNodes[1]
        }
        console.log(responseimg);
        $(".og-normal-img").addClass("d-none");
        $("div.main-img").append(responseimg)
    });
}

function reset() {
    $(".main-img svg").remove()
    $(".get-std-btn,.page-title").text()
}