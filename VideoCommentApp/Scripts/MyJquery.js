$.getJSON('/Home/getAllComments', { name: 'model' },
function (list) {
    $(".comments").loadTemplate($("#template"), list);
})

$(function(){ 

    var comments = getAllComments();
    $.ajax({
        url: "MyJquery.js", 
        type: "POST",
        data: comments,     
        cache: false,
        success: function(comment) {
            alert($(".comments").loadTemplate($("#template"), list));

        }
    });
})