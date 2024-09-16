<template>
    <el-container class="info-detail">
        <div aria-label="A complete example of page header">
            <el-page-header @back="onBack">
                <template #breadcrumb>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">
                            情报中心
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            <a href="./page-header.html">情报档案</a>
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>信息详情</el-breadcrumb-item>
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
                    <!-- <template #extra>
    <el-button type="primary">Operation</el-button>
  </template> -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <user />
                                </el-icon>
                                Username
                            </div>
                        </template>
                        kooriookami
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <iphone />
                                </el-icon>
                                Telephone
                            </div>
                        </template>
                        18100000000
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <location />
                                </el-icon>
                                Place
                            </div>
                        </template>
                        Suzhou
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <tickets />
                                </el-icon>
                                Remarks
                            </div>
                        </template>
                        <el-tag size="small">School</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <office-building />
                                </el-icon>
                                来源网址
                            </div>
                        </template>
                        https://element-plus.org/zh-CN/component/descriptions.html
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
</template>

<script setup>
import { ElNotification as notify } from 'element-plus'
import { ref } from 'vue'
const onBack = () => {
    notify('Back')
}
const size = ref(8)
</script>