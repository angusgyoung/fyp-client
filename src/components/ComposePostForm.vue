<template>
    <div>
        <b-form-group
            id="post-content-input-fg"
            label="What do you want to say"
            label-for="post-content-input"
            :invalid-feedback="postContentInvalid"
            :state="state"
        >
            <b-form-textarea id="post-content-input" v-model="text" no-resize rows="3"></b-form-textarea>
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
                v-model="signingPassphrase"
                :state="state"
                trim
            ></b-form-input>
        </b-form-group>
    </div>
</template>

<script>
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
    data() {
        return {
            form: {
                signingPassphrase: "",
                postContent: ""
            }
        };
    }
};
</script>

<style scoped>
#signing-passphrase-input.is-invalid {
    border-color: orange;
}
</style>