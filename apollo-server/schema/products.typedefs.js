module.exports = typeDefs = `#graphql
  type Product {
    id: Int!,
    title: String!,
    description: String,
    price: Int!,
    discountPercentage: Float,
    rating: Float,
    stock: Int,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String],
  }

  type Query {
    products: [Product]
    product(id: Int!): Product
  }

  type Mutation {
    addProduct(
        title: String!,
        description: String,
        price: Int!,
        discountPercentage: Float,
        rating: Float,
        stock: Int,
        brand: String,
        category: String,
        thumbnail: String,
        images: [String]
        ): Product
    deleteProduct(id: Int!): String
    updateProduct(
        id: Int!
        title: String!,
        description: String,
        price: Int!,
        discountPercentage: Float,
        rating: Float,
        stock: Int,
        brand: String,
        category: String,
        thumbnail: String,
        images: [String]
        ): Product
  }
`;