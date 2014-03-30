var tempArray = new Array();

$.getJSON('/Home/getAllComments', { name: 'model' },
function (list) {
    $(".comments").loadTemplate($("#template"), list);
})

function loadComments() {
    // Athugum hvort við viljum appenda eða ekki
    var append = false;
    if ($('#comment-button').is(':checked')) {
        append = true;
    }
    // Gagna fylkið okkar (með öllum commentum)
        tempArray = [loadComments()];

        // Þetta yfirskrifar allt elementið með öllum commentunum
        $('#comments').loadTemplate($('#template'), array, { append: append });
}

$(function () {
    // Sækjum öll comment þegar síðan loadar
    loadComments();

    $('#comment-button').click(function () {
        // Sækjum öll comment þegar notandi smellir á takkann
        loadComments();
    });
});