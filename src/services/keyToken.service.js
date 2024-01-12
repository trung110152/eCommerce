'use strict'
const { token } = require('morgan');
const keyTokenModel = require('../models/keytoken.model')
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken = null}) => {
        try {
            //lv 0
            // const publicKeyString = publicKey.toString();
            // const tokens = await keyTokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // });
            // return tokens? tokens : null

            //lv 1
            const filter = {user: userId},
                  update = {
                    publicKey,
                    privateKey,
                    refreshTokensUsed: [],
                    refreshToken
                  },
                  options = {
                    upsert: true,
                    new: true
                  }
            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService;