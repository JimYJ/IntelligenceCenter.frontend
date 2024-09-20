<template>
    <el-container class="list-page">
        <el-page-header @back="onBack" style="width: 100%;">
            <template #breadcrumb>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">Intelligence Center</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="./page-header.html">抓取任务</a></el-breadcrumb-item>
                    <el-breadcrumb-item>任务列表</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">任务列表</span>
                    <el-divider direction="vertical" />
                    <el-button type="primary" @click="showCreateTask = true">创建新任务</el-button>
                </div>
            </template>
            <template #extra>
                <div class="flex items-center">
                    <!-- <el-button>翻译</el-button> -->
                    <!-- <el-button type="primary" class="ml-2">刷新</el-button> -->
                    <el-input v-model="input3" placeholder="输入内容搜索" class="input-with-select">
                        <template #append>
                            <el-button :icon="Search" />
                        </template>
                    </el-input>
                </div>
            </template>
            <el-card shadow="never" body-style="background-color: #fcfcfc;">
                <el-row>
                    <el-col :span="6">
                        <el-statistic title="总任务数" :value="268500" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">总任务数</span>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic :value="138" title="正在执行的任务" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">正在执行的任务/总任务</span>
                            </template>
                            <template #suffix>/100</template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="已经抓取的情报" :value="outputValue" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">已经抓取的情报</span>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="已建档案" :value="562" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">已建档案</span>
                            </template>
                        </el-statistic>
                    </el-col>
                </el-row>
            </el-card>
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column prop="date" label="Date" min-width="200" />
                <el-table-column prop="name" label="Name" min-width="200" />
                <el-table-column prop="address" label="Address" min-width="300" />
            </el-table>
            <div class="pagination-block">
                <el-pagination :page-size="12" :pager-count="curPage" layout="prev, pager, next, jumper" :total="1000" />
            </div>
            <CreateTask v-model="showCreateTask" @updateShow="hideCreateTask" />
        </el-page-header>
    </el-container>
</template>

<script setup>
import CreateTask from './CreateTask.vue'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const onBack = () => {
}
const curPage = 11
const showCreateTask = ref(false)
const hideCreateTask = (vision) => {
    showCreateTask.value = vision;
};
import { useTransition } from "@vueuse/core";

const source = ref(0);
const outputValue = useTransition(source, {
    duration: 1500,
});
source.value = 172000;
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
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