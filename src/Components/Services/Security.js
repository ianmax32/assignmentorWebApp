import CryptoJS from 'crypto-js';

export default Security={
    crypt:{
        secret:process.env.encryptionKey,
    
        encrypt:(clear)=>{
            var pass = CryptoJS.AES.encrypt(clear,crypt.secret)
            return pass.toString();
        }
    }
}



