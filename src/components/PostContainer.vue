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
                }}</b-col>
            </b-row>
        </div>
        <b-card-text>{{ post.content }}</b-card-text>
        <b-card-sub-title>
            <b-row id>
                <b-col class="text-muted">{{ post.signatureKey }}</b-col>

                <b-col>
                    <b-button
                        class="float-right"
                        v-b-toggle="`post-signature-collapse-${post.id}`"
                        size="sm"
                        variant="outline-success"
                        >Verify</b-button
                    >
                </b-col>
            </b-row>
            <b-collapse class="mt-2" :id="`post-signature-collapse-${post.id}`">
                <b-card class="code-format-card">{{ postSignature }}</b-card>
            </b-collapse>
        </b-card-sub-title>
    </b-card>
</template>

<script>
import { getSingature } from "../api/dht";

export default {
    props: {
        post: Object
    },
    data() {
        return {
            postSignature: "Loading..."
        };
    },
    mounted() {
        getSingature(this.post.signatureKey).then(res => {
            this.postSignature = res.data.value;
        });
    }
};
</script>

<style scoped>
.post-container-card {
    margin-bottom: 10px;
    text-align: left;
}

.post-container-card * {
    padding-bottom: 3px;
}
</style>
