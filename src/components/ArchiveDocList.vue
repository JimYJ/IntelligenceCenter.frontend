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
                    <span class="text-large font-600 mr-3">档案内容 - {{info.archive_name}}</span>
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
            <el-descriptions class="margin-top" :column="3" :size="size" border>
                <!-- <template #extra>
    <el-button type="primary">Operation</el-button>
  </template> -->
                <el-descriptions-item label="文档数"> {{info.file_count}} </el-descriptions-item>
                <!-- <el-descriptions-item label="提取模式"> {{ getExtractMode(info.extraction_mode) }} </el-descriptions-item>
                <el-descriptions-item label="提取模型">
                    <el-space :size="8" spacer="/" wrap>
                        <el-tag size="small">{{ getApiType(info.api_type) }}</el-tag>
                        <el-tag size="small">{{info.llm_setting_name}}</el-tag>
                        <el-tag size="small">{{info.extraction_model}}</el-tag>
                    </el-space>
                </el-descriptions-item> -->
                <el-descriptions-item label="活跃任务 / 关联任务"> {{info.active_task_count}} / {{info.task_count}} </el-descriptions-item>
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
                            <router-link type='primary' :to="{ path: '/archive/detail' }" label="tableData.name">{{ scope.row.doc_name }}</router-link>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="extraction_mode" label="抽取模式" min-width="80">
                    <template #default="{ row }">
                        {{ getExtractMode(row.extraction_mode) }}
                    </template>
                </el-table-column>
                <el-table-column prop="extraction_model" label="抽取模型" min-width="250">
                    <template #default="{ row }">
                        <el-space :size="2" spacer="/" wrap v-if="row.api_type!=0">
                            <el-tag size="small">{{ getApiType(row.api_type) }}</el-tag>
                            <el-tag size="small">{{row.llm_setting_name}}</el-tag>
                            <el-tag size="small">{{row.extraction_model}}</el-tag>
                        </el-space>
                        <div size="small" v-if="row.api_type==0">-</div>
                    </template>
                </el-table-column>
                <el-table-column prop="task_name" label="来源任务" min-width="200" />
                <el-table-column prop="resource_num" label="资源数量" min-width="80" />
                <el-table-column prop="is_extracted" label="是否提取" min-width="80">
                    <template v-slot="scope">
                        <el-tag size="small" :type="scope.row.is_extracted ? 'success' : 'warning'">{{ showStatus(scope.row.is_extracted) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="is_translated" label="是否翻译" min-width="80">
                    <template v-slot="scope">
                        <el-tag size="small" :type="scope.row.is_translated ? 'success' : 'warning'">{{ showStatus(scope.row.is_translated) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间" min-width="120" />
                <el-table-column prop="updated_at" label="修改时间" min-width="120" />
                <el-table-column prop="" label="操作" min-width="200">
                    <el-button type="primary" plain>重提取</el-button>
                    <el-button type="primary" plain>下载资源</el-button>
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
import { post, get } from '../http'
import { useRoute } from 'vue-router';
const onBack = () => {
    window.history.back();
}
const apiTypeMapping = {
    [1]: 'OpenAI API',
    [2]: 'Ollama API',
};
// 计算属性或方法用于获取 API 类型
const getApiType = (apiType) => {
    return apiTypeMapping[apiType] || '未知类型';
};
const showStatus = (value) => {
    return value === false ? '否' : value === true ? '是' : '数据错误';
}

const extractModeMapping = {
    [1]: '精准匹配',
    [2]: '智能匹配',
};
// 计算属性或方法用于获取 API 类型
const getExtractMode = (mode) => {
    return extractModeMapping[mode] || '未抽取';
};
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
let info = ref({
    archive_name: "",
    // active_task_count: 0,
    // extraction_mode: 0,
    // extraction_model: "",
    // file_count: 0,
    // llm_setting_name: "",
    // task_count: 0,
})

let pages = {
    current: 1,
    size: 20,
    id: id,
}
// 翻页
const changePage = (newPage) => {
    pageInfo.value.current = newPage
    pages.current = pageInfo.value.current
    getData()
};
// 获取数据
const getData = () => {
    post("/archive/doc/list", { keyword: pageInfo.value.keyword }, pages).then(res => {
        console.log(res);
        if (res.success) {
            pageInfo.value = res.data
            console.log(res.data)
        } else {
            ElMessage.error('加载列表失败')
        }
    }).catch()
    get("/archive/info", pages).then(res => {
        console.log(res);
        if (res.success) {
            info.value = res.data
        } else {
            ElMessage.error('加载档案信息失败')
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
