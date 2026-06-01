<template>
  <aside class="side-menu">
    <router-link to="/home">{{ $t('首页') }}</router-link>
    <router-link to="/about">{{ $t('关于') }}</router-link>
  </aside>
</template>

<script setup>

defineOptions({
  name: 'SideMenu'
})

</script>

<style scoped>
.side-menu {
  width: 200px;
  min-height: calc(100vh - 56px);
  background: #111827;
  padding: 16px 0;
}

.side-menu a {
  display: block;
  padding: 12px 20px;
  color: #cbd5e1;
  text-decoration: none;
}

.side-menu a.router-link-active {
  background: #2563eb;
  color: #fff;
}
</style>
