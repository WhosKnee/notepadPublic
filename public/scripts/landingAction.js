$(document).ready(function() {
    var col1C = $("#col1").css("background");
    var col2C = $("#col2").css("background");
    var col3C = $("#col3").css("background");
    var col4C = $("#col4").css("background");

    $(".coloumn").hover(
        function () {
            $(".coloumn").css("background-color", $(this).css("background-color"))
        },
        function () {
            $("#col1").css("background", col1C);
            $("#col2").css("background", col2C);
            $("#col3").css("background", col3C);
            $("#col4").css("background", col4C);
        }
    );

});