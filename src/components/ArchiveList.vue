<template>
    <el-container class="list-page">
        <el-page-header @back="onBack" style="width: 100%;">
            <template #breadcrumb>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">Intelligence Center</el-breadcrumb-item>
                    <el-breadcrumb-item>情报档案</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">情报档案列表</span>
                </div>
            </template>
            <template #extra>
                <div class="flex items-center">
                    <!-- <el-button>翻译</el-button> -->
                    <!-- <el-button type="primary" class="ml-2">刷新</el-button> -->
                    <el-input v-model="pageInfo.keyword" placeholder="输入内容搜索档案" class="input-with-select">
                        <template #append>
                            <el-button :icon="Search" @click="getData()" />
                        </template>
                    </el-input>
                </div>
            </template>
            <el-table :data="pageInfo.records" style="width: 100%;">
                <el-table-column prop="archive_name" label="档案标题" min-width="300">
                    <template #default="{ row }">
                        <el-link type="primary" underline=false>
                            <router-link :to="{ path: '/archive/document/list' , query: { id: row.id } }">{{ row.archive_name }}</router-link>
                        </el-link>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="extraction_mode" label="抽取模式" min-width="80">
                    <template #default="{ row }">
                        {{ getMode(row.extraction_mode) }}
                    </template>
                </el-table-column>
                <el-table-column prop="extraction_model" label="抽取模型" min-width="250">
                    <template #default="{ row }">
                        <el-space :size="2" spacer="/" wrap>
                            <el-tag size="small">{{ getApiType(row.api_type) }}</el-tag>
                            <el-tag size="small">{{row.llm_setting_name}}</el-tag>
                            <el-tag size="small">{{row.extraction_model}}</el-tag>
                        </el-space>
                    </template>
                </el-table-column> -->
                <el-table-column prop="file_count" label="文档数" min-width="50" />
                <el-table-column prop="created_at" label="创建时间" min-width="110" />
                <el-table-column prop="updated_at" label="更新时间" min-width="110" />
                <el-table-column prop="" label="操作" min-width="300">
                    <el-button type="primary" plain>重提取内容</el-button>
                    <el-button type="primary" plain>下载档案内所有资源</el-button>
                </el-table-column>
            </el-table>
            <div class="pagination-block">
                <el-pagination :page-size="pageInfo.size" :pager-count="5" :current-page="pageInfo.current" layout="prev, pager, next, jumper" :total="pageInfo.total" @current-change="changePage" />
            </div>
        </el-page-header>
    </el-container>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { post } from '../http';
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

// 翻页
const changePage = (newPage) => {
    pageInfo.value.current = newPage
    pages.current = pageInfo.value.current
    getData()
};
// 获取列表
const getData = () => {
    post("/archive/list", { keyword: pageInfo.value.keyword }, pages).then(res => {
        console.log(res);
        if (res.success) {
            pageInfo.value = res.data
            console.log(res.data)
        } else {
            ElMessage.error('加载列表失败')
        }
    }).catch()
}
getData();
</script>

<style scoped>
.pagination-block {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
a:visited {
    color: var(--el-color-primary-light-1);
    text-decoration-color: #fff !important;
}
</style>