<template>
    <el-container class="list-page">
        <el-page-header @back="onBack" style="width: 100%;">
            <template #breadcrumb>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">Intelligence Center</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="./page-header.html">情报档案</a></el-breadcrumb-item>
                    <el-breadcrumb-item>档案列表</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">档案列表</span>
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
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column prop="date" label="档案标题" min-width="200">
                    <el-link type="primary" underline=false>
                        <router-link :to="{ path: '/archive/detail' }">俄乌战争系列</router-link>
                    </el-link>
                </el-table-column>
                <el-table-column prop="name" label="Name" min-width="200" />
                <el-table-column prop="address" label="Address" min-width="300" />
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
const onBack = () => {
}
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
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