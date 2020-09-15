$().ready(function(){

    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    $("#selectSection select").on("change", function(){
        var selectedValue = $("option:selected").attr("value");
        var newUrl = window.location.pathname+"?sectionId="+selectedValue;
        window.location = newUrl;
    });
});
