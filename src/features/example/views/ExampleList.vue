<template>
  <admin-table
    hover
    :create-new-route="{ name: 'ExampleNew' }"
    :current-page="1"
    :total-pages="1"
    :actions="actions"
    :fields="fields"
    :page-size="10"
    :items="list[1]"
    :filters="filters"
    :filters-fields="filtersFields"
    @onEdit="doEdit"
    @filtersUpdated="filtersUpdated"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AdminTable from '@/components/AdminTable'
export default {
    name: 'ExampleList',
  components: {AdminTable},
    data(){
        return {
          filters: {
            filter1: null,
          },
          filtersFields: [
            {
              model: 'filter1',
            },
            {
              model: 'filter2',
              type: 'select',
              props: {
                options: [
                  { value: 1, text: 'Filter 1'},
                  { value: 2, text: 'Filter 2'},
                  { value: 3, text: 'Filter 3'},
                  { value: 4, text: 'Filter 4'},
                ]
              }
            },
            {
              placeholder: 'Filter 3',
              model: 'filter3',
              class: 'col-sm-6'
            }
          ],
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
              action: 'XXX',
              text: 'Conditional',
              condition: {
                operator: '=',
                field: 'age',
                value: 35
              },
              props: {
                icon: 'pencil',
                variant: 'warning'
              }
            }
          ],
          list: {
            1: [
              { name: 'Jose', age: 36},
              { name: 'Jose', age: 36},
              { name: 'Jose', age: 35},
              { name: 'Jose', age: 36},
              { name: 'Jose', age: 36},
              { name: 'Jose', age: 36},
            ]
          }
        }
    },
    computed: {
        ...mapState('example',['result1','result2']),
    },
    methods: {
        ...mapActions('example',['action1','action1GQL','action2']),
      filtersUpdated(){
          console.log(this.filters)
      },
        doEdit(){
          this.$router.push({name: 'ExampleForm'})
        },
        doAction1(){
            this.action1().then(this.doAction2).catch(console.log)
        },
        doAction1GQL(){
            this.action1GQL().then(this.doAction2).catch(console.log)
        },
        doAction2(){
            this.action2(this.val);
        }
    },
}
</script>

<style>

</style>
