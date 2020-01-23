$().ready(function () {

    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    $("#selectYear select").on("change", function () {
        var selectedValue = $(this).find("option:selected").attr("value");
        var newUrl = window.location.pathname + "?yearId=" + selectedValue;
        window.location = newUrl;
    });
})