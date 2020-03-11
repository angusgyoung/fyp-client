<template>
    <b-card class="isys-card" :img-src="currentUser.profileImageUrl">
        <b-card-title>
            <a v-bind:href="`/profile/${currentUser.username}`">{{ currentUser.username }}</a>
        </b-card-title>
        <b-card-sub-title class="text-muted"
            >Account Created
            {{
                currentUser.accountCreatedTimestamp | moment("MMM D YYYY")
            }}</b-card-sub-title
        >
        <b-card-body>
            <b-row>
                <b-button
                    class="w-100"
                    variant="outline-primary"
                    v-b-modal.compose-post-modal
                    >Create Post</b-button
                >
            </b-row>
        </b-card-body>
        <ComposePostModal />
    </b-card>
</template>

<script>
import ComposePostModal from "./ComposePostModal";
import { mapGetters } from "vuex";

export default {
    components: {
        ComposePostModal
    },
    computed: {
        ...mapGetters(["isLoggedIn", "currentUser"])
    }
};
</script>
