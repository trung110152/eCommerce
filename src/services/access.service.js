'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const { findByEmail } = require('./shop.service');

const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITE',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {
    /*
    login
    1. check email in dbs
    2. match password
    3. create AccessToken, RefreshToken and save
    4. generate tokens
    5. get data return login 
    */

    static login = async ({email, password, refreshToken = null}) => {
        //1.
        const foundShop = await findByEmail({email})
        if(!foundShop) throw new BadRequestError('Shop not registered')
        //2.
        const match = bcrypt.compare(password, foundShop.password)
        if(!match) throw new AuthFailureError('Authentication Error')
        //3.
        const publicKey = crypto.randomBytes(64).toString()
        const privateKey = crypto.randomBytes(64).toString()
        //4.
        const { _id: userId} = foundShop
        const tokens = await createTokenPair({userId, email}, publicKey, privateKey)
        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId
        })
        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], obj: foundShop}),
            tokens
            
        }
        
    }

    static signUp = async ({ name, email, password}) => {
        
            //step 1: check email exists?
            const holderShop = await shopModel.findOne({ email}).lean();
            if( holderShop){
                throw new BadRequestError('Error: Shop already registered')
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            });

        if(newShop){
            // create privateKey, publicKey
            // const { privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     privateKeyEncoding: {
            //         type: 'pkcs1', // Public Key Cryptography Standards !
            //         format: 'pem'
            //     },
            //     publicKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     }
            // })

        const publicKey = crypto.randomBytes(64).toString();
        const privateKey = crypto.randomBytes(64).toString();
            // console.log( publicKey)
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })

            console.log(`keyStore::`,keyStore)
            
            if( !keyStore){
                return {
                    code: 'xxxx',
                    messsage: 'keyStore error'
                }
            } 
            // create token pair
            // const publicKeyObj = crypto.createPublicKey( publicKeyString)
            const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey)
            console.log('Create token success::', tokens)
            
            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fields: ['_id', 'name', 'email'], obj: newShop}),
                    tokens
                }
            }
        }
        return {
            code: 200,
            metadata: null
        }
            
    }
}

module.exports = AccessService;