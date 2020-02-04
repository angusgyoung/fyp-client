<template>
    <div>
        <b-form @submit.prevent="signAndPost">
            <b-form-group
                id="post-content-input-fg"
                label="What do you want to say"
                label-for="post-content-input"
                :invalid-feedback="postContentInvalid"
                :state="state"
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
                :state="state"
            >
                <b-form-input
                    id="signing-passphrase-input"
                    type="password"
                    v-model="form.signingPassphrase"
                    :state="state"
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
                        @click="previewSignature"
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
                    <div>
                        {{ this.signature }}
                    </div>
                </b-collapse>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import { signClearText } from "../helpers/crypto";
import { createPost } from "../api/posts";
import { publishSignature } from "../api/dht";

export default {
    computed: {
        state() {
            return (
                this.form.signingPassphrase.length >= 4 &&
                this.form.postContent.length >= 1
            );
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
            return this.state === true
                ? "Your private key will remain on the client"
                : "";
        }
    },
    methods: {
        previewSignature(evt) {
            evt.preventDefault();

            signClearText(
                this.form.postContent,
                this.form.signingPassphrase
            ).then(signature => (this.signature = signature));
        },
        async signAndPost(evt) {
            evt.preventDefault();

            let signatureKey;

            if (this.form.signingPassphrase.length > 0) {
                await signClearText(
                    this.form.postContent,
                    this.form.signingPassphrase
                )
                    .then(signature => (this.signature = signature))
                    .then(publishSignature)
                    .then(key => (signatureKey = key));
            }

            createPost(this.form.postContent, signatureKey);
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
</style>
