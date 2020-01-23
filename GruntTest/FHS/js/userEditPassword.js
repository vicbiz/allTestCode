function togglePasswordFields(generatePassword) {
    var passwordField = $('#password');
    var confirmPasswordField = $('#confirmPassword');

    passwordField.prop('disabled', generatePassword.checked);
    confirmPasswordField.prop('disabled', generatePassword.checked);
}


$(document).ready(function() {
    togglePasswordFields($('#generatePassword'));
    $("#generatePassword").on("click", function(){
        if(navigator.appVersion.indexOf("MSIE 9.")!=-1){
            if($(this).prop("checked")){
                $("#password, #confirmPassword").val("empty");
            } else {
                $("#password, #confirmPassword").val("");
            }
        }
    });
});
