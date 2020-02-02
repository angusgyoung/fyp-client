import * as openpgp from 'openpgp'

const keypairLocalStorageKey = "keypair";

const generateKeyPair = (email, passphrase) => {
    const options = {
        userIds: [{ name: email, email: email }],
        rsaBits: 4096,
        passphrase: passphrase
    };

    return openpgp.generateKey(options).then(keyPair => keyPair);
}

const signClearText = async (content, passphrase) => {
    let armouredPrivateKey = getKeypairFromLocalStorage().privateKeyArmored;

    const privateKey = (await openpgp.key.readArmored(armouredPrivateKey)).keys[0];
    await privateKey.decrypt(passphrase);

    const options = {
        message: openpgp.cleartext.fromText(content),
        privateKeys: [privateKey],
        detached: true
    };

    return await openpgp.sign(options).then(signed => signed.signature);
}

const verifyClearText = async (message, signature, publicKey) => {
    const options = {
        message: openpgp.cleartext.fromText(message),
        signature: await openpgp.readArmored(signature),
        publicKeys: (await openpgp.readArmored(publicKey)).keys
    }

    return await openpgp.verify(options).then(verified => verified);
}

const getKeypairFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(keypairLocalStorageKey));
}

const setKeypairInLocalStorage = (keypair) => {
    localStorage.setItem(keypairLocalStorageKey, JSON.stringify(keypair));
}

export {
    generateKeyPair,
    signClearText,
    verifyClearText,
    setKeypairInLocalStorage
}