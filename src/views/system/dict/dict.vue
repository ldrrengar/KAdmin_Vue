<!-- 字典管理 -->
<template>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="字典名称">
      <el-input v-model="formInline.user" placeholder="字典名称" clearable />
    </el-form-item>
    <el-form-item label="字典类型">
      <el-input v-model="formInline.user" placeholder="字典类型" clearable />
    </el-form-item>
    <el-form-item label="字典状态">
      <el-select
        v-model="formInline.region"
        placeholder="字典状态"
        clearable
      >
        <el-option label="正常" value="1" />
        <el-option label="禁用" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker
        v-model="formInline.date"
        type="daterange"
        placeholder="创建时间"
        clearable
      />
    </el-form-item>
    <el-form-item>      
      <el-button type="primary" icon="Search" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const handleSearch = () => {
  console.log('submit!')
}
</script>