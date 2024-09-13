<template>
  <el-container class="layout-container">
    <el-aside width="210px" class="main-menu">
        <el-menu :router="true">
          <img alt="logo" width="200px" height="46px" src="../assets/logo.png">
          <el-menu-item index="/info/detail"><el-icon><List /></el-icon>任务中心</el-menu-item>
          <el-menu-item index="/pet2"><el-icon><Document /></el-icon>信息中心</el-menu-item>
          <el-menu-item index="/pet3"><el-icon><Setting /></el-icon>选项</el-menu-item>
        </el-menu>
    </el-aside>
    <InfoDetail v-if="$route.path==='/info/detail'"/>
    <el-container class="task-list">
      <el-page-header @back="onBack">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">
            情报中心
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="./page-header.html">信息中心</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>信息详情</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-600 mr-3">任务列表</span>
        </div>
      </template>
      <el-table :data="tableData" >
          <el-table-column prop="date" label="Date" min-width="200" />
          <el-table-column prop="name" label="Name" min-width="200" />
          <el-table-column prop="address" label="Address" min-width="300"/>
      </el-table>
      <div class="example-pagination-block">
        <el-pagination
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
        />
      </div>
    </el-page-header>
    </el-container>
  </el-container>
</template>

<script setup>
import InfoDetail from './InfoDetail.vue'
import { List, Document, Setting } from '@element-plus/icons-vue'
// const onBack = () => {
// }
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style scoped>
.layout-container .el-header {
  /* position: relative; */
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container .el-menu {
  border-right: none;
}
.layout-container .el-main {
  padding: 0;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.layout-container .main-menu  {
  border-right: 1px solid #dcdfe6; /* 设置右边的边框 */
}
.layout-container .task-list ,.info-detail{
  margin-left: 20px;
  margin-top: 17px;
}
.main-menu{
  height: 97vh;
  background-color: #fff !important;
}
.example-pagination-block + .example-pagination-block {
  margin-top: 50px;
}
.example-pagination-block{
  margin-top: 15px;
  margin-left: 80px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 32px;
}
</style>