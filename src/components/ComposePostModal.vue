<template>
    <b-modal id="compose-post-modal" size="lg" title="Compose Post">
        <ComposePostForm />
    </b-modal>
</template>

<script>
import ComposePostForm from "./ComposePostForm";

export default {
    components: {
        ComposePostForm
    }
};
</script>