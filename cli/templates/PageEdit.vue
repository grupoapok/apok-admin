<template>
  <form-rendered
    :loading="loading"
    :fields="fields"
    :form-var="%CRUD_OBJECT_VAR%"
    :readonly="readonly"
    @submit="doSubmit"
    @cancel="goBack"
  />
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import ValidationError from '@apok/admin/vue/plugins/network/ValidationError'

  import fields from '../form';

  export default {
    name: '%MODULE_NAME%Edit',
    data() {
      return {
        fields,
        %CRUD_OBJECT_VAR%: {},
      };
    },
    props: {
      readonly: {
        type: Boolean,
        default: false,
      },
      id: String,
    },
    computed: {
      ...mapState('%VUEX_MODULE%', ['loading', 'currentItem']),
    },
    watch: {
      currentItem: {
        handler: 'updateCurrentItem',
        immediate: true
      },
    },
    methods: {
      ...mapActions('%VUEX_MODULE%', ['getItem', 'resetItem', 'saveItem']),
      ...mapActions('messages', ['setFields','resetFields']),
      updateCurrentItem(newVal){
        this.%CRUD_OBJECT_VAR% = { ...newVal };
      },
      goBack() {
        this.resetFields();
        this.resetItem();
        this.$router.push({ name: '%MODULE_NAME%List' });
      },
      doSubmit() {
        this.resetFields();
        this.saveItem(this.%CRUD_OBJECT_VAR%)
          .then(this.goBack)
          .catch((e) => {
            if (e instanceof ValidationError) {
              this.setFields(e.fields)
            }
          });
      },
    },
    mounted() {
      if (parseInt(this.id, 10) !== 0 && !this.currentItem.id) {
        this.getItem(this.id);
      }
      if (this.currentItem.id && this.currentItem.id !== this.%CRUD_OBJECT_VAR%.id) {
        this.updateCurrentItem(this.currentItem);
      }
    },
  };
</script>

<style scoped>

</style>
