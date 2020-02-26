<template>
    <b-container id="key-output-container" class="my-3">
        <b-row>
            <b-col>
                <b-card class="isys-card mb-3">
                    <div v-if="hasKeys">
                        <b-card-body>
                            Revoke the currently loaded keypair and remove it
                            from storage. This will cause any content signed
                            with these keys to fail verification.
                        </b-card-body>
                        <b-button @click="revokeKeyPair">Revoke Keypair</b-button>
                    </div>
                    <div v-else>
                        <b-card-title>No Keypair in Application Storage</b-card-title>
                        <b-card-body>
                            To sign posts, you must have a public and private
                            key. Your public key must also be associated with
                            your username in the openpgp keypool. Press generate
                            new keypar to do this for you, or generate your own
                            and paste your public key and encrypted private key
                            below.
                        </b-card-body>
                        <b-form-group
                                id="passphrase-input-group"
                                label-for="passphrase-input-group"
                                :invalid-feedback="passphraseInvalidFeedback"
                                :state="passphraseState"
                        >
                            <b-input-group prepend="Passphrase" class="my-3">
                                <b-form-input
                                        id="passphrase-input-group"
                                        type="password"
                                        v-model="privateKeyPassphrase"
                                        :state="passphraseState"
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-button block @click="generateNewKeyPair">Generate new Keypair</b-button>
                    </div>
                </b-card>
            </b-col>
            <b-col>
                <b-card class="isys-card">
                    <b-card class="code-format-card mb-4">
                        <b-card-title>Public Key</b-card-title>
                        <b-card-body class="key-preview" v-if="hasKeys">
                            {{
                            publicKeyArmored
                            }}
                        </b-card-body>
                        <b-card-body v-else>No key</b-card-body>
                    </b-card>

                    <b-card class="code-format-card">
                        <b-card-title>Private Key</b-card-title>
                        <b-card-body class="key-preview" v-if="hasKeys">
                            {{
                            privateKeyArmored
                            }}
                        </b-card-body>
                        <b-card-body v-else>No key</b-card-body>
                    </b-card>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                privateKeyPassphrase: ''
            }
        },
        computed: {
            ...mapGetters([
                "currentUser",
                "hasKeypair",
                "publicKeyArmored",
                "privateKeyArmored"
            ]),
            hasKeys() {
                return this.hasKeypair;
            },
            passphraseState() {
                return this.privateKeyPassphrase.length > 6;
            },
            passphraseInvalidFeedback() {
                if (this.privateKeyPassphrase.length > 6) {
                    return "";
                } else if (this.privateKeyPassphrase.length > 0) {
                    return "Passphrase must be at least 6 characters";
                } else {
                    return "Please enter a passphrase";
                }
            }
        },
        methods: {
            generateNewKeyPair() {
                if (this.passphraseState) {
                    this.$store.dispatch("generateKeypair", {
                        user: this.currentUser,
                        passphrase: this.privateKeyPassphrase
                    }).then(() => {
                        this.$swal.fire({
                            title: 'Created new Keypair',
                            text: 'An email will be sent to the address associated with this key to confirm ownership',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                    }).catch(() => {
                        this.$swal.fire({
                            title: 'Failed to Create Keypair',
                            text: 'Please try again',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    });
                }
            },
            revokeKeyPair() {
                this.$store.dispatch("revokeKeypair", {
                    user: this.currentUser
                }).then(() => {
                    this.$swal.fire({
                        title: 'Submitted Revocation Request',
                        text: 'An email will be sent to the address associated with this key to confirm removal',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                }).catch(() => {
                    this.$swal.fire({
                        title: 'Failed to Revoke Keypair',
                        text: 'Please try again',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                });
            }
        }
    };
</script>

<style scoped>
    .key-preview {
        max-height: 150px;
        overflow: scroll;
        overflow-x: hidden;
    }
</style>
