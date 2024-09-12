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
  </el-container>
</template>

<script setup>
import InfoDetail from './InfoDetail.vue'
import { List, Document, Setting } from '@element-plus/icons-vue'
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
.layout-container .info-detail{
  margin-left: 20px;
  margin-top: 17px;
}
.main-menu{
  height: 97vh;
  background-color: #fff !important;
}
</style>