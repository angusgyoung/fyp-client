<template>
    <div>
        <b-form @submit.prevent="signAndPost">
            <b-form-group
                    id="post-content-input-fg"
                    label="What do you want to say"
                    label-for="post-content-input"
                    :invalid-feedback="postContentInvalid"
                    :state="postContentState"
            >
                <b-form-textarea
                        id="post-content-input"
                        v-model="form.postContent"
                        no-resize
                        rows="3"
                ></b-form-textarea>
            </b-form-group>

            <b-form-group
                    v-if="hasKeypair"
                    id="signing-passphrase-input-fg"
                    label="Enter your key decryption password"
                    label-for="signing-passphrase-input"
                    :invalid-feedback="signingPassphraseInvalid"
                    :valid-feedback="signingPassphraseValid"
                    :state="signingPassphraseState"
            >
                <b-form-input
                        id="signing-passphrase-input"
                        autocomplete="private-key-passphrase"
                        type="password"
                        v-model="form.signingPassphrase"
                        trim
                ></b-form-input>
            </b-form-group>
            <p v-else>
                You have not set up a keypair to sign posts. Go to the
                <router-link to="/keys">keys</router-link> page to generate or
                import a new keypair.
            </p>

            <b-row>
                <b-col class="col-12 col-md-8">
                    <b-button class variant="outline-danger">Cancel</b-button>
                </b-col>
                <b-col class="col-6 col-md-4">
                    <b-button
                            v-if="hasKeypair"
                            variant="outline-primary"
                            v-b-toggle="'preview-signature-collapse'"
                    >Preview Signature
                    </b-button>
                    <b-button class="float-right" type="submit" variant="primary">Post</b-button>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-collapse class="mt-2 m-1" id="preview-signature-collapse">
                        <b-card
                                v-if="currentSignature"
                                id="post-signature-preview"
                                class="code-format-card text-wrap"
                        >
                            {{ currentSignature }}
                        </b-card>
                    </b-collapse>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
    import {createPost} from "../api/posts";
    import {publishSignature} from "../api/dht";
    import {signClearText} from "../helpers/crypto";
    import {mapGetters} from "vuex";

    export default {
        computed: {
            postContentState() {
                return this.form.postContent.length >= 1;
            },
            signingPassphraseState() {
                return this.form.signingPassphrase.length >= 4;
            },
            postContentInvalid() {
                if (this.form.postContent.length > 1) {
                    return "";
                } else if (this.form.postContent.length > 0) {
                    return "Enter at least 2 characters";
                } else {
                    return "";
                }
            },
            signingPassphraseInvalid() {
                if (this.form.signingPassphrase.length > 4) {
                    return "";
                } else if (this.form.signingPassphrase.length > 0) {
                    return "Enter at least 4 characters";
                } else {
                    return "If you do not provide a passphrase to decrypt your keys, the post will not be verifiable";
                }
            },
            signingPassphraseValid() {
                return this.signingPassphraseState === true
                    ? "Your private key will remain on the client"
                    : "";
            },
            currentSignature() {
                this.generateSignaturePreview();
                return this.signature;
            },
            ...mapGetters(["hasKeypair"])
        },
        methods: {
            generateSignaturePreview() {
                if (this.canGenerateSignature()) {
                    signClearText(
                        this.form.postContent,
                        this.$store.getters.privateKeyArmored,
                        this.form.signingPassphrase
                    )
                        .then(signature => (this.signature = signature))
                        .catch(() => {
                            this.signature = "Failed to generate signature";
                        });
                } else this.signature = "";
            },
            signAndPost(evt) {
                evt.preventDefault();
                if (this.postContentState === true) {
                    if (this.canGenerateSignature()) {
                        signClearText(
                            this.form.postContent,
                            this.$store.getters.privateKeyArmored,
                            this.form.signingPassphrase
                        )
                            .then(publishSignature)
                            .then(dhtResponse => {
                                this.insertedNodes = dhtResponse.nodes;
                                return dhtResponse.key
                            })
                            .then(signatureKey =>
                                createPost(this.form.postContent, signatureKey)
                                    .then(() => {
                                        this.displayConfirmation();
                                    })
                                    .catch(() => this.displayError())
                            )
                            .catch(() => {
                                this.unverifiedPost();
                            });
                    } else {
                        this.unverifiedPost();
                    }
                    this.$emit("closeModal");
                } else {
                    this.displayError('Post content is invalid');
                }

            },
            displayConfirmation() {
                this.$swal.fire({
                    title: "Post Successful",
                    icon: "success",
                    text: `Signature published to ${this.insertedNodes} hash table nodes.`,
                    timer: 4000,
                    confirmButtonText: "Ok"
                });
            },
            displayError(message = '') {
                this.$swal.fire({
                    title: "Failed to Create Post",
                    text: message,
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            },
            unverifiedPost() {
                this.$swal
                    .fire({
                        title: "Confirmation",
                        text:
                            "Could not create a post signature. Creating the post without " +
                            "a signature will prevent others from verifying its integrity.",
                        icon: "question",
                        confirmButtonText: "Post Anyway",
                        showCancelButton: true,
                        cancelButtonText: "Retry"
                    })
                    .then(result => {
                        if (result.value) {
                            createPost(this.form.postContent, null)
                                .then(() => {
                                    this.displayConfirmation();
                                })
                                .catch(() => {
                                    this.displayError();
                                });
                        }
                    });
            },
            canGenerateSignature() {
                return this.signingPassphraseState && this.hasKeypair;
            }
        },
        data() {
            return {
                form: {
                    signingPassphrase: "",
                    postContent: ""
                },
                signature: "",
                insertedNodes: 0
            };
        }
    };
</script>

<style scoped>
    #signing-passphrase-input.is-invalid {
        border-color: orange;
    }
</style>
