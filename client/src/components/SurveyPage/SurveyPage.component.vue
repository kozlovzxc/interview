<template>
  <div class="container">
    <el-button @click="visible = true">Button</el-button>
    <el-dialog v-model="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./SurveyPage.component.ts"></script>
<style scoped lang="scss" src="./SurveyPage.component.scss"></style>
