<template>
    <b-modal
        id="compose-post-modal"
        ref="compose-post-modal"
        size="lg"
        title="Compose Post"
        :hide-footer="true"
    >
        <ComposePostForm @closeModal="closeModal" />
    </b-modal>
</template>

<script>
import ComposePostForm from "./ComposePostForm";

export default {
    components: {
        ComposePostForm
    },
    methods: {
        closeModal() {
            this.$refs["compose-post-modal"].hide();
        }
    }
};
</script>

<style scoped>
.modal-content {
    -webkit-border-radius: 0px !important;
    -moz-border-radius: 0px !important;
    border-radius: 0px !important;
}
</style>
