<script setup>
import { ref, computed } from 'vue'

defineProps({
  name: String,
  children: Array,
  level: Number
})

const isShow = ref(false)
const canClick = computed(() => {
  return {
    category: '',
    book: true
  }
})
const indent = computed(() => {
  return {
    // transform: `translate(${this.level * 30}px)`
  }
})

const toggleExpand = function () {
  this.isShow = !this.isShow
}
</script>

<template>
  <div class="tree-menu">
    <div :style="indent" :class="canClick" @click="toggleExpand">
      {{ name }}
      // <span v-if="children">&nbsp;{{ isShow ? '[-]' : '[+]' }}</span>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
