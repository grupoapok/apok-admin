<template>
  <b-container class="d-flex flex-column">
    <b-row class="align-items-center flex-fill">
      <b-col class="text-center">
        <h1>404</h1>
        <p>This isn't the page you're looking for</p>
        <p>
          <icon-button @click="goBack" variant="info" icon="chevron-left">Go Back</icon-button>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import IconButton from '../components/IconButton';

export default {
  name: 'NotFoundPage',
  components: { IconButton },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang='scss'>
.container {
  min-height: 100vh;
}
</style>
