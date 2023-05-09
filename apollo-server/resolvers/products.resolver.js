const path = require('path');
const fs = require('fs');
const products = require('../../products.json');
const productsPath = path.resolve('', 'products.json');


module.exports = resolvers = {
    Query: {
       products: () => products,
       product(parent, args, contextValue, info) {
        return products.find((product) => product.id === args.id);
      },
    },
    Mutation: {
        addProduct(parent, args, contextValue, info) {
            const newProduct = {id: products.length + 1, ...args};
            products.push(newProduct);
            fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

            return args    
        },
        updateProduct(parent, args, contextValue, info) {
            const index = products.findIndex(product => product.id === args.id);
            if (index === -1) {
              throw new Error(`Product with id ${args.id} not found`);
            }
    
            const oldProduct = products[index];
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
            products[index] = updatedProduct;
            fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    
            return updatedProduct;
        },
        deleteProduct(parent, args, contextValue, info) {
            const index = products.findIndex(product => product.id === args.id);
            if (index !== -1) {
                products.splice(index, 1);
              fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
              return `Product with id ${args.id} deleted successfully`;
            } else {
              throw new Error(`Product with id ${args.id} not found`);
            }
        }
    }
  };