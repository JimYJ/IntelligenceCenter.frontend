<template>
  <el-container class="layout-container">
    <el-aside width="210px" class="main-menu">
      <!-- <el-scrollbar> -->
        <!-- <el-menu :default-openeds="['1', '2', '3']"> -->
        <el-menu :router="true">
          <img alt="logo" width="200px" height="46px" src="../assets/logo.png">
          <el-menu-item index="/pet1"><el-icon><List /></el-icon>任务中心</el-menu-item>
          <el-menu-item index="/pet2" :to="{ path: '/sss.html' }"><el-icon><Document /></el-icon>信息中心</el-menu-item>
          <el-menu-item index="/pet3" :to="{ path: '/sss.html' }"><el-icon><Setting /></el-icon>选项</el-menu-item>
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
              <!-- <el-avatar
                class="mr-3"
                :size="32"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              /> -->
              <span class="text-large font-600 mr-3">亚洲金融行业分析</span>
              <span
                class="text-sm mr-2"
                style="color: var(--el-text-color-regular)"
              >
                第十一
              </span>
              <el-tag>金融</el-tag>
              <el-tag>亚洲</el-tag>
            </div>
          </template>
          <template #extra>
            <div class="flex items-center">
              <el-button>翻译</el-button>
              <el-button type="primary" class="ml-2">编辑</el-button>
            </div>
          </template>

          <el-descriptions :column="3" size="small" class="mt-4">
            <el-descriptions-item label="作者">
              JimYJ
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
            部分 I. 编写 WSDL 合同
这部分论述了如何使用 WSDL 定义 Web 服务接口。

第 1 章 WSDL 合同简介
摘要

WSDL 文档使用 Web 服务描述语言和许多可能的扩展来定义服务。文档具有逻辑部分和导引部分。合同摘要部分定义了实施中立数据类型和消息的服务。文档的对比部分定义了实施服务的端点如何与外界交互。

设计服务的建议方法是在编写任何代码前在 WSDL 和 XML Schema 中定义您的服务。在手动编辑 WSDL 文档时，您必须确保文档有效，并且正确。要执行此操作，您必须对 WSDL 有一定的了解。您可以在 W3C 网站 www.w3.org 中找到标准。

1.1. WSDL 文档的结构
概述
WSDL 文档在其最简单的元素中是根 定义 元素中包含的元素集合。这些元素描述了服务以及如何实施该服务的端点。

WSDL 文档有两个不同的部分：

在实施中立条款中定义服务 的逻辑部分
一个 concrete 部分，用于定义如何在网络中公开实施该服务的端点
逻辑部分
WSDL 文档的逻辑部分包含 类型、消息 和 portType 元素。它描述了服务的接口以及服务交换的消息。在 类型 元素中，XML Schema 用于定义组成消息的数据的结构。许多 消息 元素用于定义服务所使用的消息的结构。portType 元素包含一个或多个 操作 元素，用于定义由服务公开的操作发送的消息。

concrete 部分
WSDL 文档中的 concrete 部分包含 绑定 和服务 元素。它描述了实现服务的端点如何连接到外部世界。绑定 元素描述了 消息 元素所描述的数据单元如何映射到 concrete，在线数据格式，如 SOAP。服务 元素包含一个或多个 端口 元素，它们定义实施服务的端点。
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
// const routes=[
//   {
//   path: "/pet1",
//   component :CommonHeader
//  }
// ]

// const handleNav=(path) =>  {
//       // 在这里可以实现路由跳转，例如使用 Vue Router
//   this.$router.push(path);
// }

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