<template>
    <b-container id="key-output-container" class="my-3">
        <b-row>
            <b-col class="col-12 col-md-6 my-1">
                <b-card class="isys-card mb-3 h-100">
                    <div v-if="hasKeys">
                        <b-card-body class="text-left">
                            Remove the currently loaded keypair from storage. If you intend to use
                            the keypair on another device, you must export it first. If you
                            do not intend to re-use the key you should revoke it instead.
                        </b-card-body>
                        <b-button block class="btn-danger" @click="removeKeypair">Remove Keypair</b-button>
                        <b-card-body class="text-left">
                            Revoke the currently loaded keypair and remove it
                            from storage. This will cause any content signed
                            with these keys to fail verification.
                        </b-card-body>
                        <b-button block class="btn-danger" @click="revokeKeyPair">Revoke Keypair</b-button>
                        <b-card-body class="text-left">
                            Export the currently loaded keypair. Use this when signing in from
                            a new location. Keep this file secure!
                        </b-card-body>
                        <b-button block class="btn-info" @click="exportKeypair">Export Keypair</b-button>
                    </div>
                    <div v-else>
                        <b-card-title>No Keypair in Application Storage</b-card-title>
                        <b-card-body class="text-left">
                            To sign posts, you must have a public and private
                            key. Your public key must also be associated with
                            your username in the openpgp keypool. Press generate
                            new keypair to do this for you, or generate your own
                            and import them below. Imported keys must be manually
                            published before they can be used to verify posts.
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
                        <b-button block class="btn-success" @click="generateNewKeyPair">Generate new Keypair</b-button>
                        <b-button block v-b-toggle.import-keypair-collapse>Import Keypair</b-button>
                    </div>
                </b-card>
            </b-col>
            <b-col class="col-12 col-md-6 my-1">
                <b-card class="isys-card h-100">
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
        <b-row>
            <b-col>
                <b-collapse id="import-keypair-collapse" class="mt-2">
                    <b-card class="isys-card">
                            <b-row>
                                <b-col>
                                    <b-card class="code-format-card mb-4">
                                        <b-card-title>Enter Public Key</b-card-title>
                                        <b-card-body>
                                            <b-form-textarea
                                                    class="import-key-textarea"
                                                    v-model="importedPublicKey"
                                                    rows="6"
                                                    max-rows="6"
                                            ></b-form-textarea>
                                        </b-card-body>
                                    </b-card>
                                </b-col>
                                <b-col>
                                    <b-card class="code-format-card mb-4">
                                        <b-card-title>Enter Private Key</b-card-title>
                                        <b-card-body>
                                            <b-form-textarea
                                                    class="import-key-textarea"
                                                    v-model="importedPrivateKey"
                                                    rows="6"
                                                    max-rows="6"
                                            ></b-form-textarea>
                                        </b-card-body>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <b-button block class="btn-success" @click="importKeypair"
                                      v-b-toggle.import-keypair-collapse>Import
                            </b-button>
                    </b-card>
                </b-collapse>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapGetters} from "vuex";
    import JSZip from "jszip";

    export default {
        data() {
            return {
                privateKeyPassphrase: '',
                importedPublicKey: '',
                importedPrivateKey: '',
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
                return this.privateKeyPassphrase.length >= 6;
            },
            passphraseInvalidFeedback() {
                if (this.privateKeyPassphrase.length >= 6) {
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
            },
            exportKeypair() {
                let keypairZip = new JSZip();

                keypairZip.file(`${this.currentUser.username}_private.asc`, this.privateKeyArmored);
                keypairZip.file(`${this.currentUser.username}_public.asc`, this.publicKeyArmored);

                keypairZip.generateAsync({type: 'blob'}).then(zip => {
                    const url = window.URL.createObjectURL(zip);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'keypair.zip';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                });
            },
            importKeypair() {
                if (this.importedPublicKey.length < 1 || this.importedPrivateKey.length < 1) {
                    this.$swal.fire({
                        title: 'Failed to Import Keypair',
                        text: 'Please try again',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    this.$store.dispatch("importKeypair", {
                        user: this.currentUser,
                        keypair: {
                            privateKeyArmored: this.importedPrivateKey,
                            publicKeyArmored: this.importedPublicKey
                        }
                    }).then(() => {
                        this.$swal.fire({
                            title: 'Imported Keypair',
                            icon: 'success',
                            timer: 3000,
                            confirmButtonText: 'Ok'
                        });
                    });
                }
            },
            removeKeypair() {
                this.$store.dispatch("removeKeypair", {
                    user: this.currentUser
                }).then(() => {
                    this.$swal.fire({
                        title: 'Removed Keypair',
                        icon: 'success',
                        timer: 3000,
                        confirmButtonText: 'Ok'
                    });
                })
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

    .import-key-textarea {
        background-color: transparent;
        color: white;
        font-family: "Courier New", Courier, monospace;
        font-size: 10px;
        border-radius: 0;
        border: none;
    }
</style>
