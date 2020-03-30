<template>
    <div>
        <div v-bind:key="post.id" v-for="post in posts">
            <PostContainer v-bind:post="post" />
        </div>
        <infinite-loading @infinite="handleNextPageLoad">
            <div class="post-list-append" slot="no-more">No more posts</div>
            <div class="post-list-append" slot="no-results">There's nothing here</div>
            <div class="post-list-append" slot="error">Something went wrong</div>
        </infinite-loading>
    </div>
</template>

<script>
import PostContainer from "./PostContainer";
import InfiniteLoading from "vue-infinite-loading";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getPosts } from "../api/posts";
import { mapGetters } from "vuex";

const WEBSOCKET_URL =
    process.env.VUE_APP_WEBSOCKET_URL ||
    "http://localhost:8080/api/v1/isys/broker";

export default {
    components: {
        PostContainer,
        InfiniteLoading
    },
    props: {
        username: String,
        subscription: String
    },
    data() {
        return {
            posts: [],
            page: 0,
            stompClient: null
        };
    },
    methods: {
        handleNextPageLoad($state) {
            getPosts(this.page, this.username)
                .then(data => {
                    if (data.content && data.content.length) {
                        this.page += 1;
                        this.posts.push(...data.content);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                })
                .catch(() => $state.error());
        }
    },
    computed: {
        ...mapGetters(["token"])
    },
    mounted() {
        this.stompClient = Stomp.over(() => new SockJS(`${WEBSOCKET_URL}?token=${this.token}`));
        this.stompClient.debug = () => {};

        this.stompClient.connect({}, () => {
            this.stompClient.subscribe(this.subscription, message => {
                this.posts.unshift(JSON.parse(message.body));
            });
        });
    },
    beforeRouteLeave() {
        this.stompClient.disconnect();
    }
};
</script>

<style scoped>
.post-list-append {
    margin-bottom: 4vh;
}
</style>