<template>
    <b-card class="isys-card" :img-src="user.profileImageUrl">
        <b-card-title>{{ user.username }}</b-card-title>
        <b-card-sub-title class="text-muted"
        >Account Created
            {{ user.accountCreatedTimestamp | moment("MMM D YYYY")}}
        </b-card-sub-title>
    </b-card>
</template>

<script>
    export default {
        name: "UserOverview",
        props: {
            user: Object
        }
    }
</script>

<style scoped>

</style>