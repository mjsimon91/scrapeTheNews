
$.ajax({
  method: "GET",
  url: "/stories"
}).then(function(data){
  //Take each object and create a headline
  for (var i = 0; i < data.length; index++) {
      $('#headline').append('<div class="card"><div class="card-body"><h5 class="card-title">' + data[i].title + '</h5><h6 class="card-subtitle mb-2 text-muted">' + data[i].author + '</h6><p class="card-text">' + data[i].text + '</p><a href="' + data[i].link + '" class="card-link">View Article</a><a class="card-link" data-id="' +data[i]._id + '">Comment</a></div></div>')
  }
})
