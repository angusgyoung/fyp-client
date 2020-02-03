<template>
    <Card class="post-container-card">
        <b-card-title>
            <b-row>
                <b-col>{{ post.username }}</b-col>
                <b-col>
                    {{ post.timestamp | moment('h:mm a · MMM D YYYY') }}
                </b-col>
            </b-row>
        </b-card-title>
        <div class="border-top my-5" />
        <b-card-text>
            {{ post.content }}
        </b-card-text>
        <div class="border-top my-3" />
        <b-card-sub-title>
            <b-row id="">
                <b-col class="text-muted">
                    {{ post.signatureKey }}
                </b-col>

                <b-col>
                    <b-button
                        v-b-toggle="`post-signature-collapse-${post.id}`"
                        size="sm"
                        variant="outline-success"
                        >Verify</b-button
                    >
                </b-col>
            </b-row>
            <b-collapse :id="`post-signature-collapse-${post.id}`">
                <b-card>Loading...</b-card>
            </b-collapse>
        </b-card-sub-title>
    </Card>
</template>

<script>
import Card from './Card.vue';

export default {
    components: {
        Card
    },
    props: {
        post: Object
    }
};
</script>

<style scoped>
.post-container-card {
    margin: 5px;
    text-align: left;
}
</style>
