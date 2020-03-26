const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {PORT,url,user,pwd} = require('./constants');
const mongoose = require('mongoose');
const imdb = require('./imdb.js');
const Schema = mongoose.Schema;

const app = express();
module.exports = app;

mongoose.Promise = global.Promise;
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    user: user,
    pass: pwd
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
    process.exit();
});



const movieSchema = Schema({
  
	movieId: mongoose.ObjectId,
  	link: String,
  	id: String,
  	metascore: Number,
  	poster: String,
  	rating: Number,
  	synopsis: String,
  	title: String,
  	votes: Number,
	year: Number,
	date: String,
	review:String
});

var Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/movies/populate/:id', async (request, response) => {
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
			try {
				movieDB.movieId instanceof mongoose.Types.ObjectId;
				await movieDB.save();
			}
			catch (err) {
				return response.status(500).json(err);
			}
    
	}

	const numMovies = await Movie.countDocuments({}, (err, count) => {
		if (err)
			return response.status(500).json(err);
		return count;
	});
	response.status(200).json({ total: numMovies });
  });

app.get('/movies', async (request, response) => {
	const random = await Movie.aggregate([ { $match: { metascore: { $gte: 77 } } },{ $sample: { size: 1 } } ])
	response.status(200).json(random);
	

});

app.get('/movies/:id', async (request, response) => {
	if (request.params.id === "search") {
		let lim = 5, meta = 0;
		if (request.query.limit)
			lim = Number(request.query.limit);
		
		if (request.query.metascore)
			meta = Number(request.query.metascore);
		const tot = await Movie.countDocuments({ "metascore": meta});
		movie = await Movie.aggregate([ { $match : {  metascore: meta}},{ $sample: { size: lim } }, { $sort: { metascore: -1 } } ]);
		response.status(200).json({limit :lim , total : tot, result : movie} );
	}
	const specific = await Movie.aggregate([ { $match : {  id: request.params.id } } ]);
	response.status(200).json(specific);
});

app.post('/movies/:id', async (request, response) => {
	const filter = { id: request.params.id }
	const update = { date: request.body.date, review: request.body.review }
	let movie = await Movie.findOneAndUpdate(filter,update, {new:true} );
	response.status(200).json({ _id: movie._id });
	
	});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);

