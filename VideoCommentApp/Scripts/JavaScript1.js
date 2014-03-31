//sækjum fjölda commenta á serverinn
/*function getCommentServerCount(){
        var count = 0;
        $.ajax({
                type: "GET",
                contenttype: "application/json; charset=utf8",
                url: "/Models/CountComments/",
                data: "{}",        
                datatype: "json",
                success: function (data){
                        count = data[0];
                }
                });
                return count;
}*/

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

/*
$(document).ready(function () {

    $("#button").click(function () {
        comment_post_btn_click();
    });
});

function comment_post_btn_click() {
    var text = $("#CommentText").val();
    if (text.length > 0) {
        $.post("/Home/AddComment",
                {
                    task: "comment_insert",
                    comment: text
                }
                ).error(
                function () {
                    console.log("Error:");
                }
                )
                .success(
                function (data) {
                    loadComments();
                    console.log("ResponseText:" + data);
                }
                );


    }
    else {
        console.log("The text area was empty")
    }

    var text = $("#CommentText").val("");
}

function comment_insert() {

    var t = '';
    t += '<ul id="commentList"></ul>';

    $(".list-group").prepend(t);

}*/

$('document').ready(function () {
    loadComments();
    $("#button").click(function () {
        var temp = $("#CommentText").val();
        var append;
        $.ajax({
            type: "POST",
            contenttype: "application/json; charset=utf8",
            url: "/Home/AddComment/",
            data: "{ commentTemplate : temp}",
            datatype: "json",
            success: function () {
                //til að athuga hvort hefur komið comment á meðan póstað er
                //count comment + 1 == count from server
                //alert(success)
                loadComments();
                console.log("Smjör er gott fyrir sálina");
                console.log("Textinn minn: " + temp);
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