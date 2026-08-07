<template>
  <div class="not-found-page">
    <section class="not-found-content">
      <div class="not-found-code">404</div>
      <h1>页面不存在</h1>
      <p>当前页面不存在或已被移动。</p>

      <div class="not-found-actions">
        <router-link class="not-found-primary" to="/home">返回首页</router-link>
        <button class="not-found-secondary" type="button" @click="goBack">返回上一页</button>
      </div>
    </section>
  </div>
</template>

<script setup>
function goBack() {
  if (window.history.length > 1) {
    window.history.back()
    return
  }

  window.location.hash = '#/home'
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  color: #111827;
  background: #f8fafc;
}

.not-found-content {
  width: min(100%, 520px);
  text-align: center;
}

.not-found-code {
  font-size: 72px;
  line-height: 1;
  font-weight: 800;
  color: #2563eb;
}

.not-found-content h1 {
  margin-top: 14px;
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
}

.not-found-content p {
  margin-top: 10px;
  font-size: 15px;
  line-height: 24px;
  color: #64748b;
}

.not-found-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.not-found-primary,
.not-found-secondary {
  min-width: 108px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  font-size: 14px;
  line-height: 20px;
  border-radius: 6px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.not-found-primary {
  color: #ffffff;
  background: #2563eb;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
}

.not-found-secondary {
  color: #334155;
  border: 1px solid #cbd5e1;
  background: #ffffff;
}

.not-found-primary:hover,
.not-found-secondary:hover {
  transform: translateY(-1px);
}

.not-found-secondary:hover {
  border-color: #94a3b8;
}

@media (max-width: 480px) {
  .not-found-code {
    font-size: 60px;
  }

  .not-found-actions {
    flex-direction: column;
  }

  .not-found-primary,
  .not-found-secondary {
    width: 100%;
  }
}
</style>
