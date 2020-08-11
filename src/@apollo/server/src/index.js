const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const ShowAPI = require('./datasources/shows');
const UserAPI = require('./datasources/user');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        showAPI: new ShowAPI(),
        userAPI: new UserAPI()
    }),
    engine: {
        reportSchema: true
    }

});

server.listen().then(({ url }) => {
    console.log(`Server is running at ${url}`);
})