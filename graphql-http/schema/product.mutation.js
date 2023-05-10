const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLNonNull } = require("graphql");
const fs = require('fs');
const path = require('path');
const { productType } = require("../types/product.type");
const productsData = require('../../products.json');
const productsPath = path.resolve('', 'products.json');

const productMutation = new GraphQLObjectType({
    name: 'ProductMutation',
    fields: {
        createProduct: {
            type: productType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                discountPercentage: { type: GraphQLFloat },
                rating: { type: GraphQLFloat },
                stock: { type: GraphQLInt },
                brand: { type: GraphQLString },
                category: { type: GraphQLString },
                thumbnail: { type: GraphQLString },
                images: { type: new GraphQLList(GraphQLString) },
            },
            resolve(source, args) {
                const newProduct = {id: productsData.length + 1, ...args};
                productsData.push(newProduct);
                fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));

                return args
            }
        },
        updateProduct: {
            type: productType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLInt) },
              title: { type: new GraphQLNonNull(GraphQLString) },
              description: { type: new GraphQLNonNull(GraphQLString) },
              price: { type: new GraphQLNonNull(GraphQLInt) },
              discountPercentage: { type: GraphQLFloat },
              rating: { type: GraphQLFloat },
              stock: { type: GraphQLInt },
              brand: { type: GraphQLString },
              category: { type: GraphQLString },
              thumbnail: { type: GraphQLString },
              images: { type: new GraphQLList(GraphQLString) },
            },
            resolve(source, args) {
              const index = productsData.findIndex(product => product.id === args.id);
              if (index === -1) {
                throw new Error(`Product with id ${args.id} not found`);
              }
      
              const oldProduct = productsData[index];
              const updatedProduct = {
                ...oldProduct,
                title: args.title || oldProduct.title,
                description: args.description || oldProduct.description,
                price: args.price || oldProduct.price,
                discountPercentage: args.discountPercentage !== undefined ? args.discountPercentage : oldProduct.discountPercentage,
                rating: args.rating !== undefined ? args.rating : oldProduct.rating,
                stock: args.stock !== undefined ? args.stock : oldProduct.stock,
                brand: args.brand !== undefined ? args.brand : oldProduct.brand,
                category: args.category !== undefined ? args.category : oldProduct.category,
                thumbnail: args.thumbnail !== undefined ? args.thumbnail : oldProduct.thumbnail,
                images: args.images !== undefined ? args.images : oldProduct.images,
              };
              productsData[index] = updatedProduct;
              fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));
      
              return updatedProduct;
            },
          },
        deleteProduct: {
            type: GraphQLString,
            args: {
              id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(source, args) {
              const index = productsData.findIndex(product => product.id === args.id);
              if (index !== -1) {
                productsData.splice(index, 1);
                fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));
                return `Product with id ${args.id} deleted successfully`;
              } else {
                throw new Error(`Product with id ${args.id} not found`);
              }
            },
        },
    }
})

module.exports = productMutation;