<template>
    <el-container class="list-page">
        <el-page-header @back="onBack" style="width: 100%;">
            <template #breadcrumb>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">Intelligence Center</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/archive/list' }">情报档案</el-breadcrumb-item>
                    <el-breadcrumb-item>档案内容</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">档案内容 - 俄乌战争系列</span>
                </div>
            </template>
            <template #extra>
                <div class="flex items-center">
                    <!-- <el-button>翻译</el-button> -->
                    <!-- <el-button type="primary" class="ml-2">刷新</el-button> -->
                    <el-input v-model="input3" placeholder="输入内容搜索档案" class="input-with-select">
                        <template #append>
                            <el-button :icon="Search" />
                        </template>
                    </el-input>
                </div>
            </template>
            <el-descriptions class="margin-top" :column="3" :size="size" border>
                <!-- <template #extra>
    <el-button type="primary">Operation</el-button>
  </template> -->
                <el-descriptions-item label="文档数"> 25146 </el-descriptions-item>
                <el-descriptions-item label="提取模式"> 智能提取 </el-descriptions-item>
                <el-descriptions-item label="提取模型">
                    <el-space :size="8" spacer="/" wrap>
                        <el-tag size="small">OpenAI API</el-tag>
                        <el-tag size="small">我的千问Key2</el-tag>
                        <el-tag size="small">qwen-2.5-7b</el-tag>
                    </el-space>
                </el-descriptions-item>
                <el-descriptions-item label="活跃任务 / 关联任务"> 5 / 15 </el-descriptions-item>
                <el-descriptions-item label="编辑">
                    <el-space :size="8" spacer=" " wrap>
                        <el-button size="small">修改提取方式</el-button>
                        <el-button size="small" type="primary">全部重新提取</el-button>
                        <el-button size="small" type="primary">下载全部资源</el-button>
                    </el-space>
                </el-descriptions-item>
            </el-descriptions>
            <el-table :data="pageInfo.records" style="width: 100%;">
                <el-table-column prop="date" label="档案标题" min-width="400">
                    <template v-slot="scope">
                        <el-link type="primary" underline=false>
                            <router-link type='primary' :to="{ path: '/archive/detail' }" label="tableData.name">{{ scope.row.name }}</router-link>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="Address" min-width="200" />
                <el-table-column prop="count" label="文档数" min-width="80" />
                <el-table-column prop="" label="操作" min-width="300">
                    <el-button type="primary" plain>重抽取</el-button>
                    <el-button type="primary" plain>下载文档内所有资源</el-button>
                </el-table-column>
            </el-table>
            <div class="pagination-block">
                <el-pagination :page-size="12" :pager-count="curPage" layout="prev, pager, next, jumper" :total="1000" />
            </div>
        </el-page-header>
    </el-container>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { post } from '../http'
import { useRoute } from 'vue-router';
const onBack = () => {
}
const route = useRoute();
const id = route.query.id;
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
    id: id,
}
// 获取列表
const getData = (keyword) => {
    console.log(keyword)
    pageInfo.value.keyword = keyword
    post("/archive/doc/list", keyword, pages).then(res => {
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
