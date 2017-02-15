$(document).ready(function() {
    $("#signup-form").submit(function(e) {
        e.preventDefault();
        console.log($(this).serialize());
    })
})
