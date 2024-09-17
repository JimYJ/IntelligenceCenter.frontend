<template>
    <el-drawer v-model="dialogFormVisible" title="新建任务" width="600" size="600">
        <el-form :model="newTask">
            <el-form-item label="任务设置" class="flex gap-8 mb-4 items-center" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-input v-model="newTask.name" placeholder="任务名称" style="width: 300px" />
                </el-space>
            </el-form-item>
            <el-form-item label="执行时间" label-width="150">
                <el-radio-group v-model="newTask.execOption">
                    <el-radio-button value="1">立即开始</el-radio-button>
                    <el-radio-button value="2">周期循环</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择周期" label-width="150" v-if="newTask.execOption==2">
                <el-radio-group v-model="newTask.execCycleOption">
                    <el-radio-button value="1">每日</el-radio-button>
                    <el-radio-button value="2">每周</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择日期" v-if="newTask.execCycleOption==2&&newTask.execOption==2" label-width="150">
                <el-checkbox v-model="checked3" label="周一" />
                <el-checkbox v-model="checked4" label="周二" />
                <el-checkbox v-model="checked4" label="周三" />
                <el-checkbox v-model="checked4" label="周四" />
                <el-checkbox v-model="checked4" label="周五" />
                <el-checkbox v-model="checked4" label="周六" />
                <el-checkbox v-model="checked4" label="周日" />
            </el-form-item>
            <el-form-item label="执行时间" v-if="newTask.execOption==2" label-width="150">
                <el-time-picker v-model="newTask.execTime" placeholder="选择执行时间" />
            </el-form-item>
            <el-form-item label="指定模型" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-input v-model="newTask.name" placeholder="网页内容解析模型" style="width: 300px" />
                    <el-input v-model="newTask.name" placeholder="信息提炼模型" style="width: 300px" />
                    <el-input v-model="newTask.name" placeholder="指定模型" style="width: 300px" />
                    <el-tooltip content="例如:gpt-4o-2024-08-06" raw-content>
                        <el-icon>
                            <QuestionFilled />
                        </el-icon>
                    </el-tooltip>
                </el-space>
            </el-form-item>
            <el-divider content-position="left">档案设置</el-divider>
            <el-form-item label="数据存储模式" label-width="150">
                <el-radio-group v-model="newTask.archiveOption">
                    <el-radio-button value="1">选择档案</el-radio-button>
                    <el-radio-button value="2">新建档案</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="指定档案" v-if="newTask.archiveOption==1" label-width="150">
                <el-select v-model="value" placeholder="选择匹配的档案" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="档案设置" v-if="newTask.archiveOption==2" class="flex gap-8 mb-4 items-center" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-input v-model="newTask.archiveName" placeholder="档案名称" style="width: 300px" />
                </el-space>
            </el-form-item>
            <el-form-item label="抓取内容" v-if="newTask.archiveOption==2" label-width="150">
                <el-space :size="8" spacer=" " wrap v-for="(contexts, index) in contextIndexs" :key="index">
                    <el-input v-model="contextIndexs[index]" placeholder="填写要提取的内容" style="width: 300px" />
                </el-space>
                <el-button :icon="Plus" @click="addInput" />
                <el-button :icon="Minus" @click="removeInput" />
            </el-form-item>
            <el-divider content-position="left">情报抓取器配置</el-divider>
            <el-form-item label="使用全局设置" label-width="150">
                <el-switch v-model="newTask.crawlerUseGroup" />
            </el-form-item>
            <el-form-item label="抓取器选择" label-width="150" v-if="newTask.crawlerUseGroup==false">
                <el-radio-group v-model="newTask.crawlerSelect">
                    <el-radio-button value="1">内置爬虫</el-radio-button>
                    <el-radio-button value="2">headless浏览器</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="并发数" label-width="150" v-if="newTask.crawlerUseGroup==false">
                <el-input-number v-model="newTask.crawlerConcurrency" :min="1" :max="1024" @change="handleChange" style="width: 150px" />
            </el-form-item>
            <el-form-item label="抓取间隔(秒)" label-width="150" v-if="newTask.crawlerUseGroup==false">
                <el-input-number v-model="newTask.crawlerDelay" :min="1" :max="3600" @change="handleChange" style="width: 150px" />
            </el-form-item>
            <el-form-item label="全局抓取深度" label-width="150" v-if="newTask.crawlerUseGroup==false">
                <el-input-number v-model="newTask.crawlerMaxDepth" :min="1" :max="99" @change="handleChange" style="width: 150px" />
            </el-form-item>
            <el-form-item label="每秒请求上限" label-width="150" v-if="newTask.crawlerUseGroup==false">
                <el-input-number v-model="newTask.crawlerRateLimit" :min="1" :max="1024" @change="handleChange" style="width: 150px" />
            </el-form-item>
            <el-form-item label="自动模拟多IP" label-width="150" v-if="newTask.crawlerUseGroup==false">
                <el-switch v-model="newTask.crawlerVirtualIP" />
            </el-form-item>
            <el-form-item label="使用代理IP池" label-width="150" v-if="newTask.crawlerUseGroup==false">
                <el-space :size="8" spacer=" " wrap>
                    <el-switch v-model="newTask.crawlerIPPool" />
                    <el-tooltip content="需要先将准备好的IP列表文件放在本软件的proxyip目录下，每个IP用英文逗号隔开" raw-content>
                        <el-icon>
                            <QuestionFilled />
                        </el-icon>
                    </el-tooltip>
                </el-space>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup>
import { reactive, defineEmits, ref } from "vue";
import { Plus, Minus, QuestionFilled } from '@element-plus/icons-vue'
const emit = defineEmits(["updateShow"]);

const cancel = () => {
    emit("updateShow", false);
};

const submit = () => {
    emit("updateShow", false);
};

// 初始化输入框数组
const contextIndexs = ref(['标题', '内容', '发布时间'])


// 添加输入框
function addInput() {
    contextIndexs.value.push('');
    console.log(contextIndexs)
}

function removeInput() {
    contextIndexs.value.splice(contextIndexs.value.length - 1, 1);
}


const newTask = reactive({
    name: "",
    execOption: "1", // 1立即开始 2周期循环
    execCycleOption: "1", // 1每日 2每周
    execTime: "",
    archiveOption: "1",
    archiveName: "",
    archiveID: 1,
    archiveList: contextIndexs,
    crawlerContexts: contextIndexs,
    crawlerSelect: "1",
    crawlerUseGroup: true,
    crawlerConcurrency: 5,
    crawlerDelay: 0,
    crawlerMaxDepth: 5,
    crawlerRateLimit: 100,
    crawlerVirtualIP: true,
    crawlerIPPool: false,
});

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
</script>

