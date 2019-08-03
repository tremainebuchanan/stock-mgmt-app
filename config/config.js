const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    mongo: {
        uri: process.env.MONGODB_URI,
        options: {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    },
    sendgrid: {
        apiKey: process.env.SENDGRID_API
    },
    app: {
        session: {
            secret: process.env.SESSION_SECRET,
            maxAge: process.env.SESSION_MAXAGE
        }
    }
}