<template class="body">
    <div class="body">
        <el-row :gutter="20" justify="center">
            <el-col :span="24" style="min-height: 300px;">
                <div class="box">
                    <el-input resize="none" v-model="textarea" :rows="4" type="textarea" placeholder="输入你想要的内容" />
                    <el-row class="row-bg" justify="space-between">
                        <el-col :span="6" style="text-align: left;">
                            <el-text class="mx-1" size="small">对档案提问:</el-text><el-switch v-model="options.useArchive" size="small" />
                        </el-col>
                        <el-col :span="12">
                        </el-col>
                        <el-col :span="6" style="text-align: right;">
                            <el-icon :size="iconSize" class="icon">
                                <Paperclip @click="showCode" />
                            </el-icon>
                            <el-icon :size="iconSize" class="icon">
                                <ChatDotRound @click="showCode2" />
                            </el-icon>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-card style="max-width: 80px" class="affix">
        <img alt="logo" width="50px" height="50px" src="../assets/logo1.png">
        <el-divider />
        <el-space :size="12" spacer=" " wrap direction="vertical">
            <el-tooltip class="box-item" effect="dark" content="开启新会话" placement="left-end">
                <el-icon :size="iconSize" class="icon">
                    <ChatRound />
                </el-icon>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="开启新智问会话" placement="left-end">
                <el-icon :size="iconSize" class="icon">
                    <ChatDotRound />
                </el-icon>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="查看历史会话" placement="left-end">
                <el-icon :size="iconSize" class="icon">
                    <Clock />
                </el-icon>
            </el-tooltip>
        </el-space>
        <el-divider />
        <el-space :size="12" spacer=" " wrap direction="vertical">
            <el-tooltip class="box-item" effect="dark" content="创建自动更新的信息库" placement="left-end">
                <el-icon :size="iconSize" class="icon">
                    <Collection />
                </el-icon>
            </el-tooltip>
        </el-space>
    </el-card>
    <!-- <div class="chatPop1">
        <MarkdownHighlighter :markdownText="markdown" />
    </div>
    <div class="chatPop2">
        <MarkdownHighlighter :markdownText="markdown" />
    </div>
    <div class="chatPop1">
        <MarkdownHighlighter :markdownText="markdown" />
    </div> -->
    <div v-for="(markdownItem, index) in markdownList" :key="index">
        <div :class=markdownItem.className>
            <MarkdownHighlighter :markdownText="markdownItem.content" />
        </div>
    </div>
</template>

<script  setup>
import { Clock, ChatDotRound, ChatRound, Collection, Paperclip } from '@element-plus/icons-vue'
import MarkdownHighlighter from './MarkdownHighlighter.vue';
import { ref } from 'vue'
const textarea = ref('')

const iconSize = 25

const options = ref({
    useInternet: true,
    useArchive: false,
})

const markdownList = ref([])
let a = `
# 这是标题
\`\`\`HTML
<el-icon :size="iconSize" class="icon">
    <ChatRound />
</el-icon>
\`\`\`

### sdgfsdf
`
const showCode = () => {
    let b = {
        className: "",
        content: a,
    }
    b.className = "chatPop1"
    markdownList.value.push(b)
}
const showCode2 = () => {
    let b = {
        className: "",
        content: a,
    }
    b.className = "chatPop2"
    markdownList.value.push(b)
}
</script>

<style scoped>
.box {
    position: fixed;
    bottom: 30px;
    left: 50%; /* 将元素的左边缘设置为视口宽度的50% */
    transform: translate(-50%);
    background-color: #f3f5fc !important;
    border-radius: 15px;
    padding: 6px !important;
    width: 800px;
    border: 1px solid #e2e2e2;
    height: 120px;
}
div /deep/ .el-textarea__inner {
    background-color: #f3f5fc !important;
    border-radius: 15px;
    border: 0px;
    box-shadow: none;
    color: #a1a1a1;
}

div /deep/ .el-textarea__inner:hover {
    box-shadow: none;
}
.body {
    width: 99%;
}
div /deep/ .el-textarea__inner::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
div /deep/ .el-textarea__inner::-webkit-scrollbar-thumb {
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    background-color: #e2e2e2;
}
div /deep/ .el-textarea__inner::-webkit-scrollbar-track {
    background-color: transparent;
}

.affix {
    position: fixed;
    top: 30%;
    right: 20px;
}

div /deep/ .el-card__body {
    padding: 10px;
}

.icon {
    color: #a1a1a1;
}
.icon:hover {
    color: var(--el-color-primary);
    transform: scale(1.1);
}
.icon:active {
    color: var(--el-color-primary);
    transform: scale(1.2);
}

.chatPop1 :hover {
    /* background-color: #c6c8eb; */
}

.chatPop1 {
    background-color: #e8e9f8;
    /* background-color: var(--el-color-success-light-5); */
    padding: 5px 8px;
    display: inline-block;
    border-radius: 10px;
    margin: 0px 0 10px 10px;
    /* position: relative;
    float: left; */
    font-size: small;
    text-align: left;
    width: 800px;
}

.chatPop1 span::after {
    content: "";
    position: absolute;
    top: 8px;
    left: -16px;
}

.chatPop2 :hover {
    /* background-color: var(--el-color-primary); */
}

.chatPop2 {
    /* background-color: var(--el-color-primary); */
    padding: 5px 8px;
    display: inline-block;
    border-radius: 10px;
    margin: 0px 5px 10px 10px;
    /* position: relative; */
    text-align: left;
    /* float: right; */
    /* color: #fff; */
    font-size: small;
    width: 800px;
    background-color: var(--el-color-primary-light-7);
}

.chatPop2 span::after {
    content: "";
    position: absolute;
    top: 8px;
    right: -16px;
    transform: rotateY(180deg);
}

.wxchatBorderRightMid {
    width: 1024px;
    height: 428px;
    /* background-color: #f5f5f5; */
    display: block;
    margin-right: -20px;
    position: fixed;
    top: 5px;
    left: 50%; /* 将元素的左边缘设置为视口宽度的50% */
    transform: translate(-50%);
}
</style>
