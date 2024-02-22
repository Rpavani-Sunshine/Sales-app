const JWT = require('jsonwebtoken');
const {SECRET_JWT} = require('../config');
const MONGODB = require('mongoose')
const UserModel =  MONGODB.model("SalesAppUserData")

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(400).json({error_msg: 'User Not LoggedIn'});
    }
    const token = authorization.replace("Bearer ","");
    JWT.verify(token, SECRET_JWT, (err, payload) => {
        if(err){
            return res.status(400).json({error_msg: 'User Not LoggedIn'});
        }
        const {_id} = payload;
        UserModel.findById(_id)
        .then((user) => {
            req.user = user;
            next();
        })
    });
};