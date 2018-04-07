module.exports = function(app){
    db.Headline.find({})
    .then(function(dbHeadline){
        res.json(dbHeadline);
    }).catch(function(error){
        res.json(error);
    })
}