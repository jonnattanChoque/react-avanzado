const User = require('../Models/Users');
const bcryptjs = require('bcryptjs');

// Resolvers
const resolvers = {
    Query: {
        obtener: () => "Algo"
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
        }
    }
}

module.exports = resolvers;