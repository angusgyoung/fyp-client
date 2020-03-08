<template>
    <b-container class="my-3">
        <b-row>
            <b-col id="user-sidebar-col" class="col-md-3 my-2">
                <UserSidebar />
            </b-col>
            <b-col class="col-md">
                <PostList :subscription="'/topic/posts'"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import PostList from "../components/PostList";
import UserSidebar from "../components/UserSidebar";

export default {
    components: {
        PostList,
        UserSidebar
    },
};
</script>

<style scoped>
</style>
