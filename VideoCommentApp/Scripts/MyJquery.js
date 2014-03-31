function ConvertStringToJSDate(dt) {
    var dtE = /^\/Date\((-?[0-9]+)\)\/$/.exec(dt);
    if (dtE) {
        var dt = new Date(parseInt(dtE[1], 10));
        return dt;
    }
    return null;
}
//sækjum fjölda commenta á serverinn
function getCommentServerCount(){
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
            for (var i = 0; i < data.length; i++) {
                data[i].CommentDate = ConvertStringToJSDate(data[i].CommentDate);
            }
            $('#commentList').loadTemplate($('#commentTemplate'), data, { append: append });
        }
    });
}

function comment_post_btn_click() {
    var text = $("#CommentText").val();
    console.log(text);
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
                    comment_insert();
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
    t += '<p><span class="glyphicon glyphicon-user"></span>';
    t += '<span class="text-primary" data-content="Username"> Mitt Nafn</span>';
    t += '<span data-content="CommentText"> Mitt comment</span></p>';
    t += '<p> <span class="text-muted" data-content="CommentDate"> Dagsetningin her</span>';
    t += '<a class="like-comment" href="#">Like <span class="glyphicon glyphicon-thumbs-up"></span></a></p>';

    $(".list-group-item").prepend(t);

}

$('document').ready(function () {
    loadComments();
    $("#button").click(function () {
        var temp = { "CommentText": $("#CommentText").val() };
        console.log(temp);
        $.post("/Home/AddComment", temp, function (data) {
            $("#CommentText").val("");
            loadComments();
        });
    })
})