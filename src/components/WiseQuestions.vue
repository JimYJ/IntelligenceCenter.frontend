<template class="body">
    <div class="body">
        <el-row :gutter="20" justify="center">
            <el-col :span="24">
                AI对你的回答
            </el-col>
            <el-col :span="24" style="min-height: 300px;">
                <div class="box">
                    <el-input resize="none" v-model="textarea" :rows="4" type="textarea" placeholder="输入你想要的内容" />
                </div>
            </el-col>
        </el-row>
    </div>
    <!-- <el-affix :offset="120" style="text-align: center;" class="affix"> -->
    <el-card style="max-width: 80px" class="affix">
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
    </el-card>
    <!-- </el-affix> -->
</template>

<script  setup>
import { ref } from 'vue'
const textarea = ref('')
</script>

<style scoped>
.box {
    position: fixed;
    bottom: 30px;
    left: 30%;
    right: 30%;
    background-color: #f3f5fc !important;
    border-radius: 15px;
    padding: 6px !important;
    width: 800px;
    border: 1px solid #e2e2e2;
}
div /deep/ .el-textarea__inner {
    background-color: #f3f5fc !important;
    border-radius: 15px;
    border: 0px;
    box-shadow: none;
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
    right: 20px; /* 左侧定位 */
}
</style>

