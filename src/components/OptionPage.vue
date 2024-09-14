<template>
    <el-container class="list-page">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">情报中心</el-breadcrumb-item>
                <el-breadcrumb-item><a href="./page-header.html">情报档案</a></el-breadcrumb-item>
                <el-breadcrumb-item>档案列表</el-breadcrumb-item>
            </el-breadcrumb>
            <template #content>
                <div class="flex gap-4">
                    <div>
                    <div class="sub-title my-2 text-sm text-gray-600">
                        list suggestions when activated
                    </div>
                    <el-autocomplete
                        v-model="state1"
                        :fetch-suggestions="querySearch"
                        clearable
                        class="inline-input w-50"
                        placeholder="Please Input"
                        @select="handleSelect"
                    />
                    </div>
                </div>
        </template>
    </el-container>
</template>

<script setup>
</script>

<style scoped>
.pagination-block{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
