<template>
    <el-drawer v-model="dialogFormVisible" title="LLM API设置" width="600" size="600">
        <el-form :model="option">
            <el-form-item label="LLM API选择" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-radio-group v-model="option.llmSelect">
                        <el-radio-button value="1">OpenAI API</el-radio-button>
                        <el-radio-button value="2">Ollama</el-radio-button>
                        <el-radio-button value="3">Siliconflow API</el-radio-button>
                    </el-radio-group>
                    <el-tooltip content="OpenAI API类型包含兼容OpenAI API的各种衍生API,例如Kimi API/oobabooga/LLM Studio等" raw-content>
                        <el-icon>
                            <QuestionFilled />
                        </el-icon>
                    </el-tooltip>
                </el-space>
            </el-form-item>
            <el-form-item label="LLM API配置" label-width="150">
                <el-space :size="8" spacer=" " wrap>
                    <el-input v-model="option.apiUrl" placeholder="API地址" style="width: 300px" />
                    <el-input v-model="option.apiSecret" placeholder="API秘钥" style="width: 300px" />
                    <el-tooltip content="例如:gpt-4o-2024-08-06" raw-content>
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

const emit = defineEmits(["updateShow"]);
const cancel = () => {
    emit("updateShow", false);
};

const submit = () => {
    emit("updateShow", false);
};

const option = reactive({
    llmSelect: "1", // 默认：OpenAI API 枚举值 1-OpenAI API 2-Ollama 3-Siliconflow API
    apiUrl: "",
    apiSecret: "",
});

</script>

