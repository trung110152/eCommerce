'use strict'

const JWT = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');
const HEADER = {
    API_KEY : 'x-api-key',
    CLIENT_ID : 'x-client-id',
    AUTHORIZATION : 'authorization'
}

const createTokenPair = async ( payload, publicKey, privateKey) => {
    try {
        // Access token
        // console.log(`private key`,privateKey)
        const accessToken = await JWT.sign( payload, publicKey, {
            expiresIn: '2 days'
        })

        //Refresh token
        const refreshToken = await JWT.sign( payload, privateKey, {
            expiresIn: '7 days'
        })
        // JWT.verify(accessToken, publicKey, (error, decode) => {
        //     if(error){
        //         console.log(`error verify`, error)
        //     } else{
        //         console.log(`decode verify`, decode)
        //     }
        // })

        return { accessToken, refreshToken }
    } catch ( error)  {
        return error
    }
}

const authentication = asyncHandler( async (req, res, next) => {
    /*
    1. Check user missing
    2. Get accessToken
    3. Verify Token
    4. Check user in dbs
    5. Check keyToken with this userId?
    6. if OK => next()
    */
    //1.
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('Invalid Request')
    //2.
    const keyStore = await findByUserId( userId )
    if(!keyStore) throw new NotFoundError('Not Found KeyStore')
    //3.
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request')
    //4.
    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid UserId')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

const verifyJWT = async ( token, keySecret ) => {
    return await JWT.verify( token, keySecret )
}

module.exports  = { 
    createTokenPair,
    authentication,
    verifyJWT
}