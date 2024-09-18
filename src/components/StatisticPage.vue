<template>
    <el-container class="list-page">
        <el-page-header @back="onBack" style="width: 100%;">
            <template #breadcrumb>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">Intelligence Center</el-breadcrumb-item>
                    <el-breadcrumb-item>仪表盘</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">仪表盘</span>
                </div>
            </template>
            <template #extra>
                <div class="flex items-center">
                    <!-- <el-button>翻译</el-button> -->
                    <el-button type="primary" class="ml-2">刷新</el-button>
                </div>
            </template>
            <el-card shadow="never" body-style="background-color: #fcfcfc;">
                <el-row>
                    <el-col :span="6">
                        <el-statistic title="总任务数" :value="268500" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">总任务数</span>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic :value="138" title="正在执行的任务" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">正在执行的任务/总任务</span>
                            </template>
                            <template #suffix>/100</template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="已经抓取的情报" :value="outputValue" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">已经抓取的情报</span>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="已建档案" :value="562" value-style="font-size:30px">
                            <template #title>
                                <span style="font-size: 14px;font-weight: 100;">已建档案</span>
                            </template>
                        </el-statistic>
                    </el-col>
                </el-row>
            </el-card>
        </el-page-header>
    </el-container>
</template>
  
<script setup>
import { ref } from "vue";
import { useTransition } from "@vueuse/core";

const source = ref(0);
const outputValue = useTransition(source, {
    duration: 1500,
});
source.value = 172000;
</script>
  
<style scoped>
.el-col {
    text-align: center;
}
</style>