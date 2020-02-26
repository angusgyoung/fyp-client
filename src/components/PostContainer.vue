<template>
    <b-card class="post-container-card isys-card">
        <div>
            <b-row>
                <b-col>
                    <a v-bind:href="`/profile/${post.username}`">{{
                        post.username
                        }}</a>
                </b-col>
                <b-col class="text-right text-muted">{{
                    post.timestamp | moment("h:mm a · MMM D YYYY")
                    }}
                </b-col>
            </b-row>
        </div>
        <b-card-text>{{ post.content }}</b-card-text>
        <b-card-sub-title>
            <b-row id>
                <b-col class="text-muted">{{ post.signatureKey }}</b-col>

                <b-col>
                    <div
                            class="float-right"
                            v-on:click="toggleVerificationCollapse"
                            size="sm"
                    >
                        <font-awesome-icon class="icon-success" v-if="verificationSuccess"
                                           :icon="['far', 'check-circle']" size="lg"/>
                        <img class="icon-pending" v-if="verificationPending" src="../assets/img/loading.svg">
                        <font-awesome-icon class="icon-failed" v-if="verificationFailed"
                                           :icon="['fas', 'exclamation-circle']" size="lg"/>
                    </div>
                </b-col>
            </b-row>
            <b-collapse class="mt-2" :id="`post-signature-collapse-${post.id}`">
                <p>{{ verificationStateMessage }}</p>
                <b-card class="code-format-card">{{ postSignature }}</b-card>
            </b-collapse>
        </b-card-sub-title>
    </b-card>
</template>

<script>
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faCheckCircle} from '@fortawesome/free-regular-svg-icons'
    import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
    import {getSingature} from "../api/dht";
    import {getPublicKeyForEmail} from "../api/pks";
    import {verifyClearText} from "../helpers/crypto";

    library.add(faCheckCircle, faExclamationCircle);

    export default {
        props: {
            post: Object
        },
        data() {
            return {
                postSignature: "Loading...",
                verificationStateMessage: "Verifying signature against public key...",
                verificationState: "pending"
            };
        },
        methods: {
            toggleVerificationCollapse() {
                this.$root.$emit('bv::toggle::collapse', `post-signature-collapse-${this.post.id}`);
            }
        },
        computed: {
            verificationSuccess() {
                return this.verificationState === "success"
            },
            verificationPending() {
                return this.verificationState === "pending"
            },
            verificationFailed() {
                return this.verificationState === "failed"
            }
        },
        mounted() {
            getSingature(this.post.signatureKey).then(res => {
                this.postSignature = res.data.value;
            });

            getPublicKeyForEmail(this.post.username)
                .then(publicKey => {
                    verifyClearText(this.post.content, this.postSignature, publicKey)
                        .then(valid => {
                            if (valid) {
                                this.verificationStateMessage = "Verified";
                                this.verificationState = "success";
                            } else {
                                this.verificationStateMessage = "Unverified";
                                this.verificationState = "failed";
                            }
                        }).catch(err => {
                        console.error(err);
                        this.verificationStateMessage = `Verification Failed: ${err.message}`;
                        this.verificationState = "failed";
                    });
                }).catch(err => {
                this.verificationStateMessage = `Failed to retrieve public key: ${err.message}`;
                this.verificationState = "failed";
            });
        }
    };
</script>

<style scoped>
    .btn {
        border: none;
    }

    .post-container-card {
        margin-bottom: 10px;
        text-align: left;
    }

    .post-container-card * {
        padding-bottom: 3px;
    }

    .icon-success {
        color: #28a745
    }

    .icon-pending {
        width: 1.33em;
        color: #fd7e14;
    }

    .icon-failed {
        color: #dc3545;
    }
</style>
