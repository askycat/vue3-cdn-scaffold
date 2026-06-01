<template>
  <div class="not-found">
    <h2>404</h2>
    <p>页面不存在</p>

    <router-link to="/home">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  padding: 40px;
  text-align: center;
}
</style>
