<template>
    <el-container class="info-detail">
        <div aria-label="A complete example of page header" style="width: 100%; overflow-x: hidden;">
            <el-page-header @back="onBack">
                <template #breadcrumb>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">Intelligence Center</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/archive/list' }">情报档案</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/archive/document/list' , query: { id: archiveDocs.archive_id } }">档案内容</el-breadcrumb-item>
                        <el-breadcrumb-item>文档详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <template #content>
                    <div class="flex items-center">
                        <span class="text-large font-600 mr-3">{{archiveDocs.archive_name}}</span>
                        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                            {{archiveDocs.doc_name}}
                        </span>
                        <!-- <el-space :size="size" spacer="">
                            <el-tag>金融</el-tag>
                            <el-tag>亚洲</el-tag>
                        </el-space> -->
                    </div>
                </template>
                <template #extra>
                    <div class="flex items-center">
                        <el-button>翻译</el-button>
                        <el-button type="primary" class="ml-2" :disabled="!archiveDocs.is_translated">切换译文</el-button>
                    </div>
                </template>
                <el-descriptions class="margin-top" :column="3" :size="size" border>
                    <el-descriptions-item label="来源任务"> {{archiveDocs.task_name}} </el-descriptions-item>
                    <el-descriptions-item label="提取模型">
                        <el-space :size="2" spacer="/" wrap v-if="archiveDocs.api_type!=0">
                            <el-tag size="small">{{ getApiType(archiveDocs.api_type) }}</el-tag>
                            <el-tag size="small">{{archiveDocs.llm_setting_name}}</el-tag>
                            <el-tag size="small">{{archiveDocs.extraction_model}}</el-tag>
                        </el-space>
                        <el-tag size="small" v-if="archiveDocs.api_type==0">未提取</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="是否翻译">
                        <el-tag :type="archiveDocs.is_translated ? 'success' : 'warning'">
                            {{archiveDocs.is_translated ? '是' : '否'}}
                        </el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="创建时间"> {{archiveDocs.created_at}} </el-descriptions-item>
                    <el-descriptions-item label="更新时间"> {{archiveDocs.updated_at}} </el-descriptions-item>
                    <el-descriptions-item label="来源网址"> {{archiveDocs.src_url}} </el-descriptions-item>
                </el-descriptions>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <div class="grid-content ep-bg-purple" style="width: 100%;">
                            <p class="mt-4 text-sm" style="width: 100%;">
                                {{archiveDocs.extraction_content}}
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
                                <el-image class="images-list" :key="item" v-for="item in imgList" :preview-src-list="imgList" :src="item" :fit="cover" />
                                <div v-if="imgList.length==0">暂无图片</div>
                                <!-- <template #footer>共215个资源</template> -->
                            </el-card>
                            <el-card class="file-links-header" shadow="hover" style="width: 100%;">
                                <template #header>
                                    <span>文件列表</span>
                                </template>
                                <div class="file-links-container">
                                    <div v-for="(link, index) in fileLinks" :key="index" class="file-link-item" style="display: inline-block; margin-right: 10px;">
                                        <el-tooltip :content="link.url" placement="top">
                                            <el-link :href="link.url" target="_blank" class="file-link" :title="link.url">
                                                <el-image :src="link.icon" class="file-link-icon" />
                                            </el-link>
                                        </el-tooltip>
                                    </div>
                                    <div v-if="fileLinks.length==0">暂无文件</div>
                                </div>
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
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { get } from '../http'
import { useRoute } from 'vue-router';
const onBack = () => {
    notify('Back')
}
const apiTypeMapping = {
    [1]: 'OpenAI API',
    [2]: 'Ollama API',
};
// 计算属性或方法用于获取 API 类型
const getApiType = (apiType) => {
    return apiTypeMapping[apiType] || '未知类型';
};
const size = ref(8)

const imgList = [
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
const archiveDocs = ref({
    id: null,
    doc_name: '',
    task_id: null,
    task_name: '',
    archive_id: null,
    archive_name: '',
    api_type: 0,
    origin_content: '',
    extraction_content: '',
    translate_content: '',
    extraction_mode: null,
    api_key_id: null,
    extraction_model: '',
    is_extracted: false,
    is_translated: false,
    src_url: '',
    created_at: '',
    updated_at: ''
});
const fileLinks = ref([
    { url: 'https://example.com/file1.pdf', icon: '/icon/pdf.png' },
    { url: 'https://example.com/file2.pdf', icon: '/icon/pdf.png' },
]);
const route = useRoute();
const id = route.query.id;

let pages = {
    current: 1,
    size: 20,
    id: id,
}
const getData = () => {
    get("/archive/doc/info", pages).then(res => {
        console.log(res);
        if (res.success) {
            archiveDocs.value = res.data;
        } else {
            ElMessage.error('加载档案信息失败:' + res.message)
        }
    }).catch(err => {
        ElMessage.error('请求档案信息时出错:' + err)
    });
}
getData()
</script>

<style scoped>
.images-list {
    width: 100px;
    height: 100px;
    margin: 5px;
}
.file-links-container {
    display: flex;
    flex-wrap: wrap;
}
.file-link-item {
    margin-right: 8px;
    margin-bottom: 8px;
}
.file-link {
    text-decoration: none;
}
.file-link-icon {
    width: 32px;
    height: 32px;
}
</style>
