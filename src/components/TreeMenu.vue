<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import TreeMenu from "./TreeMenu.vue";

const props = defineProps({
  name: String,
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

const toggleExpand = async () => {
  isShow.value = !isShow.value;
  await nextTick();
};
onMounted(async () => {
  console.log(props.children, "props.children");
  // isShow.value = props.children.children ? props.children.children.find((item) => {
  //   console.log(item ,'itemitemitem')
  //   return item.name === props.active
  // }) : props.children.name === props.active
  await nextTick();
  console.log(isShow.value, props.active, props.depth, "isShow.value");
});
</script>

<template>
  <div :class="['tree-menu', {}]">
    <div :style="indent" :class="canClick" @click="toggleExpand">
      {{ name }}
      <span v-if="children">&nbsp;{{ isShow ? "[-]" : "[+]" }}</span>
    </div>
    <tree-menu
      v-show="isShow"
      v-for="(child, idx) in children"
      :children="child.children"
      :name="child.name"
      :depth="depth + 1"
      :key="`${idx}_${depth + 1}`"
      :data-id="`${idx}_${depth + 1}`"
      :active="active"
    >
    </tree-menu>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
