<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">查询 和按钮操作区域</div>
     <a-table  ref="table"  bordered  size="middle" :columns="columns"
               :dataSource="dataSource" :pagination="pagination"
     ></a-table>
  </a-card>
</template>
<script>
const columns=[
    /*{
      title: '#',
      dataIndex: '',
      key:'rowIndex',
      width:60,
      align:"center",
      customRender:function (t,r,index) {
        return parseInt(index)+1;
      }
    },*/
    {
        title: '用户账号',
        align:"center",
        dataIndex: 'username',
        fixed:'left',
        width:200
    },
    {
        title: '真实姓名',
        align:"center",
        dataIndex: 'realName',
    },
    {
        title: '头像',
        align:"center",
        dataIndex: 'avatar',
        scopedSlots:{customRender:"avatarslot"}
    },

    {
        title: '性别',
        align:"center",
        dataIndex: 'sex',
        customRender:function (text) {
        if(text==0){
        return "男";
    }else if(text==1){
    return "女";
}else{
    return text;
}
}
},
{
    title: '手机号码',
        align:"center",
    dataIndex: 'phone'
},
{
    title: '邮箱',
        align:"center",
    dataIndex: 'email'
},
{
    title: '状态',
        align:"center",
    dataIndex: 'enableTag',
    customRender:function (text) {
    if(text==0){
        return "正常";
    }else if(text==9){
        return "冻结";
    }else{
        return text;
    }
}
},
{
    title: '创建时间',
        align:"center",
    dataIndex: 'createTime',
    sorter:true
},
{
    title: '操作',
        dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    fixed:"right",
        align:"center",
    width:150
}
]

import { fetchAction } from '@/api/user'
export default {
  data () {
    return {
        dataSource:[],
        pagination: {
          //  current: 1,
          //  pageSize: 10,
            pageSizeOptions: ['10', '20', '30'],
            showTotal: (total, range) => {
                return range[0] + "-" + range[1] + " 共" + total + "条"
            }
        },
        loading: false,
      search: '',
      columns,
    }
  },
  watch: {
    //监听数据的变化，数据有变化时刷新列表 // 监视pagination属性的变化
    pagination: {
      deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
      handler () {
        // 变化后的回调函数，这里我们再次调用getDataFromServer即可
        console.log("有变化")
        this.fetch();
      }
    }
  },
    created() {
        this.loadData();
    },
  methods: {
      loadData () {
        fetchAction({
            key: this.search, // 搜索条件
            page: this.pagination.current, // 当前页
            rows: this.pagination.pageSize, // 每页大小
            //sortBy: this.pagination.sortBy, // 排序字段
            //desc: this.pagination.desc // 是否降序
      }).then(resp =>{
            console.log("dataSource:",resp)
           this.dataSource = resp.data.records
            this.pagination.total= resp.total

      })
    }
  }
}
</script>
