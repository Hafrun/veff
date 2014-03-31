//sækjum fjölda commenta á serverinn
function getCommentServerCount() {
    var count = 0;
    $.ajax({
        type: "GET",
        contenttype: "application/json; charset=utf8",
        url: "/Home/CountComments/",
        data: "{}",
        datatype: "json",
        success: function (data) {
            count = data[0];
        }
    });
    return count;
}


function loadComments() {
    // Athugum hvort við viljum appenda eða ekki
    var append = false;
    $.ajax({
        type: "GET",
        contenttype: "application/json; charset=utf8",
        url: "/Home/getAllComments/",
        data: "{}",
        datatype: "json",
        success: function (data) {
            // Þetta yfirskrifar allt elementið með öllum commentunum
            $('#commentList').loadTemplate($('#commentTemplate'), data, { append: append });
        }
    });
}

$('document').ready(function () {
    loadComments();
    $("#button").click(function () {
        var temp = $("#commentText").val();

        $.ajax({
            type: "POST",
            contenttype: "application/json; charset=utf8",
            url: "/Home/AddComment/",
            data: "{\"commentText\":\"" + temp + "\"}",
            datatype: "json",
            success: function () {
                //til að athuga hvort hefur komið comment á meðan póstað er
                //count comment + 1 == count from server
                loadComments();
            },

            //ef ekkert var skrifað á meðan póstað var
            //empty list
            //$("ul.student-single").empty();
            //inn í else - get all comments again

            error: function (xhr, error) {
                alert("readyState: " + xhr.readyState + "/nstatus: " + xhr.status);
                alert("responseText: " + xhr.responseText);
            }
        });
    });
});