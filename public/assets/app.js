$(document).ready(function(){
    //Hide the comments on page load
    $('#noteInput').hide();

    //Scrape the news on page load

    $.ajax({
        method: "GET",
        url: '/stories'
    }).then(function(error, data){
        res.json(data);
    })

    var headlineId;

    $('.commentButton').on('click', function(event){ 

         // //Save the id of the selected headline in order to get all comments
        headlineId = $(this).attr("data-id")
        console.log(headlineId);

        //AJAX call to get all the notes
        // $.ajax({
        //     method: "GET",
        //     url: '/headlines/' + headlineId
        // }).then(function(data){
        //     res.json(data)
        // })
        
        $('#noteInput').show();

        //Display all of the notes that are already associated with an article 
        $.ajax({
            method: "GET",
            url: '/headlines/' + headlineId
        }).then(function(data){
            $('#allComments').empty()
            console.log("hello")
            data.note.forEach(element => {
                $('#allComments').append('<div class="card">')
                   $('#allComments').append('<div class="card-body">')    
                       $('#allComments').append('<h5 class="card-title commentUsername" id="commentUsername">' + element.username + '</h5>')        
                       $('#allComments').append('<h6 class="card-subtitle mb-2 text-muted" id="cardDate">' + element.date+'</h6>')        
                       $('#allComments').append('<p class="card-text" id="userComment">' + element.comment + '</p>')           
                   $('#allComments').append('</div>')    
                $('#allComments').append('</div>') 
           
           // Clear the fields whena comment is left
           $('#username').val("");
           $('#comment').val("")
            
           });
        })

    });
    


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
            console.log(data.note);

            data.note.forEach(element => {
                 $('#allComments').append('<div class="card">')
                    $('#allComments').append('<div class="card-body">')    
                        $('#allComments').append('<h5 class="card-title commentUsername" id="commentUsername">' + element.username + '</h5>')        
                        $('#allComments').append('<h6 class="card-subtitle mb-2 text-muted" id="cardDate">' + element.date+'</h6>')        
                        $('#allComments').append('<p class="card-text" id="userComment">' + element.comment + '</p>')           
                    $('#allComments').append('</div>')    
                 $('#allComments').append('</div>') 
            
            // Clear the fields whena comment is left
            $('#username').val("");
            $('#comment').val("")
             
            });
             
           


        }).catch(function(error){
            console.log(error);
        })

       
    })

})