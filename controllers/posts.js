$(document).ready(function() {

    $( "#new-post" ).on( "submit", function( event ) {
        event.preventDefault();

        var post = $(this).serialize();

        $.post('/posts', post, function (data) {
            console.log(data)
            $('#post-list').append("<li class= 'list-group-item'>" +
            "<a href='/posts/" + data._id + "'>" + data.body + "</a>" +
            "<div class='remove-post' data-id='" + data._id +
             "'><i class='ion-trash-a'></i></div>" + "</li>");
            $('#new-post')[0].reset();
        });
    });

    $('#post-list').on("click", ".remove-post",  function (e) {
        e.preventDefault();
        console.log("remove-post");
        var post = $(this)
        var postId = post.data('id');

        $.ajax({
            url: '/posts/' + postId,
            type: 'DELETE',
            success: function(data) {
                post.parent().remove();
            }
        })
    })
});
