const { GraphQLObjectType, GraphQLList, GraphQLInt } = require("graphql");
const { productType } = require("../types/product.type");
const productsData = require('../../products.json');


const productQuery = new GraphQLObjectType({
    name: 'ProductQuery',
    fields: {
        getAllProducts: {
            type: new GraphQLList(productType),
            resolve(source, args) {
                return productsData;
            }
        },
        getProduct: {
            type: productType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(source, args) {
                return productsData.find(product => product.id === args.id);
            }
        }
    }
})

module.exports = productQuery;