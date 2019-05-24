<template>
  <admin-table
    hover
    :loading="loading"

    :create-route="{ name: '%MODULE_NAME%New' }"
    :current-page="currentPage"
    :total-pages="totalPages"
    :page-size="pageSize"
    @pageChanged="loadPage"

    :items="list[currentPage]"
    :fields="fields"
    :actions="actions"
    @Edit="doEdit"
    @View="doView"
    @Delete="confirmDelete"

    :sort-field="orderBy.field"
    :sort-direction="orderBy.order"
    @sort="updateSortField"

    :filters="filters"
    :filters-fields="filtersFields"
    @filtersUpdated="filtersUpdated"
  >
    <!-- Custom cell formatting Example -->
    <!--
    <template v-slot:email="{ item }">
      <a :href="`mailto:${item.email}`" target="_blank">{{ item.email }}</a>
    </td>
    -->
  </admin-table>
</template>

<script>
  import ListMixin from '@apok/admin/vue/mixins/ListMixin';

  export default {
    mixins: [ListMixin('%VUEX_MODULE%')],
    data() {
      return {
        fields: [],
        actions: [
          {
            action: 'Edit',
            text: 'actions.edit',
            props: {
              icon: 'edit',
              type: 'is-primary',
            },
          },
          {
            action: 'View',
            text: 'actions.details',
            props: {
              icon: 'search',
              type: 'is-success',
            },
          },
          {
            action: 'Delete',
            text: 'actions.delete',
            props: {
              icon: 'trash',
              type: 'is-danger',
            },
          },
        ],
      };
    },
    methods: {
      doEdit(id) {
        this.$router.push({ name: '%MODULE_NAME%Edit', params: { id } });
      },
      doView(id) {
        this.$router.push({ name: '%MODULE_NAME%View', params: { id } });
      },
      confirmDelete(id) {
        this.$dialog.confirm({
          title: 'Confirm Delete',
          message: 'Are you sure you want to <b>delete</b> this record? This action cannot be undone.',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteItem(id)
        })
      },
    },
  };
</script>

<style scoped>

</style>
