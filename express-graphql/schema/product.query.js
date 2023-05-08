const { GraphQLObjectType, GraphQLList } = require("graphql");
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
        }
    }
})

module.exports = productQuery;