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
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            文档数
                        </div>
                    </template>
                    25146
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            提取模式
                        </div>
                    </template>
                    智能提取
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            提取模型
                        </div>
                    </template>
                    <el-tag size="small">OpenAI API/我的千问Key2/qwen-2.5-7b</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            活跃任务 / 关联任务
                        </div>
                    </template>
                    5 / 15
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            编辑
                        </div>
                    </template>
                    <el-button size="small">修改提取方式</el-button>
                    <el-divider direction="vertical" />
                    <el-button size="small" type="primary">全部重新提取</el-button>
                    <el-divider direction="vertical" />
                    <el-button size="small" type="primary">下载全部资源</el-button>
                </el-descriptions-item>
            </el-descriptions>
            <el-table :data="tableData" style="width: 100%;">
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
const onBack = () => {
}
const tableData = [
    {
        date: '2016-05-03',
        name: '俄军单兵硬刚乌军无人机:蓄力后一抡枪托直接打爆 瞬间火光迸射',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: '普京、梅洛尼均希望中国调停俄乌冲突，外交部回应',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: '俄媒：泽连斯基希望秋季结束冲突',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: '美防长：俄乌冲突最终将通过谈判解决',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: '外媒：铝热剂惊现俄乌战场',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: '乌克兰首都基辅传出多次爆炸声',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: '特朗普:乌克兰谎报阵亡人数',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: '泽连斯基：乌计划无期限保持夺取的俄领土',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: '乌称俄军向基辅发射导弹 俄方尚未回应',
        count: 25,
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: '俄称击落乌战机 乌称继续进攻库尔斯克',
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
a:visited {
    color: var(--el-color-primary-light-1);
    text-decoration-color: #fff !important;
}
</style>
