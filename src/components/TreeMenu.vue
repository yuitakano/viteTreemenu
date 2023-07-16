<script setup>
import { ref, computed, toRef, reactive  } from "vue";
import TreeMenu from "./TreeMenu.vue";

const props = defineProps({
  name: String,
  children: Array,
  depth: Number,
});
let isShow = ref(false);
const canClick = computed(() => {
  return {
    category: props.children,
    book: !props.children,
  };
});
const indent = computed(() => {
  return {
    transform: `translate(${props.depth * 30}px)`,
  };
});

const toggleExpand = function () {
  isShow.value = !isShow.value;
};
</script>

<template>
  <div class="tree-menu">
    <div :style="indent" :class="canClick" @click="toggleExpand">
      {{ name }}
      <span v-if="children">&nbsp;{{ isShow ? "[-]" : "[+]" }}</span>
    </div>
    <tree-menu  v-if="isShow"
        v-for="(child, idx) in children"
        :children="child.children"
        :name="child.name"
        :level="level + 1"
        :key="`${idx}_${depth}`"
      >
      </tree-menu>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
