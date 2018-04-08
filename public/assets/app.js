$(document).ready(function(){
    //Hide the comments on page load
    $('#noteInput').hide();

    var headlineId
    $('.commentButton').on('click', function(event){
        
        // //Save the id of the selected headline in order to get all comments
        headlineId = $(this).attr("data-id")

        //AJAX call to get all the notes
        $.ajax({
            method: "GET",
            url: '/headlines/' + headlineId
        }).then(function(data){
            console.log(data);
        })
        console.log('headlineId ' +headlineId)
        $('#noteInput').show();

    })

    // When a user submits a comment, post to the db
    $('.submitComment').on('click', function(event){
        
        // Get the values of the input
        var username = $('#username').val().trim()
        var comment = $('#comment').val().trim();

        var note = {
            username: username,
            comment: comment
        }
        
        // //AJAX call to get all the notes
        $.ajax({
            method: "Post",
            url: '/headlines/' + headlineId,
            data: note
        }).then(function(data){
            console.log(data);
        })
    })

})