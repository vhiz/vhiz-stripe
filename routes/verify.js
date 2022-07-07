const jwt = require('jsonwebtoken')
require('dotenv/config')

const verifiedToken = (req, res, next)=>{
    const authheaders = req.headers.token;
    if (authheaders) {
        const token = authheaders.split(" ")[1]
        jwt.verify(token, process.env.token, (err, verified)=>{
            if(err) res.status(403).send('token is not right')
            req.loginuser = verified;
            next()
        })
    } else {
        res.status(401).send('you dont have access')
    }
}

const verifiedTokenAuth = (req, res, next) =>{
    verifiedToken(req, res, ()=>{
        if(req.loginuser.id = req.params.id || req.loginuser.isAdmin){
            next()
        }else{
            res.status(403).send('not allowed')
        }
    })
}

const verifiedTokenAdmin = (req, res, next) =>{
    verifiedToken(req, res, ()=>{
        if(req.loginuser.isAdmin){
            next()
        }else{
            res.status(403).send('not allowed')
        }
    })
}

module.exports = {verifiedToken, verifiedTokenAuth, verifiedTokenAdmin}