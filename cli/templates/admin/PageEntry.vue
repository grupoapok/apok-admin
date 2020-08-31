<template>
  <div>
    <p class="title">{{ title | translate }}</p>
    <hr/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: '%MODULE_NAME%',
  data() {
    return {
      title: '',
    };
  },
  methods: {
    updateTitle(val) {
      const { name, params: { id } } = val;
      if (name === '%MODULE_NAME%Edit') {
        if (parseInt(id, 10) === 0) {
          this.title = '%MODULE_NAME%.titles.new';
          return;
        }
        this.title = '%MODULE_NAME%.titles.edit';
        return;
      }
      this.title = '%MODULE_NAME%.titles.list';
    },
  },
  watch: {
    ['$route']: {
      handler: 'updateTitle',
      immediate: true,
    },
  },
};
</script>

<style scoped>
</style>
