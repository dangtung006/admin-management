'use strict';

import _ from 'lodash';
import {encrypt, decrypt} from './encryption';

const MY_KEY_SESSION_AUTH = 'my_identity';
const MY_KEY_COOKIES_AUTH = 'my-auth';
const MY_COOKIES_LIFETIME = 30 * 24 * 3600 * 1000;

let self = module.exports = {

    loginUser :(req, res, users) => {
        self.setCookies(res, MY_KEY_COOKIES_AUTH, JSON.stringify(_.pick(users, ['_id', 'email'])));
        self.setIdentity(req, users);
    },

    setCookies : (res, key, data, lifeTime = MY_COOKIES_LIFETIME, path='/', httpOnly = true) => {
        let dataEncrypt = encrypt(data);
        res.cookies.set(key, dataEncrypt, {maxAge: lifeTime, httpOnly: httpOnly});
    },

    setIdentity(req, user) {
        req.session[MY_KEY_SESSION_AUTH] =  _.pick(user, ['_id', 'email']);
    },

    isAuthenticate(req, res) {
        let dataIdentity = req.session[MY_KEY_SESSION_AUTH] || '';
        let dataCookies = res.cookies.get(MY_KEY_COOKIES_AUTH) || '';

        if (dataIdentity) {
            if (!dataCookies) {
                self.setCookies(res, MY_KEY_COOKIES_AUTH, JSON.stringify(dataIdentity));
            }
            return true;
        } else {
            if (!dataCookies)
                return false;
            else {
                self.setIdentity(req, JSON.parse(decrypt(dataCookies)));
                return true;
            }
        }
    },

    removeCookies(res) {
        res.clearCookie(MY_KEY_COOKIES_AUTH);
    },

    logout(req, res) {
        try {
            self.removeCookies(res);
            req.session.destroy();
        } catch(err) {
            console.log(err)
        }
    }
}