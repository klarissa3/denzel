const { GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = require('graphql');

const {movieType} = require('./types.js');
const {number} = require('./types.js');
const {searchType} = require('./types.js');
let {populate_db,fetch_random,fetch_specific,search,save} = require('./data.js');

const _ = require('lodash');

//Define the Query

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      populate:{
        type:number,
        resolve: populate_db

      },
      random: {
        type: movieType,
        resolve: fetch_random
      },
      specific: {
        type: movieType,
        args: {
            id: { type: GraphQLID }
        },
        resolve: fetch_specific
      },
      search: {
        type: searchType,
        args: {
          limit: { type: GraphQLInt },
          metascore: { type: GraphQLInt}
        },
        resolve: search
      },
      save: {
        type: movieType,
        args: {
            date: { type: GraphQLString },
            review: { type: GraphQLString}
        },
        resolve: save
      },
    }
});

exports.queryType = queryType;