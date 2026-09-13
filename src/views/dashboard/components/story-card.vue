<script setup lang="ts">
import AppIcon from '@/components/app-icon/index.vue'
import storyImg from '@/assets/images/dashboard/mason-interior-story.jpg'

const watchStory = () => {
  window.open('https://mason.versakit.online', '_blank')
}
</script>

<template>
  <section class="story" :style="{ backgroundImage: `url(${storyImg})` }">
    <div class="veil" />
    <div class="content">
      <h3>Design for a more human tomorrow.</h3>
      <button type="button" class="play" @click="watchStory">
        <span class="play-icon">
          <AppIcon name="play" :size="16" />
        </span>
        Watch Our Story
      </button>
    </div>
  </section>
</template>

<style scoped>
.story {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 280px;
  padding: 28px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  border: var(--box-border);
  border-radius: var(--radius-2xl);
  box-shadow: var(--box-shadow);
}

.veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(0 0 0 / 15%) 0%, rgb(0 0 0 / 62%) 100%);
}

.content {
  position: relative;
  z-index: 1;
}

.content h3 {
  max-width: 14ch;
  margin: 0 0 18px;
  font-size: clamp(22px, 1.8vw, 28px);
  font-weight: 650;
  line-height: 1.25;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.play {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  padding: 0;
  font-size: 13px;
  font-weight: 550;
  color: #ffffff;
  cursor: pointer;
  background: none;
  border: none;
}

.play-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #111111;
  background: #ffffff;
  border-radius: var(--radius-full);
}
</style>
