const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

number = new GraphQLObjectType({
    name: 'Populate',
    fields: {
        total: { type: GraphQLInt },       
    }
});

movieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        link: { type: GraphQLString },
        id: { type: GraphQLID },
        metascore: { type: GraphQLInt },
        rating: { type: GraphQLInt },
        synopsis: { type: GraphQLString },
        title: { type: GraphQLString },
        votes: { type: GraphQLInt },
        year: { type: GraphQLInt },
        date: {type: GraphQLString},
        review: {type:GraphQLString}
        
    }
});

searchType = new GraphQLObjectType({
    name: 'Search',
    fields: {
        limit: { type: GraphQLString },
        total: { type: GraphQLID },
        result: { type: [GraphQLObjectType] },
        
    }
});

exports.number = number;
exports.movieType = movieType;
exports.searchType = searchType;