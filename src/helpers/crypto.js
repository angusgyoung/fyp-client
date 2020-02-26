import * as openpgp from "openpgp";

const generateKeyPair = (email, passphrase) => {
    const options = {
        userIds: [{name: email, email: email}],
        rsaBits: 4096,
        passphrase: passphrase
    };

    return openpgp.generateKey(options).then(keyPair => keyPair);
};

const signClearText = (content, armouredPrivateKey, passphrase) => {
    return openpgp.key
        .readArmored(armouredPrivateKey)
        .then(keyset => keyset.keys[0])
        .then(encryptedPrivateKey => {
            return new Promise((resolve, reject) => {
                encryptedPrivateKey
                    .decrypt(passphrase)
                    .then(decryptSuccessful => {
                        if (decryptSuccessful) {
                            resolve(encryptedPrivateKey);
                        } else
                            reject(
                                "Passphrase could not be used to decrypt the private key"
                            );
                    }).catch(err => reject(err));
            });
        })
        .then(privateKey => {
            const options = {
                message: openpgp.cleartext.fromText(content),
                privateKeys: [privateKey],
                detached: true
            };
            return openpgp.sign(options);
        })
        .then(signed => signed.signature)
};

const verifyClearText = async (message, signature, publicKey) => {
    return new Promise((resolve, reject) => {
        return Promise.all([
            openpgp.signature.readArmored(signature),
            openpgp.key.readArmored(publicKey.publicKeyArmored)
        ])
            .then(([armoredSignature, armoredPublicKeys]) => {
                const options = {
                    message: openpgp.cleartext.fromText(message),
                    signature: armoredSignature,
                    publicKeys: armoredPublicKeys.keys
                };
                return openpgp.verify(options);
            }).then(result => {
                let {valid} = result.signatures[0];
                if (valid != null) resolve(valid);
                else reject(new Error('Content could not be verified'));
            }).catch(err => {
                return reject(err);
            });
    });
};

export {
    generateKeyPair,
    signClearText,
    verifyClearText
};
