<template>
    <el-drawer v-model="dialogFormVisible" title="首选项" width="650" size="650">
        <el-form :model="option">
            <el-divider content-position="left">数据库配置</el-divider>
            <el-form-item label="数据存储模式" label-width="150">
                <el-radio-group v-model="option.dbSelect">
                    <el-radio-button value="1">SQlLite</el-radio-button>
                    <el-radio-button value="2">pocketbase</el-radio-button>
                    <el-radio-button value="3">mysql</el-radio-button>
                    <el-radio-button value="4">clickhouse</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="数据库设置" class="flex gap-8 mb-4 items-center" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-input v-model="option.dbIP" placeholder="IP/域名" style="width: 300px" />
                    <el-input v-model="option.dbPort" placeholder="端口" style="width: 80px" />
                    <el-input v-model="option.dbAccount" placeholder="账号" style="width: 300px" />
                    <el-input v-model="option.dbPass" placeholder="密码" style="width: 300px" />
                    <el-tooltip content="首次连接会初始化数据库" raw-content>
                        <el-icon>
                            <QuestionFilled />
                        </el-icon>
                    </el-tooltip>
                </el-space>
            </el-form-item>
            <el-divider content-position="left">情报抓取器配置</el-divider>
            <el-form-item label="抓取器选择" label-width="150">
                <el-radio-group v-model="option.crawlerSelect">
                    <el-radio-button value="1">内置爬虫</el-radio-button>
                    <el-radio-button value="2">headless浏览器
                        <el-tooltip content="使用headless浏览器模式需要下载chromedriver文件到driver目录" raw-content>
                            <el-icon>
                                <QuestionFilled />
                            </el-icon>
                        </el-tooltip></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="并发数" label-width="150">
                <el-input-number v-model="option.crawlerConcurrency" :min="1" :max="1024" @change="handleChange" style="width: 150px" />
            </el-form-item>
            <el-form-item label="抓取间隔(秒)" label-width="150">
                <el-input-number v-model="option.crawlerDelay" :min="1" :max="3600" @change="handleChange" style="width: 150px" />
            </el-form-item>
            <el-form-item label="全局抓取深度" label-width="150">
                <el-input-number v-model="option.crawlerMaxDepth" :min="1" :max="99" @change="handleChange" style="width: 150px" />
            </el-form-item>
            <el-form-item label="每秒请求上限" label-width="150">
                <el-input-number v-model="option.crawlerRateLimit" :min="1" :max="1024" @change="handleChange" style="width: 150px" />
            </el-form-item>
            <el-form-item label="启动虚拟IP" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-switch v-model="option.crawlerVirtualIP" />
                    <el-tooltip content="虚拟IP只对少部分网站有效，如果无效被限制访问，则需要配置代理IP池" raw-content>
                        <el-icon>
                            <QuestionFilled />
                        </el-icon>
                    </el-tooltip>
                </el-space>
            </el-form-item>
            <el-form-item label="使用代理IP池" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-switch v-model="option.crawlerIPPool" />
                    <el-tooltip content="需要先将准备好的IP列表文件放在本软件的proxyip目录下，每个IP用英文逗号隔开" raw-content>
                        <el-icon>
                            <QuestionFilled />
                        </el-icon>
                    </el-tooltip>
                </el-space>
            </el-form-item>
            <el-form-item label="全局并发池" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-switch v-model="option.crawlerConcurrencyOnly" />
                    <el-tooltip content="低配置电脑以及CPU过高的情况可开启本设置，开启后多个任务同时抓取时进度将变慢" raw-content>
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
import { reactive, defineEmits } from "vue";
import { QuestionFilled } from '@element-plus/icons-vue'
const emit = defineEmits(["updateShow"]);

const cancel = () => {
    emit("updateShow", false);
};

const submit = () => {
    emit("updateShow", false);
};

const option = reactive({
    dbSelect: "1", // 默认：SQlLite 枚举值 1-SQlLite 2-pocketbase 3-mysql(支持协议的分布式数据库) 4-clickhouse
    llmSelect: "1", // 默认：OpenAI API 枚举值 1-OpenAI API 2-Ollama 3-Siliconflow API
    crawlerSelect: "1", // 默认：内置爬虫 枚举值 1-内置爬虫 API 2-headless浏览器
    dbIP: "",
    dbPort: "",
    dbName: "",
    dbAccount: "",
    dbPass: "",
    crawlerConcurrency: 5,
    crawlerDelay: 0,
    crawlerMaxDepth: 5,
    crawlerRateLimit: 100,
    crawlerVirtualIP: true,
    crawlerIPPool: false,
    crawlerConcurrencyOnly: false,
});
</script>
