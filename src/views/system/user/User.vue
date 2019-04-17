<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">查询</div>
     <a-table :columns="columns" :dataSource="data" :pagination="pagination"></a-table>
  </a-card>
</template>
<script>
const columns = [{
  title: '登陆名',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' },
}, {
  title: '真名',
  dataIndex: 'gender',
  width: '20%',
}, {
  title: '性别',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}]
import { fetchAction } from '@/api/user'
export default {
  data () {
    return {
      data: [],
      pagination: {},
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
  methods: {
    fetch () {
      fetchAction({
        key: this.search, // 搜索条件
        page: this.pagination.current, // 当前页
        rows: this.pagination.pageSize, // 每页大小
        sortBy: this.pagination.sortBy, // 排序字段
        desc: this.pagination.desc // 是否降序
      }).then(resp => console.log(resp))
    }
  }
}
</script>
