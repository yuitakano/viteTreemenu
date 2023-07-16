<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import TreeMenu from "./TreeMenu.vue";

const props = defineProps({
  item: Object,
  children: Array,
  depth: Number,
  active: String,
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

const toggleExpand =  () => {
  isShow.value = !isShow.value;
  // if (isShow.value)
  // props.item.isActive = isShow.value
  
};
onMounted(async () => {
   await nextTick();
  if (props.children) {
    isShow.value = props.children.filter(item => {
      return item.isActive == true
    }).length > 0 || props.item.isActive

  } 
 
});
</script>

<template>
  <div :class="['tree-menu']">
    <div :style="indent" :class="canClick" @click="toggleExpand">
      {{ item.name }}
      <span v-if="children">&nbsp;{{ isShow ? "[-]" : "[+]" }}</span>
    </div>
    <tree-menu
      v-show="isShow"
      v-for="(child, idx) in children"
      :children="child.children"
      :item="child"
      :depth="depth + 1"
      :key="`${idx}_${depth + 1}`"
      :data-id="`${idx}_${depth + 1}`"
      :active="active"
    >
    </tree-menu>
  </div>
</template>

<style scoped>
</style>
