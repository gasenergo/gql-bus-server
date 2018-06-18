const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to localhost mongodb database, uncomment if you want to use local database

// mongoose.connect('mongodb://localhost/bus-gql')
// mongoose.connection.once('open', () => {
//     console.log('Database connected');
// });


// connect to atlas mongodb database, please don't forget to change my URI to yours
mongoose.connect('mongodb://Admin:nkDDHHRe1yvulaSw@bus-shard-00-00-swsqn.mongodb.net:27017,bus-shard-00-01-swsqn.mongodb.net:27017,bus-shard-00-02-swsqn.mongodb.net:27017/bus-gql?ssl=true&replicaSet=Bus-shard-0&authSource=admin&retryWrites=true')

mongoose.connection.once('open', () => {
    console.log('Database connected');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('now listening for requests on port 4000');
});
