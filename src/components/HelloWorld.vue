<template>
  <el-container class="layout-container">
    <el-aside width="210px" class="main-menu">
      <!-- <el-scrollbar> -->
        <!-- <el-menu :default-openeds="['1', '2', '3']"> -->
        <el-menu>
          <img alt="logo" width="200px" height="46px" src="../assets/logo.png">
          <el-menu-item index="1" :to="{ path: '/sss.html' }"><el-icon><List /></el-icon>任务中心</el-menu-item>
          <el-menu-item index="2" :to="{ path: '/sss.html' }"><el-icon><Document /></el-icon>信息中心</el-menu-item>
          <el-menu-item index="3" :to="{ path: '/sss.html' }"><el-icon><Setting /></el-icon>选项</el-menu-item>
          <!-- <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>任务中心
            </template>
            <el-menu-item index="1-1"><el-icon><List /></el-icon>查看任务</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>档案中心
            </template>
            <el-menu-item index="2-1"><el-icon><List /></el-icon>任务设置</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>选项
            </template>
            <el-menu-item index="3-1"><el-icon><List /></el-icon>任务设置</el-menu-item>
          </el-sub-menu> -->
        </el-menu>
      <!-- </el-scrollbar> -->
    </el-aside>
    <el-container class="page">
      <div aria-label="A complete example of page header">
        <el-page-header @back="onBack">
          <template #breadcrumb>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">
                Intelligence Center
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                <a href="./page-header.html">route 1</a>
              </el-breadcrumb-item>
              <el-breadcrumb-item>route 2</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
          <template #content>
            <div class="flex items-center">
              <el-avatar
                class="mr-3"
                :size="32"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <span class="text-large font-600 mr-3"> Title </span>
              <span
                class="text-sm mr-2"
                style="color: var(--el-text-color-regular)"
              >
                Sub title
              </span>
              <el-tag>Default</el-tag>
            </div>
          </template>
          <template #extra>
            <div class="flex items-center">
              <el-button>Print</el-button>
              <el-button type="primary" class="ml-2">Edit</el-button>
            </div>
          </template>

          <el-descriptions :column="3" size="small" class="mt-4">
            <el-descriptions-item label="Username">
              kooriookami
            </el-descriptions-item>
            <el-descriptions-item label="Telephone">
              18100000000
            </el-descriptions-item>
            <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
            <el-descriptions-item label="Remarks">
              <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Address">
              No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
            </el-descriptions-item>
          </el-descriptions>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
        </el-page-header>
      </div>
    </el-container>
  </el-container>
</template>

<script setup>
import { List, Document, Setting } from '@element-plus/icons-vue'
import { ElNotification as notify } from 'element-plus'
const onBack = () => {
  notify('Back')
}

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
.layout-container .page{
  margin-left: 20px;
}
.main-menu{
  height: 97vh;
  background-color: #fff !important;
}
</style>