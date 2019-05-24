<template>
  <div id='loginPage' class='d-flex flex-column flex-fill'>
    <b-container class='d-flex flex-fill flex-column'>
      <b-row align-h='center' align-v='center' class='flex-fill'>
        <b-col>
          <b-card>
            <admin-form
              :form-var="form"
              :form-fields="formFields"
              :errors="fields"
              :loading="loading"
              :show-divider="false"
              :show-cancel="false"
              buttons-alignment="center"
              submit-button="Login"
              submit-button-variant="success"
              :submit-button-icon="null"
              @submit="doLogin(form)"
            ></admin-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminForm from '@/components/AdminForm';

export default {
  name: 'Login',
  components: { AdminForm },
  data() {
    return {
      form: {
        username: 'jose-admin@grupoapok.com',
        password: 'secret',
      },
      formFields: [
        [{
          model: 'username',
          type: 'email',
          props: {
            placeholder: 'Username',
            id: 'username',
          },
          iconLeft: 'user',
        }],
        [{
          model: 'password',
          type: 'password',
          props: {
            placeholder: 'Password',
            class: 'm-t-2',
          },
          iconLeft: 'key',
        }],
      ],
    };
  },
  computed: {
    ...mapState('auth', ['loading']),
    ...mapState('messages', ['fields']),
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
  },
};
</script>

<style scoped lang='scss'>
#loginPage {
  height: 100vh;
  .col {
    max-width: 425px;
  }
}

</style>

<style lang="scss">
svg {
  #paths {
    fill: blue;
  }
}
</style>
