<template>
  <div class="container">
    <el-button @click="visible = true">Button</el-button>
    <el-dialog v-model="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./Hello.component.ts"></script>
<style scoped lang="scss" src="./Hello.component.scss"></style>
