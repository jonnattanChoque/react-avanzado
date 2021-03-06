const User = require('../Models/Users');
const Product = require('../Models/Product');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

const MakeToken = (user, word, expiresIn) => {
    const { id, email, name, lastName} = user;

    return jwt.sign({id, email, name, lastName}, word, {expiresIn: expiresIn});
}
// Resolvers
const resolvers = {
    Query: {
        getUser: async(_, {token}) => {
            const userId = await jwt.verify(token, process.env.SECRET_WORD)
            return userId;
        },
        getProducts: async () => {
            try {
                const products = await Product.find({});
                return products;
            } catch (error) {
                console.log(error);
            }
        },
        getProduct: async(_, {id}) => {
            const product = await Product.findById(id);
            if (!product) {
                throw new Error('No existe el producto');
            }
            return product;
        },
    },
    Mutation: {
        newUser: async(_, {userInput}) => {
            const {email, password } = userInput;
            const existUser = await User.findOne({email});
            if(existUser) {
                throw new Error('El usuairo ya existe');
            }

            const salt = await bcryptjs.genSalt(10);
            userInput.password = await bcryptjs.hash(password, salt);

            try {
                const user = new User(userInput);
                user.save()
                return user
            } catch (error) {
                console.log(error)
            }
        },
        autenticateUser: async(_, {input}) => {
            const {email, password } = input;

            const existUser = await User.findOne({email});
            if(!existUser) {
                throw new Error('El usuario no existe');
            }

            const passwordCorrect = await bcryptjs.compare(password, existUser.password);
            if(!passwordCorrect) {
                throw new Error('La conraseña es incorrecta');
            }

            return {
                token: MakeToken(existUser, process.env.SECRET_WORD, '24h')
            }
        },
        newProduct: async(_, {productInput}) => {
            try {
                const product = new Product(productInput);
                product.save()
                return product
            } catch (error) {
                console.log(error)
            }
        },
        updateProduct: async(_,{id, productInput}) => {
            const existProduct = await Product.findById(id);
            if(!existProduct) {
                throw new Error('El producto no existe');
            }

            try {
                const product = await Product.findOneAndUpdate({_id: id}, productInput, {new: true});
                return product
            } catch (error) {
                console.log(error)
            }
        },
        deleteProduct: async(_,{id}) => {
            const existProduct = await Product.findById(id);
            if(!existProduct) {
                throw new Error('El producto no existe');
            }

            try {
                const product = await Product.findOneAndDelete({_id: id});
                return "Producto eliminado"
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = resolvers;