<template>
    <el-container class="main-container">
        <el-aside width="210px" class="main-menu">
            <el-menu :router="true">
                <img alt="logo" width="200px" height="46px" src="../assets/logo.png">
                <el-menu-item index="/"><el-icon>
                        <ChatRound />
                    </el-icon><el-text class="mx-1" type="primary" size="large" tag="b">智问</el-text></el-menu-item>
                <el-menu-item index="/task/list"><el-icon>
                        <DocumentAdd />
                    </el-icon>抓取任务</el-menu-item>
                <el-menu-item index="/archive/list">
                    <el-icon>
                        <Document />
                    </el-icon>情报档案</el-menu-item>
                <el-menu-item index="/api/list">
                    <el-icon>
                        <Connection />
                    </el-icon>LLM API</el-menu-item>
                <el-menu-item @click="showOption = true">
                    <el-icon>
                        <Setting />
                    </el-icon>首选项</el-menu-item>
            </el-menu>
        </el-aside>
        <ArchiveDetail v-if="$route.path==='/archive/detail'" />
        <ArchiveList v-if="$route.path==='/archive/list'" />
        <ArchiveDocList v-if="$route.path==='/archive/document/list'" />
        <TaskList v-if="$route.path==='/task/list'" />
        <LlmApiList v-if="$route.path==='/api/list'" />
        <OptionPage v-model="showOption" @updateShow="showHideOption" />
    </el-container>
</template>

<script setup>
import ArchiveDetail from './ArchiveDetail.vue'
import ArchiveList from './ArchiveList.vue'
import TaskList from './TaskList.vue'
import OptionPage from './OptionPage.vue'
import LlmApiList from './LlmApiList.vue'
import ArchiveDocList from './ArchiveDocList.vue'
import { DocumentAdd, Document, Setting, Connection, ChatRound } from '@element-plus/icons-vue'
import { ref } from 'vue'
const showOption = ref(false)

const showHideOption = (vision) => {
    showOption.value = vision;
};
</script>

<style scoped>
.main-container .el-header {
    /* position: relative; */
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}
.main-container .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}
.main-container .el-menu {
    border-right: none;
}
.main-container .el-main {
    padding: 0;
}
.main-container .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
.main-container .main-menu {
    border-right: 1px solid #dcdfe6; /* 设置右边的边框 */
}
.main-container .info-detail,
.list-page {
    margin-left: 20px;
    margin-top: 17px;
}
.main-menu {
    height: 97vh;
    background-color: #fff !important;
}
.pagination-block + .pagination-block {
    margin-top: 50px;
}
.pagination-block {
    margin-top: 15px;
    margin-left: 80px;
}
.pagination-block .example-demonstration {
    margin-bottom: 32px;
}
</style>