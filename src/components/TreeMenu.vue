<script setup>
import { ref, computed, toRef } from 'vue'
import TreeMenu from './TreeMenu.vue'

defineProps({
  name: String,
  children: Array,
  level: Number
})

const isShow = ref(false)
const canClick = computed(() => {
  return {
    category: this.children,
    book: !this.children
  }
})
console.log(this.level, 'this.dept')
const computedlevel = toRef(this.level)
const indent = computed(() => {
  return {
    transform: `translate(${computedlevel * 30}px)`
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
      <span v-if="children">&nbsp;{{ isShow ? '[-]' : '[+]' }}</span>
    </div>
      <!-- <tree-menu  v-if="isShow"
        v-for="(child, idx) in children"
        :children="child.children"
        :name="child.name"
        :level="level + 1"
        :key="`${idx}_${depth}`"
      >
      </tree-menu> -->
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
