'use strict'

const JWT = require('jsonwebtoken');

const createTokenPair = async ( payload, publicKey, privateKey) => {
    try {
        // access token
        console.log(`private key`,privateKey)
        const accessToken = await JWT.sign( payload, publicKey, {
            expiresIn: '2 days'
        })
        const refreshToken = await JWT.sign( payload, privateKey, {
            expiresIn: '7 days'
        })
        JWT.verify(accessToken, publicKey, (error, decode) => {
            if(error){
                console.log(`error verify`, error)
            } else{
                console.log(`decode verify`, decode)
            }
        })

        return { accessToken, refreshToken}
    } catch (error) {
        return error
    }
}

module.exports  = { createTokenPair}