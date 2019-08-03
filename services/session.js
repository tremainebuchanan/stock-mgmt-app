const Session = require('../models/db').Session
const configs = require('../config/config')

module.exports = {
    index : async () => {
        return await Session
                    .find({"expiresOn": { "$gte": new Date() }})
                    .find()
                    .populate('userId', 'email firstName lastName')
    },
    create: async (sessionId, userId) => {  
        var date = new Date()
        const sessionLength = parseInt(configs.app.session.maxAge) / 1000
        date.setSeconds(date.getSeconds() + sessionLength)
        const session = new Session({
            userId: userId,
            expiresOn: date,
            sessionId: sessionId
        })      
        return await session.save()
    },
    remove: async (sessionId) => {
        return await Session.findOneAndDelete({sessionId: sessionId})
        //return await Session.deleteOne({sessionId: sessionId})
    }
}