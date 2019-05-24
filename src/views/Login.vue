<template>
    <div id="login-container" class="columns is-mobile is-marginless is-centered">
        <div class="column is-one-quarter-desktop is-full-touch">
            <div class="card">
                <div class="card-content">
                <form @submit.prevent="submit">
                    <b-field>
                        <b-input type="email" v-model="username" placeholder="Username"/>
                    </b-field>
                    <b-field>
                        <b-input type="password" v-model="password" placeholder="Password"/>
                    </b-field>
                    <b-field class="has-text-centered">
                        <b-button type="is-primary" native-type="submit" :loading="loading">Login</b-button>
                    </b-field>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BField from "buefy/src/components/field/Field";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'Login',
        components: { BField },
        data() {
            return {
                username: null,
                password: null
            };
        },
        computed: {
            ...mapState('auth', ['loading']),
            ...mapState('messages', ['fields']),
        },
        methods: {
            ...mapActions('auth', ['doLogin']),
            submit(){
                this.doLogin({
                    username: this.username,
                    password: this.password
                })
            }
        },
    };
</script>

<style lang="scss">
    #login-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
