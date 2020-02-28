<template>
  <div class="bw">
    <Table border :columns="columns7" :data="data6"></Table>
  </div>
</template>

<script>
// import Tables from '_c/tables'
export default {
  name: 'equipment',
  components: {
    // Tables
  },
  data () {
    return {
      columns: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Email', key: 'email', editable: true },
        { title: 'Create-Time', key: 'createTime' },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '自定义删除')
              ])
            }
          ]
        }
      ],
      tableData: [],
      columns7: [
        {
            title: 'Name',
            key: 'name',
            render: (h, params) => {
                return h('div', [
                    h('Icon', {
                        props: {
                            type: 'person'
                        }
                    }),
                    h('strong', params.row.name)
                ]);
            }
        },
        {
            title: 'Age',
            key: 'age'
        },
        {
            title: 'Address',
            key: 'address'
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.show(params.index)
                            }
                        }
                    }, 'View'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.remove(params.index)
                            }
                        }
                    }, 'Delete')
                ]);
            }
        }
    ],
    data6: [
        {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
        },
        {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
        },
        {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
        },
        {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
        }
    ]
    }
  }
}
</script>
