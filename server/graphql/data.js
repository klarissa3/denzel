const express = require('express');
const imdb = require('../imdb.js');
const Movie = require('../index.js');


const populate_db = async() =>{
    let movies;
	movies = await imdb(request.params.id);
	
	for (movie of movies) {
		
			const movieDB = new Movie({
				link: movie.link,
				id: movie.id,
				metascore: movie.metascore,
				poster: movie.poster,
				rating: movie.rating,
				synopsis: movie.synopsis,
				title: movie.title,
				votes: movie.votes,
        		year: movie.year,
        
			});
			movieDB.movieId instanceof mongoose.Types.ObjectId;
			await movieDB.save();

	}

	const numMovies = await Movie.countDocuments({}, (err, count) => {
		if (err)
			return err;
		return count;
	});
	return ({ total: numMovies });
  
}

const fetch_random = async() =>{
	const random = await Movie.aggregate([ { $match: { metascore: { $gte: 77 } } },{ $sample: { size: 1 } } ])
	
	return random;
}

const fetch_specific = async(args) =>{
	const specific = await Movie.aggregate([ { $match : {  id: args.id } } ]);
	return specific;
}

const search = async(args) =>{
	let lim = 5, meta = 0;
	if (args.limit)
	    lim = Number(request.query.limit);
	if (meta.metascore)
		meta = Number(request.query.metascore);
    const tot = await Movie.countDocuments({ "metascore": meta});
    movie = await Movie.aggregate([ { $match : {  metascore: meta}},{ $sample: { size: lim } }, { $sort: { metascore: -1 } } ]);
    return {limit :lim , total : tot, result : movie} 

}

const save= async(args) =>{
    const filter = { id: args.id }
	const update = { date: args.date, review: args.review }
	let movie = await Movie.findOneAndUpdate(filter,update, {new:true} );
	return { _id: movie._id }

}


module.exports= {populate_db,fetch_random,fetch_specific,search,save};