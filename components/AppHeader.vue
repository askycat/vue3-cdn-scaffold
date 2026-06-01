<template>
  <header class="app-header">
    <div class="logo">Vue3 CDN Scaffold</div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  height: 56px;
  padding: 0 20px;
  background: #1f2937;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 18px;
  font-weight: 700;
}
</style>
