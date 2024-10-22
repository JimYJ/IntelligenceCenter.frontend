<template>
    <el-container class="list-page">
        <el-page-header @back="onBack" style="width: 100%;">
            <template #breadcrumb>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">Intelligence Center</el-breadcrumb-item>
                    <!-- <el-breadcrumb-item><a href="./page-header.html">情报档案</a></el-breadcrumb-item> -->
                    <el-breadcrumb-item>LLM API配置表</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">LLM API配置列表</span>
                    <el-divider direction="vertical" />
                    <el-button type="primary" @click="showCreateAPI = true">增加LLM API配置</el-button>
                </div>
            </template>
            <template #extra>
                <div class="flex items-center">
                    <!-- <el-button>翻译</el-button> -->
                    <el-input v-model="input3" placeholder="输入内容搜索" class="input-with-select">
                        <template #append>
                            <el-button :icon="Search" />
                        </template>
                    </el-input>
                    <!-- <el-button type="primary" class="ml-2">刷新</el-button> -->
                </div>
            </template>
            <el-table :data="pageInfo.records" style="width: 100%;">
                <el-table-column prop="api_type" label="API类型" min-width="200">
                    <template #default="{ row }">
                        {{ getApiType(row.api_type) }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="API配置名称" min-width="200" />
                <el-table-column prop="api_url" label="API地址" min-width="400" />
                <el-table-column prop="api_key" label="API秘钥" min-width="200" />
                <el-table-column prop="timeout" label="请求超时时间(秒)" min-width="200" />
                <el-table-column prop="request_rate_limit" label="并发限制(秒)" min-width="200" />
                <el-table-column prop="remark" label="备注" min-width="200" />
            </el-table>
            <div class="pagination-block">
                <el-pagination :page-size="pageInfo.size" :pager-count="pageInfo.current" layout="prev, pager, next, jumper" :total="pageInfo.total" @current-change="changePage" />
            </div>
            <CreateAPISetup v-model="showCreateAPI" @updateShow="hideCreateAPI" />
        </el-page-header>
    </el-container>
</template>

<script setup>
import CreateAPISetup from './CreateAPISetup.vue'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { post } from '../http'; // 导入封装的函数
const onBack = () => {
}
let pageInfo = ref({
    keyword: "",
    current: 1,
    total: 0,
    pages: 1,
    size: 20,
    records: [],
})
let pages = {
    current: 1,
    size: 20,
}


const statusMapping = {
    [1]: 'OpenAI API',
    [2]: 'Ollama API',
};
// 计算属性或方法用于获取 API 类型
const getApiType = (apiType) => {
    return statusMapping[apiType] || '未知类型'; // 如果找不到类型则返回默认值
};
const showCreateAPI = ref(false)
const hideCreateAPI = (vision) => {
    showCreateAPI.value = vision;
};

const changePage = (newPage) => {
    console.log(newPage)
    pageInfo.value.current = newPage
    console.log(pageInfo.value.current)
    pages.current = pageInfo.value.current
    getData(pageInfo.value.keyword, pages)
};

const getData = (keyword) => {
    console.log(keyword)
    pageInfo.value.keyword = keyword
    post("/llm/list", keyword, pages).then(res => {
        console.log(res);
        if (res.success) {
            pageInfo.value = res.data
            console.log(res.data)
        } else {
            // that.$message.error('登录失败')
        }
    }).catch()
}
getData()

</script>

<style scoped>
.pagination-block {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>