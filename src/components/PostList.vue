<template>
    <b-list-group>
        <div
            class="col-md-6 list-group-item"
            v-bind:key="post.id"
            v-for="post in posts"
        >
            <PostContainer v-bind:post="post" />
        </div>
    </b-list-group>
</template>

<script>
import PostContainer from './PostContainer';

export default {
    components: {
        PostContainer
    },
    props: {
        posts: Array
    }
};
</script>
