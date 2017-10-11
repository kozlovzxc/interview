<template>
  <div class="container">
    <div class="row mt-3">
      <el-steps :space="100" :active="step" finish-status="success">
        <el-step title="Вопрос 1"></el-step>
        <el-step title="Вопрос 2"></el-step>
        <el-step title="Вопрос 3"></el-step>
      </el-steps>
    </div>
    <div class="row mt-3">
      <h2>
        Вопрос №{{step}}
      </h2>
    </div>
    <div class="row mt-3">
      <div class="col-md-2">
        <div class="row mt-1">
          <el-button class="w-100" type="primary" @click="nextQuestion()">Следующий вопрос</el-button>
        </div>
        <div class="row mt-1">
          <el-button class="w-100" @click="download()">Скачать запись</el-button>
        </div>
      </div>
      <div class="col-md-10">
        <video id="myVideo" class="video-js vjs-default-skin"></video>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./SurveyPage.component.ts"></script>
<style scoped lang="scss" src="./SurveyPage.component.scss"></style>
