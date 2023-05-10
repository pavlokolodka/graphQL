const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList} = require('graphql')

const productType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        discountPercentage: { type: GraphQLFloat },
        rating: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
        brand: { type: GraphQLString },
        category: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        images: { type: new GraphQLList(GraphQLString) },
    }
})

module.exports = {
    productType   
}