<template>
  <div class="bw">
    <div class="search-form">
      <Form ref="searchForm" :model="searchForm" :label-width="100">
        <Row :gutter='16'>
          <Col :span='7'>
            <FormItem prop="companyName" label='烟感企业名称'>
              <Select clearable filterable transfer v-model="searchForm.companyName" @on-change="getDeviceName">
                <Option v-for="(item,index) in companySelects" :value="item.value" :key='index'> {{ item.label }} </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span='7'>
            <FormItem prop="deviceName" label='烟感设备名称'>
              <Select clearable filterable transfer v-model="searchForm.deviceName">
                <Option v-for="(item,index) in deviceSelects" :value="item.value" :key='index'> {{ item.label }} </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span='7'>
            <FormItem prop="warnTime" label='报警时间'>
              <DatePicker v-model="searchForm.startCallTime" type="date" placeholder="请选择"></DatePicker>
            </FormItem>
          </Col>
          <Col :span='2' :offset='1'>
            <Button type="primary" @click="handleSearch()">查  询</Button>
          </Col>
          <!-- <Col :span='2'>
            <Button type="primary" @click="showModal('addModal')">新  增</Button>
          </Col> -->
        </Row>
      </Form>
    </div>
    <Table border stripe :columns="columns" :data="tableData"></Table>
    <Page class="page" :total="page.total" :current="page.page" :page-size="page.size" @on-change="changePage" @on-page-size-change="changePageSize" show-total show-elevator show-sizer transfer/>

    <!-- <Modal v-model="addModal" title="新增" :loading="loading" @on-ok="handleAdd" :width='320'>
      <Form ref="addForm" :model="addForm" :label-width="80" :rules='addRules'>
        <Row>
          <Col :span='24'>
            <FormItem prop="companyName" label='企业名称'>
              <Select clearable filterable transfer v-model="addForm.companyName">
                <Option v-for="(item,index) in companySelects" :value="item.value" :key='index'> {{ item.label }} </Option>
              </Select>
            </FormItem>
            <FormItem prop="deviceName" label='设备名称'>
              <Input v-model="addForm.deviceName" :maxlength='20'></Input>
            </FormItem>
            <FormItem prop="address" label='安装地址'>
              <Input v-model="addForm.address" :maxlength='20'></Input>
            </FormItem>
            <FormItem prop="describe" label='备注'>
              <Input v-model="addForm.describe" :maxlength='100' type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>

    <Modal v-model="editModal" title="修改" :loading="loading" @on-ok="handleEdit" :width='320'>
      <Form ref="editForm" :model="editForm" :label-width="80" :rules='addRules'>
        <Row>
          <Col :span='24'>
            <FormItem prop="companyName" label='企业名称'>
              <Select clearable filterable transfer v-model="editForm.companyName">
                <Option v-for="(item,index) in companySelects" :value="item.value" :key='index'> {{ item.label }} </Option>
              </Select>
            </FormItem>
            <FormItem prop="deviceName" label='设备名称'>
              <Input v-model="editForm.deviceName" :maxlength='20'></Input>
            </FormItem>
            <FormItem prop="address" label='企业地址'>
              <Input v-model="editForm.address" :maxlength='20'></Input>
            </FormItem>
            <FormItem prop="describe" label='备注'>
              <Input v-model="editForm.describe" :maxlength='100' type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal> -->

  </div>
</template>

