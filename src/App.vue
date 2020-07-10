<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App'
}
</script>
<style>
  .el-input--small .el-input__inner {
    height: 40px;
    line-height: 32px;
  }
textarea{
  min-height: 100px;
}
</style>
