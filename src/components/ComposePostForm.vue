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
                id="signing-passphrase-input-fg"
                label="Enter your key decryption password"
                label-for="signing-passphrase-input"
                :invalid-feedback="signingPassphraseInvalid"
                :valid-feedback="signingPassphraseValid"
                :state="signingPassphraseState"
            >
                <b-form-input
                    id="signing-passphrase-input"
                    type="password"
                    v-model="form.signingPassphrase"
                    trim
                ></b-form-input>
            </b-form-group>

            <b-row>
                <b-col>
                    <b-button class="" variant="outline-danger"
                        >Cancel</b-button
                    >
                </b-col>
                <b-col class="col-sm-4">
                    <b-button
                        variant="outline-primary"
                        v-b-toggle="'preview-signature-collapse'"
                        >Preview Signature</b-button
                    >
                    <b-button
                        type="submit"
                        class="float-right"
                        variant="primary"
                        >Post</b-button
                    >
                </b-col>
            </b-row>

            <b-row>
                <b-collapse class="mt-2" id="preview-signature-collapse">
                    <b-card
                        v-if="currentSignature"
                        id="post-signature-preview"
                        class="code-format-card"
                    >
                        {{ currentSignature }}
                    </b-card>
                </b-collapse>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import { createPost } from "../api/posts";
import { publishSignature } from "../api/dht";
import { signClearText } from "../helpers/crypto";

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
        }
    },
    methods: {
        generateSignaturePreview() {
            if (this.signingPassphraseState === true) {
                signClearText(
                    this.form.postContent,
                    this.$store.getters.privateKeyArmored,
                    this.form.signingPassphrase
                ).then(signature => (this.signature = signature));
            } else this.signature = "";
        },
        signAndPost(evt) {
            evt.preventDefault();

            if (this.form.signingPassphrase.length > 0) {
                signClearText(
                    this.form.postContent,
                    this.$store.getters.privateKeyArmored,
                    this.form.signingPassphrase
                )
                    .then(publishSignature)
                    .then(dhtResponse => dhtResponse.key)
                    .then(signatureKey =>
                        createPost(this.form.postContent, signatureKey)
                    );
            } else createPost(this.form.postContent, null);

            this.$emit("closeModal");
        }
    },
    data() {
        return {
            form: {
                signingPassphrase: "",
                postContent: ""
            },
            signature: ""
        };
    }
};
</script>

<style scoped>
#signing-passphrase-input.is-invalid {
    border-color: orange;
}

#post-signature-preview {
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>
