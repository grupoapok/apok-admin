<template>
  <!-- <b-form @submit.prevent="doSubmit">
    <template v-for="(row, i) in fields">
      <template v-if="row.hasOwnProperty('title') && Array.isArray(row.fields)">
        <h2 :key="`title_${i}`">{{ row.title }}</h2>

        <b-form-row v-for="(rows, k) in row.fields" :key="`rows_${k}`">
          <admin-form-field2
            v-for="(field, j) in rows"
            v-model="example[field.key]"
            :key="`field_${i}_${j}`"
            v-bind="field"
            @clearError="() => clearError(field)"
          />
        </b-form-row>
      </template>

      <b-form-row v-else :key="`row_${i}`">
        <admin-form-field2
          v-for="(field, j) in row"
          v-model="example[field.key]"
          :key="`field_${i}_${j}`"
          v-bind="field"
          @clearError="() => clearError(field)"
        />
      </b-form-row>
    </template>
    <b-button type="submit">Aceptar</b-button>
  </b-form> -->
  <admin-form
    :loading="loading"
    :form-fields="fields"
    :formVar="example"
    :read-only="false"
    @submit="doSubmit"
    @cancel="$router.go(-1)"
  />
</template>

<script>
import fields from "../form.js";
import AdminForm from "@/components/AdminForm";

export default {
  name: "ExampleForm",
  components: { AdminForm },
  data() {
    return {
      loading: false,
      example: {
        field1: "",
        field2: "",
        field3: "",
        field5: "",
        field7: [1, 4]
      },
      fields
    };
  },
  methods: {
    clearError(f) {
      console.log("wtf", f);
      this.$set(f, "error", null);
    },
    doSubmit() {
      this.$set(this.fields[0][0], "error", "Llena esto bien");
      this.$set(this.fields[0][1], "error", "Llena esto bien");
      this.$set(this.fields[0][2], "error", "Llena esto bien");
      this.$set(this.fields[0][3], "error", "Llena esto bien");
      this.$set(this.fields[1][0], "error", "Llena esto bien");
      this.$set(this.fields[1][1], "error", "Llena esto bien");
      this.$set(this.fields[2][0], "error", "Llena esto bien");
      this.$set(this.fields[2][1], "error", "Llena esto bien");
      this.$set(this.fields[3][0], "error", "Llena esto bien");
      this.$set(this.fields[3][1], "error", "Llena esto bien");
    }
  }
};
</script>

<style>
</style>
