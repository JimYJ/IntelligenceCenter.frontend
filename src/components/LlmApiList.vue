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
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column prop="api_type" label="API类型" min-width="200" />
                <el-table-column prop="api_set_name" label="API配置名称" min-width="200" />
                <el-table-column prop="api_url" label="API地址" min-width="400" />
                <el-table-column prop="api_secret" label="API秘钥" min-width="200" />
            </el-table>
            <div class="pagination-block">
                <el-pagination :page-size="12" :pager-count="curPage" layout="prev, pager, next, jumper" :total="1000" />
            </div>
            <CreateAPISetup v-model="showCreateAPI" @updateShow="hideCreateAPI" />
        </el-page-header>
    </el-container>
</template>

<script setup>
import CreateAPISetup from './CreateAPISetup.vue'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const onBack = () => {
}
const curPage = 11
const showCreateAPI = ref(false)
const hideCreateAPI = (vision) => {
    showCreateAPI.value = vision;
};
const tableData = [
    {
        api_type: 'OpenAI API',
        api_set_name: 'OpenAIKey1',
        api_url: 'https://api.openai.com/v1/chat/completions',
        api_secret: 'PI&*GYTEWSG*4ya0pe4rg',
    },
]
</script>

<style scoped>
.pagination-block {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>