<template>
  <div>
    <admin-table
      hover
      :create-new-route="{ name: '%MODULE_NAME%New' }"
      :current-page="currentPage"
      :total-pages="totalPages"
      :loading="loading"
      :actions="actions"
      :fields="fields"
      :page-size="pageSize"
      :items="list[currentPage]"
      :order-field="orderBy"
      :filters="filters"
      :filters-fields="filtersFields"
      @onChangePageSize="changePageSize"
      @onPageChanged="loadPage"
      @onEdit="doEdit"
      @onView="doView"
      @onDelete="confirmDelete"
      @toggleOrder="toggleOrder"
      @filtersUpdated="filtersUpdated"
    >
      <!-- Custom cell formatting Example -->
      <!--
      <td slot="email" slot-scope="{ data }">
        <a :href="`mailto:${data.email}`" target="_blank">{{ data.email }}</a>
      </td>
      -->
    </admin-table>

    <b-modal
      :visible="showConfirm"
      :title="$t('dialogs.delete.title')"
      @ok="doDelete"
      @cancel="showConfirm = false"
      @hidden="showConfirm = false"
    >{{ 'dialogs.delete.text' | translate }}</b-modal>
  </div>
</template>

<script>
  import ListMixin from '@/plugins/ListMixin';

  export default {
    mixins: [ListMixin('%VUEX_MODULE%')],
    data() {
      return {
        showConfirm: false,
        idToDelete: null,
        fields: [],
        actions: [
          {
            action: 'Edit',
            text: 'actions.edit',
            props: {
              icon: 'edit',
              variant: 'primary',
            },
          },
          {
            action: 'View',
            text: 'actions.details',
            props: {
              icon: 'search',
              variant: 'success',
            },
          },
          {
            action: 'Delete',
            text: 'actions.delete',
            props: {
              icon: 'trash',
              variant: 'danger',
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
        this.idToDelete = id;
        this.showConfirm = true;
      },
      doDelete() {
        this.deleteItem(this.idToDelete);
        this.idToDelete = null;
        this.showConfirm = false;
      },
    },
  };
</script>

<style scoped>

</style>
