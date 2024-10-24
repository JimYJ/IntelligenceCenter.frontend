<template>
    <el-drawer v-model="dialogFormVisible" title="LLM API设置" width="600" size="600">
        <el-form :model="option">
            <el-form-item label="LLM API选择" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-radio-group v-model="llmSetting.api_type">
                        <el-radio-button value="1">OpenAI API</el-radio-button>
                        <el-radio-button value="2">Ollama</el-radio-button>
                        <el-radio-button value="3">Siliconflow API</el-radio-button>
                    </el-radio-group>
                    <el-tooltip content="OpenAI API类型包含兼容OpenAI API的各种衍生API,例如Qwen API/oobabooga/LLM Studio等" raw-content>
                        <el-icon>
                            <QuestionFilled />
                        </el-icon>
                    </el-tooltip>
                </el-space>
            </el-form-item>
            <el-form-item label="LLM API配置" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-input v-model="llmSetting.name" placeholder="配置名称" style="width: 300px" />
                    <el-input v-model="llmSetting.api_url" placeholder="API地址" style="width: 300px" />
                    <el-input v-model="llmSetting.api_key" placeholder="API秘钥" style="width: 300px" />
                    <el-input v-model="llmSetting.timeout" placeholder="超时(秒)" style="width: 140px" />
                    <el-input v-model="llmSetting.request_rate_limit" placeholder="并发限制(秒)" style="width: 140px" />
                    <el-input v-model="llmSetting.remark" placeholder="备注" style="width: 300px" />
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
import { post } from '../http'; // 导入封装的函数
import { ElMessage } from 'element-plus'
const emit = defineEmits(["updateShow"]);
const cancel = () => {
    emit("updateShow", false);
};

const submit = () => {
    post("/llm/add", llmSetting, null).then(res => {
        console.log(res);
        if (res.success) {
            ElMessage({
                message: '保存成功',
                type: 'success',
            })
            llmSetting.name = "";
            llmSetting.api_key = "";
            llmSetting.api_type = 1;
            llmSetting.api_url = "";
            llmSetting.remark = "";
            llmSetting.request_rate_limit = null
            llmSetting.timeout = null
        } else {
            ElMessage.error('保存失败')
        }
    }).catch()
    emit("updateShow", false);
};


const llmSetting = reactive({
    name: "",
    api_type: "1", // 默认：OpenAI API 枚举值 1-OpenAI API 2-Ollama 3-Siliconflow API
    api_url: "",
    api_key: "",
    timeout: null,
    request_rate_limit: null,
    remark: "",
});

</script>
