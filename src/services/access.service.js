'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');

const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITE',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {

    static signUp = async ( {name, email, password}) => {
        try {
            //step 1: check email exists?

            const holderShop = await shopModel.findOne({ email}).lean();
            if( holderShop){
                return {
                    code: 'xxxx',
                    messsage: 'Shop already registered'
                }
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
            
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;