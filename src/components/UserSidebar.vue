<template>
    <Card :image="'https://picsum.photos/400/400'">
        <b-card-title>{{ currentUser.username }}</b-card-title>
        <b-card-sub-title
            class="text-muted"
        >Account Created {{ currentUser.accountCreatedTimestamp | moment("MMM D YYYY")}}</b-card-sub-title>
        <b-card-body>
            <b-row>
                <b-button
                    class="w-100"
                    variant="outline-primary"
                    v-b-modal.compose-post-modal
                >Create Post</b-button>
            </b-row>
        </b-card-body>
        <ComposePostModal />
    </Card>
</template>

<script>
import Card from "./Card";
import ComposePostModal from "./ComposePostModal";
import { mapGetters } from "vuex";

export default {
    components: {
        Card,
        ComposePostModal
    },
    computed: {
        ...mapGetters(["isLoggedIn", "currentUser"])
    }
};
</script>