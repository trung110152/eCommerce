'use strict'
const { token } = require('morgan');
const keyTokenModel = require('../models/keytoken.model')
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey}) => {
        try {
            // const publicKeyString = publicKey.toString();
            const tokens = await keyTokenModel.create({
                user: userId,
                publicKey,
                privateKey
            });
            return tokens? tokens : null
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService;