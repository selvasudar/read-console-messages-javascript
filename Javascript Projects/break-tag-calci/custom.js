var device_val_calc = "";
$(document).ready(function () {
    $("#calculate_value").on('click', function () {
        $('input[type=radio]').each(function () {
            if (this.checked) {
                set_device_value($(this).val() + " ");
            }
        });
        $(".result span").text("<br class='" + device_val_calc + "'/>")
    })
})
function set_device_value(value) {
    device_val_calc += value
}