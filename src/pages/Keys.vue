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
                        <b-button @click="revokeKeyPair"
                            >Revoke Keypair</b-button
                        >
                    </div>
                    <div v-else>
                        <b-card-title
                            >No Keypair in Application Storage</b-card-title
                        >
                        <b-card-body>
                            To sign posts, you must have a public and private
                            key. Your public key must also be associated with
                            your username in the openpgp keypool. Press generate
                            new keypar to do this for you, or generate your own
                            and paste your public key and encrypted private key
                            below.
                        </b-card-body>
                        <b-button @click="generateNewKeyPair"
                            >Generate new Keypair</b-button
                        >
                    </div>
                </b-card>
            </b-col>
            <b-col>
                <b-card class="isys-card">
                    <b-card class="code-format-card mb-4">
                        <b-card-title>Public Key</b-card-title>
                        <b-card-body class="key-preview" v-if="hasKeys">{{
                            publicKeyArmored
                        }}</b-card-body>
                        <b-card-body v-else>No key</b-card-body>
                    </b-card>

                    <b-card class="code-format-card">
                        <b-card-title>Private Key</b-card-title>
                        <b-card-body class="key-preview" v-if="hasKeys">{{
                            privateKeyArmored
                        }}</b-card-body>
                        <b-card-body v-else>No key</b-card-body>
                    </b-card>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters([
            "currentUser",
            "hasKeypair",
            "publicKeyArmored",
            "privateKeyArmored"
        ]),
        hasKeys() {
            return this.hasKeypair;
        }
    },
    methods: {
        generateNewKeyPair() {
            // hard code key passphrase for now
            return this.$store.dispatch("generateKeypair", {
                user: this.currentUser,
                passphrase: "pass"
            });
        },
        revokeKeyPair() {
            this.$store.dispatch("removeKeypair", { user: this.currentUser });
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