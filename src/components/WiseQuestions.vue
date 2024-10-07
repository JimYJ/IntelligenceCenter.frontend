<template class="body">
    <div class="chatbox" :class="smartMode?'chatbox-left':'chatbox-center'">
        <div v-for="(markdownItem, index) in markdownList" :key="index">
            <div :class=markdownItem.className>
                <MarkdownHighlighter :markdownText="markdownItem.content" />
            </div>
        </div>
    </div>
    <transition name="slide">
        <el-row :gutter="20" justify="center">
            <el-col :span="24" style="min-height: 300px;">
                <div class="box" :class="smartMode?'box-left':'box-center'">
                    <el-input resize="none" v-model="textarea" :rows="4" type="textarea" placeholder="输入你想要的内容" />
                    <el-row class="row-bg" justify="space-between">
                        <el-col :span="2" style="text-align: left;">
                            <el-switch v-model="useArchive" class="ml-2" width="50" inline-prompt active-text="启用" inactive-text="禁用" />
                        </el-col>
                        <el-col :span="10" style="text-align: left;">
                            <el-select v-model="value3" multiple collapse-tags collapse-tags-tooltip placeholder="选择档案库" style="width: 180px" :disabled="!useArchive">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </el-col>
                        <el-col :span="6">
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
    </transition>
    <el-card style="max-width: 80px" class="affix">
        <img alt="logo" width="50px" height="50px" src="../assets/logo1.png">
        <el-divider />
        <el-space :size="12" spacer=" " wrap direction="vertical">
            <el-tooltip class="box-item" effect="dark" content="开启新会话" placement="left-end">
                <el-icon :size="iconSize" class="icon">
                    <ChatRound @click="enableNormalMode" />
                </el-icon>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="开启新智问会话" placement="left-end">
                <el-icon :size="iconSize" class="icon">
                    <ChatDotRound @click="enableSmartMode" />
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
    <transition name="el-fade-in-linear">
        <div class="info-body" v-show="smartMode">
            <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item>
        </el-menu> -->
            <div class="mind-map" ref="mindMapRef">
            </div>
            <div class="file-list">
                <p v-for="o in 50" :key="o" class="text item">{{ 'List item horizontal handleSelect 在这个例子中，我们使用了两个事件监听器@mouseover和@mouseleave来分别处理鼠标悬停和离开事件。hovered数据属性用于追踪鼠标是否悬停在元素上。计算属性hoverStyle根据hovered的值动态返回样式对象。当鼠标悬停在div元素上时，hovered变为true，计算属性hoverStyle返回的样式会使背景颜色变为#f0f0f0。当鼠标离开时，hovered变为false，背景颜色变回透明。这种方法可以模拟hover样式的效果，但需要使用JavaScript来处理鼠标事件。如果你希望更接近CSS的:hover行为，这种方法是可行的。' + o }}</p>
            </div>
        </div>
    </transition>
</template>

<script  setup>
import { Clock, ChatDotRound, ChatRound, Collection, Paperclip } from '@element-plus/icons-vue'
import MarkdownHighlighter from './MarkdownHighlighter.vue';
import MindMap from "simple-mind-map"
import { nextTick, ref } from 'vue'
const textarea = ref('')

const iconSize = 25

// const options = ref({
//     useInternet: true,
//     useArchive: false,
// })

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
let smartMode = ref(false)
let mindMap = null;
const enableSmartMode = async () => {
    smartMode.value = true;
    await nextTick();
    if (mindMap == null) {
        newMindMap();
    }
}

const enableNormalMode = async () => {
    smartMode.value = false;
    if (mindMap != null) {
        mindMap.destroy()
    }
    mindMap = null;
}
const showCode = () => {
    let b = {
        className: "",
        content: a,
    }
    b.className = "chatPopBot"
    markdownList.value.push(b)
}
const showCode2 = () => {
    let b = {
        className: "",
        content: a,
    }
    b.className = "chatPopUser"
    markdownList.value.push(b)
}
const mindMapRef = ref()

//档案选择器
let useArchive = ref(false)
const value3 = ref([])
const options = [
    {
        value: 'Option1',
        label: '中美贸易战',
    },
    {
        value: 'Option2',
        label: '俄乌战争',
    },
    {
        value: 'Option3',
        label: '巴以战争',
    },
]

const mindData = {
    "data": {
        "text": "根节点"
    },
    "children": [{
        "data": {
            "text": "子节点1"
        }
    },
    {
        "data": {
            "text": "子节点2"
        }
    },
    {
        "data": {
            "text": "子节点3"
        }
    },
    {
        "data": {
            "text": "子节点4"
        }
    },
    {
        "data": {
            "text": "子节点5"
        }
    }]
}

const newMindMap = () => {
    mindMap = new MindMap({
        el: mindMapRef.value,
        data: mindData,
        theme: "blueSky",
        readonly: true,
        initRootNodePosition: ['10%', '50%'],
        fit: true,
        mousewheelAction: "zoom"
    });
    mindMap.on("node_click", hide)
    console.log(mindMap.d)
}


const hide = () => {

}
</script>

<style scoped>
.mind-map {
    border-radius: 15px;
    background-color: #f3f5fc;
    width: 100%;
    height: 30vh;
}
.info-body {
    background-color: #f3f5fc;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(calc(-50% + 420px));
    right: 20px;
    max-width: 800px;
    /* border-left: 1px solid #f6f3f3; */
}
.file-list {
    color: #565656;
    height: 67vh;
    padding: 5px 10px;
    overflow-y: auto; /* 在y轴上允许滚动 */
}
.file-list::-webkit-scrollbar-thumb {
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    background-color: #e2e2e2;
}
.file-list::-webkit-scrollbar-track {
    background-color: transparent;
}
.file-list::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.chatbox {
    position: fixed;
    top: 10px; /* 上沿贴顶 */
    bottom: 180px;
    width: 850px;
    /* left: 50%; /* 将元素的左边缘设置为视口宽度的50% 
    transform: translate(-50%); */
    left: 90px;
    overflow-y: auto; /* 在y轴上允许滚动 */
    -ms-overflow-style: none; /* 隐藏 IE 和 Edge 的滚动条 */
    scrollbar-width: none; /* 隐藏 Firefox 的滚动条 */
}
.chatbox::-webkit-scrollbar {
    display: none; /* 隐藏 Chrome 和 Safari 的滚动条 */
}
.chatbox-left {
    /* left: 90px; */
    left: 50%;
    transform: translate(calc(-50% - 420px));
}

.chatbox-center {
    left: 50%;
    transform: translate(-50%);
}

.box {
    position: fixed;
    bottom: 30px;
    /* left: 50%; /* 将元素的左边缘设置为视口宽度的50% 
    transform: translate(-50%); */
    /* left: 110px; */
    background-color: #f3f5fc !important;
    border-radius: 15px;
    padding: 6px !important;
    width: 800px;
    border: 1px solid #e2e2e2;
    height: 120px;
}

.box-left {
    /* left: 110px; */
    left: 50%;
    transform: translate(calc(-50% - 420px));
}

.box-center {
    left: 50%;
    transform: translate(-50%);
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
    left: 20px;
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

/*.chatPopbot :hover {
    background-color: #c6c8eb; 
}*/

.chatPopBot {
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

.chatPopBot span::after {
    content: "";
    position: absolute;
    top: 8px;
    left: -16px;
}

/*.chatPopUser :hover {
   background-color: var(--el-color-primary); 
}*/

.chatPopUser {
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

.chatPopUser span::after {
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
