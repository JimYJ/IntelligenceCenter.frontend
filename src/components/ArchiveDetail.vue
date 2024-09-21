<template>
    <el-container class="info-detail">
        <div aria-label="A complete example of page header">
            <el-page-header @back="onBack">
                <template #breadcrumb>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">Intelligence Center</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/archive/list' }">情报档案</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/archive/document/list' }">档案内容</el-breadcrumb-item>
                        <el-breadcrumb-item>文档详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3">亚洲金融行业分析</span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                            第十一
                        </span>
                        <el-space :size="size" spacer="">
                            <el-tag>金融</el-tag>
                            <el-tag>亚洲</el-tag>
                        </el-space>
                    </div>
                </template>
                <template #extra>
                    <div class="flex items-center">
                        <el-button>翻译</el-button>
                        <el-button type="primary" class="ml-2">编辑</el-button>
                    </div>
                </template>
                <el-descriptions class="margin-top" :column="3" :size="size" border>
                    <el-descriptions-item label="Username"> kooriookami </el-descriptions-item>
                    <el-descriptions-item label="Telephone"> 18100000000 </el-descriptions-item>
                    <el-descriptions-item label="Place"> Suzhou </el-descriptions-item>
                    <el-descriptions-item label="Remarks"> School </el-descriptions-item>
                    <el-descriptions-item label="来源网址"> https://element-plus.org/zh-CN/component/descriptions.html </el-descriptions-item>
                </el-descriptions>
                <el-row>
                    <el-col :span="20">
                        <div class="grid-content ep-bg-purple">
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
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content ep-bg-purple-light">
                            <el-card shadow="never">
                                <template #header>
                                    <div class="card-header">
                                        <span>资源列表</span>
                                    </div>
                                </template>
                                <el-image class="images-list" :key="item" v-for="item in srcList" :preview-src-list="srcList" :src="item" :fit="cover" />
                                <!-- <template #footer>共215个资源</template> -->
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </el-page-header>
        </div>
    </el-container>
</template>
<script setup>
import { ElNotification as notify } from 'element-plus'
import { ref } from 'vue'
const onBack = () => {
    notify('Back')
}
const size = ref(8)

const srcList = [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]

</script>

<style scoped>
.images-list {
    width: 100px;
    height: 100px;
    margin: 5px;
}
</style>
