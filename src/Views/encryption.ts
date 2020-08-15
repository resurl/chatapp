const crypt = require('crypto-random-string')
const CryptoJS = require('crypto-js')

export function encrypt(value: string, salt?: string) : string {
    if (salt) {
        let saltedEncrypt = CryptoJS.AES.encrypt(value, salt)
        return saltedEncrypt.charAt(0) + salt + saltedEncrypt.slice(1);
    }
    
    let secret = crypt({length: 10})
    let encrypted = CryptoJS.AES.encrypt(value, secret).toString()
    return encrypted.charAt(0) + secret + encrypted.slice(1);
}

export function decrypt(value: string) : string {
    let salt = value.slice(1,11)
    let encrypted = value.charAt(0) + value.slice(11)
    let decrypted = CryptoJS.AES.decrypt(encrypted,salt).toString(CryptoJS.enc.Utf8)
    return decrypted
}
