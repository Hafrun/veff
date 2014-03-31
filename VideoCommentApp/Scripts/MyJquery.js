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