<template>
    <b-container id="LoginForm">
        <b-row>
            <b-col class="col-md-4 offset-md-4">
                <b-form @submit.prevent="login" @reset="onReset" v-if="show">
                    <b-form-group
                        id="input-group-1"
                        label="Email address:"
                        label-for="input-1"
                    >
                        <b-form-input
                            id="input-1"
                            v-model="form.username"
                            type="email"
                            required
                            placeholder="Enter email"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-group-2"
                        label="Password:"
                        label-for="input-2"
                    >
                        <b-form-input
                            id="input-2"
                            v-model="form.password"
                            type="password"
                            required
                            placeholder="Enter password"
                        ></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Login</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            show: true
        };
    },
    methods: {
        onReset(evt) {
            evt.preventDefault();
            // Reset our form values
            this.form.username = "";
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },
        login() {
            this.$store
                .dispatch("login", this.form)
                .then(() => this.$router.push("/"))
                .catch(() => this.$router.push("/error"));
        }
    }
};
</script>

<style scoped>
#LoginForm {
    margin-top: 10px;
}
</style>
