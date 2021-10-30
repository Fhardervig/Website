$(document).ready(function() {
    $("#popcorn").click(function() {
        alert($("#eq1tt").html());
    }).css('cursor', 'pointer');
});

tippy('#popcorn', {
    content: "Success!",
});