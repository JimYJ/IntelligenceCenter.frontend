<template>
    <el-drawer v-model="dialogFormVisible" title="新建任务" width="650" size="650">
        <el-form :model="newTask">
            <el-form-item label="任务设置" class="flex gap-8 mb-4 items-center" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-input v-model="newTask.task_name" placeholder="任务名称" style="width: 300px" />
                </el-space>
            </el-form-item>
            <el-form-item label="信息抓取模式" label-width="150">
                <el-radio-group v-model="newTask.crawl_mode">
                    <el-radio-button value="1" @click="changePlaceholder(1)">地址抓取</el-radio-button>
                    <el-radio-button value="2" @click="changePlaceholder(2)">智能抓取</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="crawl_mode_label" label-width="150">
                <el-input v-model="newTask.crawl_url" type="textarea" :placeholder="crawl_url_placeholder" />
            </el-form-item>
            <el-form-item label="执行时间" label-width="150">
                <el-radio-group v-model="newTask.exec_type">
                    <el-radio-button value="1">立即开始</el-radio-button>
                    <el-radio-button value="2">周期循环</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择周期" label-width="150" v-if="newTask.exec_type==2">
                <el-radio-group v-model="newTask.cycle_type">
                    <el-radio-button value="1">每日</el-radio-button>
                    <el-radio-button value="2">每周</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择日期" v-if="newTask.cycle_type==2&&newTask.exec_type==2" label-width="150">
                <el-checkbox-group v-model="newTask.week_days">
                    <el-checkbox label="周一" value="1" />
                    <el-checkbox label="周二" value="2" />
                    <el-checkbox label="周三" value="3" />
                    <el-checkbox label="周四" value="4" />
                    <el-checkbox label="周五" value="5" />
                    <el-checkbox label="周六" value="6" />
                    <el-checkbox label="周日" value="7" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="执行时间" v-if="newTask.exec_type==2" label-width="150">
                <el-time-picker v-model="newTask.exec_time" placeholder="选择执行时间" value-format="HH:mm:ss" />
            </el-form-item>
            <el-divider content-position="left">内容提取设置</el-divider>
            <el-form-item label="提取LLM" label-width="150">
                <el-cascader v-model="newTask.api_settings_id" :options="llmList" @change="handleChange" style="width: 300px" emitPath=false />
            </el-form-item>
            <el-form-item label="指定模型" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-input v-model="newTask.extraction_model" placeholder="指定模型" style="width: 300px" />
                    <el-tooltip content="例如:gpt-4o-2024-08-06" raw-content>
                        <el-icon>
                            <QuestionFilled />
                        </el-icon>
                    </el-tooltip>
                </el-space>
            </el-form-item>
            <el-form-item label="启用进阶设置" label-width="150">
                <el-switch v-model="showAdvancedSettings" />
            </el-form-item>
            <el-collapse-transition>
                <div v-show="showAdvancedSettings">
                    <el-form-item label="启用匹配过滤器" label-width="150">
                        <el-space :size="8" spacer=" " wrap>
                            <el-switch v-model="newTask.enable_filter" />
                            <el-tooltip content="开启过滤器后，不匹配过滤器内容的网页将不会被抓取，如果某项过滤设置未填写，该项过滤将不会生效" raw-content>
                                <el-icon>
                                    <QuestionFilled />
                                </el-icon>
                            </el-tooltip>
                        </el-space>
                    </el-form-item>
                    <el-form-item label="域名匹配" label-width="150" v-if="newTask.enable_filter">
                        <el-input v-model="newTask.domain_match" type="textarea" placeholder="例:www.baidu.com或baidu.com，多个网址请换行，配置后只抓取匹配域名的网址" />
                    </el-form-item>
                    <el-form-item label="路径匹配" label-width="150" v-if="newTask.enable_filter">
                        <el-input v-model="newTask.path_match" type="textarea" placeholder="例:/user/list/*，多个网址请换行，配置后只抓取匹配域名的网址" />
                    </el-form-item>
                    <el-divider content-position="left">档案设置</el-divider>
                    <el-form-item label="档案设置" label-width="150">
                        <el-radio-group v-model="newTask.archive_option">
                            <el-radio-button value="1">新建档案</el-radio-button>
                            <el-radio-button value="2">选择档案</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="指定档案" v-if="newTask.archive_option==2" label-width="150">
                        <el-select v-model="newTask.archive_id" placeholder="选择匹配的档案" style="width: 240px">
                            <el-option v-for="item in archiveList" :key="item.id" :label="item.archive_name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="档案设置" v-if="newTask.archiveOption==2" class="flex gap-8 mb-4 items-center" label-width="150">
                        <el-space :size="8" spacer=" " wrap>
                            <el-input v-model="newTask.archiveName" placeholder="档案名称" style="width: 300px" />
                        </el-space>
                    </el-form-item> -->
                    <!-- <el-form-item label="抓取内容" v-if="newTask.archiveOption==2" label-width="150">
                <el-space :size="8" spacer=" " wrap v-for="(contexts, index) in contextIndexs" :key="index">
                    <el-input v-model="contextIndexs[index]" placeholder="填写要提取的内容" style="width: 300px" />
                </el-space>
                <el-button :icon="Plus" @click="addInput" />
                <el-button :icon="Minus" @click="removeInput" />
            </el-form-item> -->
                    <el-divider content-position="left">情报抓取器配置</el-divider>
                    <el-form-item label="使用全局设置" label-width="150">
                        <el-space :size="8" spacer=" " wrap>
                            <el-switch v-model="newTask.crawl_option" />
                            <el-tooltip content="当首选项中开启[全局并发池]设置时，本开关不可编辑" raw-content>
                                <el-icon>
                                    <QuestionFilled />
                                </el-icon>
                            </el-tooltip>
                        </el-space>
                    </el-form-item>
                    <!-- <el-form-item label="抓取器选择" label-width="150" v-if="newTask.crawl_option==false">
                        <el-radio-group v-model="newTask.crawl_type">
                            <el-radio-button value="1">内置爬虫</el-radio-button>
                            <el-radio-button value="2">headless浏览器</el-radio-button>
                            <el-radio-button value="3">firecrawl</el-radio-button>
                        </el-radio-group>
                        <el-tooltip content="使用headless浏览器模式需要下载chromedriver文件到driver目录" raw-content>
                            <el-icon>
                                <QuestionFilled />
                            </el-icon>
                        </el-tooltip>
                    </el-form-item> -->
                    <el-form-item label="并发数" label-width="150" v-if="newTask.crawl_option==false">
                        <el-input-number v-model="newTask.concurrent_count" :min="1" :max="1024" @change="handleChange" style="width: 150px" />
                    </el-form-item>
                    <el-form-item label="抓取间隔(秒)" label-width="150" v-if="newTask.crawl_option==false">
                        <el-input-number v-model="newTask.scraping_interval" :min="1" :max="3600" @change="handleChange" style="width: 150px" />
                    </el-form-item>
                    <el-form-item label="全局抓取深度" label-width="150" v-if="newTask.crawl_option==false">
                        <el-input-number v-model="newTask.global_scraping_depth" :min="1" :max="99" @change="handleChange" style="width: 150px" />
                    </el-form-item>
                    <el-form-item label="每秒请求上限" label-width="150" v-if="newTask.crawl_option==false">
                        <el-input-number v-model="newTask.request_rate_limit" :min="1" :max="1024" @change="handleChange" style="width: 150px" />
                    </el-form-item>
                    <el-form-item label="使用代理IP池" label-width="150" v-if="newTask.crawl_option==false">
                        <el-space :size="8" spacer=" " wrap>
                            <el-switch v-model="newTask.crawlerIPPool" />
                            <el-tooltip content="需要先将准备好的IP列表文件放在本软件的proxyip目录下，每个IP用英文逗号隔开" raw-content>
                                <el-icon>
                                    <QuestionFilled />
                                </el-icon>
                            </el-tooltip>
                        </el-space>
                    </el-form-item>
                </div>
            </el-collapse-transition>
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
import { reactive, defineEmits, inject, ref } from "vue";
import { QuestionFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { get, post } from '../http'
const emit = defineEmits(["updateShow"]);
const getParentData = inject('getData'); // 注入父组件的方法
const cancel = () => {
    emit("updateShow", false);
};

const submit = () => {
    post("/task/create", newTask).then(res => {
        console.log(newTask);
        if (res.success) {
            ElMessage({
                message: '创建任务成功',
                type: 'success',
            })
            getParentData()
            newTask.value = initTask
            emit("updateShow", false);
        } else {
            ElMessage.error(res.message)
        }
    }).catch()
};

const crawl_url_placeholder = ref("网址以http://或https://为前缀，如果存在多个网址，每行一个网址")
const crawl_mode_label = ref("信息抓取网址")
// 方法：改变 placeholder
const changePlaceholder = (mode) => {
    if (mode == "1") {
        crawl_url_placeholder.value = '网址以http://或https://为前缀，如果存在多个网址，每行一个网址';
        crawl_mode_label.value = "信息抓取网址"
    } else if (mode == "2") {
        crawl_url_placeholder.value = '描述要获取的资料信息，大模型会根据你的描述搜索相关资料';
        crawl_mode_label.value = "搜索信息描述"
    }
};

// 初始化输入框数组
const showAdvancedSettings = ref(false)
// 添加输入框
// function addInput() {
//     contextIndexs.value.push('');
//     console.log(contextIndexs)
// }

// function removeInput() {
//     contextIndexs.value.splice(contextIndexs.value.length - 1, 1);
// }
const initTask = {
    archive_option: "1",  // 1新建档案 2选择档案
    archive_id: 0,  // 指定归档的档案ID
    task_name: "",  // 任务名称
    crawl_mode: "1",  // 抓取模式 1地址抓取 2描述搜索抓取
    crawl_url: "",  // 抓取地址，多个地址换行分割
    exec_type: "1",  // 执行类型 1-立即执行 2-周期循环
    cycle_type: "1",  // 周期类型 1-每日 2-每周
    week_days: [],  // 指定周几执行，可多选，英文逗号隔开
    exec_time: "",  // 执行时间
    enable_advanced_settings: false,
    enable_filter: false,  // 启用匹配过滤器 0关闭 1启用
    domain_match: "",  // 域名匹配过滤器 为空则不生效
    path_match: "",  // 路径匹配过滤器 为空则不生效
    crawl_option: true,  // 抓取器设置 0自定义 1全局
    crawl_type: "1",  // 抓取器选择 1 内置爬虫 2 headless浏览器 3 firecrawl
    concurrent_count: 5,  // 并发数
    scraping_interval: 0,  // 抓取间隔(秒)
    global_scraping_depth: 5,  // 抓取深度
    request_rate_limit: 100,  // 每秒请求上限
    use_proxy_ip_pool: false,  // 使用代理IP池
    api_settings_id: 1,  // API设置表ID
    extraction_model: "",  // API指定LLM模型
    // task_status: true,  // 任务状态 0关闭 1启用
    // extraction_mode: true,  // 抽取模式 1精准抽取 2智能抽取
    // created_at: "",  // 创建时间
    // updated_at: ""  // 更新时间
}

const newTask = reactive(initTask);

const archiveList = ref([])
const llmList = ref([])

// 获取数据
const getData = () => {
    get("/llm/list/grouping").then(res => {
        console.log(res);
        if (res.success) {
            llmList.value = res.data
        } else {
            ElMessage.error('加载Llm分组失败')
        }
    }).catch()
    get("/archive/list/select").then(res => {
        console.log(res);
        if (res.success) {
            archiveList.value = res.data
        } else {
            ElMessage.error('加载档案信息失败')
        }
    }).catch()
}
getData();
</script>

