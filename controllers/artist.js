var Artist = require('../models/artist');

exports.getArtists = function(req, res, next){

    Artist.find(function(err, artists) {

        if (err){
            res.send(err);
        }

        return res.status(200).send(artists);

    });

}

exports.createArtist = function(req, res, next){

    var name = req.body.name;
    var identifier = req.body.identifier;
    var images = req.body.images;
    var genres = req.body.genres;

    if(!name){
        return res.status(400).send({error: 'You must enter a name'});
    }

    if(!identifier){
        return res.status(400).send({error: 'You must enter an identifier'});
    }

    Artist.findOne({identifier:identifier}, function(err, existingArtist){

        if(err){
            return next(err);
        }

        if(existingArtist){
              return res.status(409).send({error: 'That artist is already in our records'});
        }

        var artist = new Artist({
          identifier: identifier,
          name: name,
          images: images,
          genres: genres
        });

        artist.save(function(err, artist){

            if(err){
                return next(err);
            }

            return res.status(200).json({
              message: "Artist successfully added!",
              artist: artist
            })
        })
    });
}

exports.getArtistByIdentifier = function(req, res, next){

    var identifier = req.params.identifier;

    if(!identifier){
        return res.status(400).send({error: 'You must enter an identifier'});
    }

    Artist.findOne({identifier:identifier}, function(err, artist){

        if(err){
            return next(err);
        }

        if(!artist || artist == null){
          return res.status(404).json({
            error: "Artist not found"
          });
        }

        return res.status(200).json({
          artist: artist
        });

    });
}

exports.deleteArtist = function(req, res, next){

    Artist.remove({
        _id : req.params.artist_id
    }, function(err, artist) {
        res.json(artist);
    });

}
