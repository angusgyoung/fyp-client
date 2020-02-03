<template>
    <b-card class="isys-card" :img-src="this.image">
        <slot></slot>
    </b-card>
</template>

<script>
export default {
    props: {
        image: String
    }
};
</script>

<style>
.isys-card {
    -webkit-box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.1);
    box-shadow: 5px 5px 5px -1px rgba(0, 0, 0, 0.1);
}
</style>