<script>
import { getCompany } from '@/api/company.js'
import { getDevice } from '@/api/device.js'
import { getData } from '@/api/history.js'
import { mapMutations } from 'vuex'
export default {
  name: 'history_page',
  components: {
    // Tables
  },
  data () {
    return {
      loading: false,
      addModal: false,
      editModal: false,
      deleteModal: false,

      searchForm: {
        companyName:'',
        deviceName:''
      },
      addForm: {
        deviceName:''
      },
      editForm: {
        deviceName:''
      },
      addRules: {
        deviceName: [
          { required: true, message: '此项必填', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '此项必选', trigger: 'change' }
        ],
        address: [
          { required: true, message: '此项必填', trigger: 'blur' }
        ],
        describe: [
          { type: 'string', max: 100, message: '最多100个字', trigger: 'blur' }
        ]
      },
      companySelects: [],
      deviceSelects: [],
      page: {
        total: 0,
        page: 1,
        size: 10
      },
      tableData: [
        // {companyCode:"111",companyName:"aaa",address:"gaoxingqu",describe:"sdhfsd发射点发射点发射点发射点出现在此次fkjsfhk",createTime:"2020/20/20 38:34:12"}
      ],
      columns: [
        {
            title: '序号',
            type: 'index',
            width: 64
        },
        {
            title: '设备编号',
            key: 'deviceCode',
            tooltip: true
        },
        {
            title: '设备名称',
            key: 'deviceName',
            tooltip: true
        },
        {
            title: '所属企业',
            key: 'companyName',
            tooltip: true
        },
        {
            title: '报警设备地址',
            key: 'reservedStr2',
            tooltip: true
        },
        {
            title: '报警时间',
            key: 'startCallTime',
            tooltip: true,
            minWidth: 60
        },
        {
            title: '报警内容',
            key: 'reservedStr1',
            tooltip: true
        },
        // {
        //     title: '操作',
        //     key: '',
        //     width: 170,
        //     align: 'left',
        //     render: (h, params) => {
        //         return h('div', [
        //             h('Button', {
        //                 props: {
        //                     type: 'primary',
        //                     size: 'small'
        //                 },
        //                 style: {
        //                     marginRight: '5px'
        //                 },
        //                 on: {
        //                     click: () => {
        //                       this.showModal('editModal',params.row)
        //                     }
        //                 }
        //             }, '修改'),
        //             h('Button', {
        //                 props: {
        //                     type: 'error',
        //                     size: 'small'
        //                 },
        //                 on: {
        //                     click: () => {
        //                       this.showModal('deleteModal', params.row)
        //                     }
        //                 }
        //             }, '删除')
        //         ]);
        //     }
        // }
      ]
    }
  },
  created() {
    //
  },
  mounted() {
    getCompany().then( res => {
      let data = res.data
      this.companySelects = data.data
    })
    this.getDeviceName()
    this.handleSearch()
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    }
  },
  methods: {
    ...mapMutations(['addTag','closeTag']),
    handleSearch() {
      this.$refs['searchForm'].validate((valid) => {
          if (valid) {
            getData(Object.assign({
              page: this.page.page,
              limit: this.page.size
            }, this.searchForm)).then( res =>{
              this.page.total = res.data.count
              this.tableData = res.data.data
            })
          } else {
            this.$Message.error('请正确填写表单!');
          }
      })
    },
    getDeviceName(name) {
      let params = {
        companyName: name || ''
      }
      getDevice(params).then( res => {
        this.searchForm.deviceName = ''
        let data = res.data
        this.deviceSelects = data.data
      })
    },
    handleAdd() {
      this.$refs['addForm'].validate((valid) => {
          if (valid) {
            addObj(Object.assign({}, this.addForm)).then( res =>{
              this.$Message.success('操作成功!');
              this.handleSearch()
            })
          } else {
            this.$Message.error('请正确填写表单!');
          }
      })
    },
    handleEdit() {
      this.$refs['editForm'].validate((valid) => {
          if (valid) {
            updateObj(Object.assign({}, this.editForm)).then( res =>{
              this.$Message.success('操作成功!');
              this.handleSearch()
            })
          } else {
            this.$Message.error('请正确填写表单!');
          }
      })
    },
    handleDelete(id) {
      delObj(id).then( res =>{
        this.$Message.success('操作成功!');
        this.handleSearch()
      })
    },
    showModal(name,data) {
      switch(name) {
        case 'addModal':
            this.addForm = []
            break;
        case 'editModal':
            this.editForm = JSON.parse(JSON.stringify(data))
            break;
        case 'deleteModal':
            this.$Modal.confirm({
              title: '删除',
              content: `<p>您将要删除设备 <i>${data.deviceName}</i>,请谨慎操作！</p>`,
              onOk: () => {
                  this.handleDelete(data.deviceCode)
              },
              onCancel: () => {
                  this.deleteModal = false
              }
            });
            break;
        default:
            ''
      }
      this[name] = true
    },
    goTo(data) {
      if (this.tagNavList.find(item => item.name === 'device_page')) {
        // console.log("aaaaaaaaaaaaaaaa")
        this.closeTag({
          name: 'device_page'
        })
      }
      this.$router.push({name:'device_page',params:data})
    },
    changePage(page) {
      this.page.page = page
      this.handleSearch()
    },
    changePageSize(size) {
      this.page.size = size
      this.handleSearch()
    }
  }
}
</script>
