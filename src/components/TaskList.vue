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
                    <el-input v-model="pageInfo.keyword" placeholder="输入内容搜索任务" class="input-with-select">
                        <template #append>
                            <el-button :icon="Search" @click="getData()" />
                        </template>
                    </el-input>
                </div>
            </template>
            <el-card shadow="never" body-style="background-color: #fcfcfc;">
                <el-row>
                    <el-col :span="6">
                        <el-statistic :value="taskInfo.active_task_count" title="正在执行的任务" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">正在执行的任务/总任务</span>
                            </template>
                            <template #suffix>/{{taskInfo.task_count}}</template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="已经抓取的情报" :value="taskInfo.archive_docs_count" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">已经抓取的情报</span>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="已建档案" :value="taskInfo.archive_count" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">已建档案</span>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="文档资源数" :value="taskInfo.archive_docs_res_count" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">文档资源数</span>
                            </template>
                        </el-statistic>
                    </el-col>
                </el-row>
            </el-card>
            <el-table :data="pageInfo.records" style="width: 100%;">
                <el-table-column prop="task_name" label="任务名称" min-width="200" />
                <el-table-column prop="archive_name" label="归属档案" min-width="200" />
                <el-table-column prop="task_ststus" label="任务状态" min-width="80">
                    <template #default="{ row }">
                        <el-tag size="small" :type="row.task_status ? 'success' : 'warning'">{{ showStatus(row.task_status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="task_ststus" label="执行时间" min-width="200">
                    <template #default="{ row }">
                        <el-tag size="small" type="primary">{{ showCycleType(row.exec_type,row.cycle_type,row.week_days,row.exec_time) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="task_ststus" label="抓取模式" min-width="80">
                    <template #default="{ row }">
                        <el-tag size="small" type="primary">{{ showCrawlMode(row.crawl_mode) }}</el-tag>

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
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间" min-width="80" />
                <el-table-column prop="updated_at" label="更新时间" min-width="80" />
            </el-table>
            <div class="pagination-block">
                <el-pagination :page-size="pageInfo.size" :pager-count="5" :current-page="pageInfo.current" layout="prev, pager, next, jumper" :total="pageInfo.total" @current-change="changePage" />
            </div>
            <CreateTask v-model="showCreateTask" @updateShow="hideCreateTask" />
        </el-page-header>
    </el-container>
</template>

<script setup>
import CreateTask from './CreateTask.vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
// import { useTransition } from "@vueuse/core";
import { post, get } from '../http';
const onBack = () => {
    window.history.back();
}
const showCreateTask = ref(false)
const hideCreateTask = (vision) => {
    showCreateTask.value = vision;
};
const taskInfo = ref({
    archive_count: 0,
    archive_docs_count: 0,
    archive_docs_res_count: 0,
    task_count: 0,
    active_task_count: 0,
});
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
    pageInfo.value.current = newPage;
    pages.current = pageInfo.value.current;
    getData();
};
// 获取数据
const getData = () => {
    post("/task/list", { keyword: pageInfo.value.keyword }, pages).then(res => {
        // console.log(res);
        if (res.success) {
            pageInfo.value = res.data
        } else {
            ElMessage.error('加载任务列表失败')
        }
    }).catch();
    get("/task/info").then(res => {
        // console.log(res);
        if (res.success) {
            taskInfo.value = res.data
        } else {
            ElMessage.error('加载任务信息失败')
        }
    }).catch();
}
getData();

const apiTypeMapping = {
    [1]: 'OpenAI API',
    [2]: 'Ollama API',
};
// 计算属性或方法用于获取 API 类型
const getApiType = (apiType) => {
    return apiTypeMapping[apiType] || '未知类型';
};
const showStatus = (value) => {
    return value === false ? '关闭' : value === true ? '启用' : '数据错误';
}
const showCrawlMode = (value) => {
    return value === "1" ? '地址抓取' : value === "2" ? '智能抓取' : '数据错误';
}
const showCycleType = (execType, cycleType, weekDays, execTime) => {
    let srt = "";
    if (execType === "1") {
        return '单次执行';
    } else {
        if (cycleType === "1") {
            srt = "每日";
        } else if (cycleType === "2") {
            srt = "每周";
            srt += getWeekday(weekDays);
        }
        srt += " " + execTime + " 执行";
    }
    return srt
}
// 转日期
const getWeekday = (weekDays) => {
    let srt = "";
    if (weekDays == null) {
        return srt
    }
    for (let i = 0; i < weekDays.length; i++) {
        if (i === 0) {
            srt += chineseNumbers[weekDays[i] - 1]
        } else {
            srt += "、" + chineseNumbers[weekDays[i] - 1]
        }
    }
    return srt + "的"
}
const chineseNumbers = ['一', '二', '三', '四', '五', '六', '日'];
</script>

<style scoped>
.pagination-block {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>