<template>
    <div>
        <div class="col-md-10" v-bind:key="post.id" v-for="post in posts">
            <PostContainer v-bind:post="post" />
        </div>
    </div>
</template>

<script>
import PostContainer from "./PostContainer";

export default {
    components: {
        PostContainer
    },
    props: {
        posts: Array
    }
};
</script>
