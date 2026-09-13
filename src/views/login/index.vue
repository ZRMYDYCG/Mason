<script setup lang="ts">
import { ref } from 'vue'
import LandingStage from './components/landing-stage.vue'
import LandingHeader from './components/landing-header.vue'
import LandingHero from './components/landing-hero.vue'
import LandingTech from './components/landing-tech.vue'
import LandingDetails from './components/landing-details.vue'
import LandingOpensource from './components/landing-opensource.vue'
import LandingFooter from './components/landing-footer.vue'
import LoginDialog from './components/login-dialog.vue'

const loginVisible = ref(false)

const openLogin = () => {
  loginVisible.value = true
}
</script>

<template>
  <div class="landing">
    <LandingStage>
      <LandingHeader @use-now="openLogin" />
      <LandingHero @use-now="openLogin" />
    </LandingStage>
    <main>
      <LandingTech />
      <LandingDetails />
      <LandingOpensource />
    </main>
    <LandingFooter />
    <LoginDialog v-model="loginVisible" />
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  overflow-x: hidden;
  font-family: var(--font-family-sans);
  color: var(--text-primary);
  background: var(--bg-surface);
}

</style>
