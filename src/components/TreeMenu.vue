<!-- @format -->

<script setup>
import { ref, computed, onMounted, nextTick, toRef } from 'vue'
import TreeMenu from './TreeMenu.vue'
import { useBookStore } from '../store/useStore'
const { store: bookStore, updateActive } = useBookStore()

const props = defineProps({
  item: Object,
  children: Array,
  depth: Number,
})
const emit = defineEmits(['change'])

const active = toRef(bookStore.state.active)
let isShow = ref(false)
const canClick = computed(() => {
  return {
    category: props.children,
    book: !props.children
  }
})
const indent = computed(() => {
  return {
    transform: `translate(${props.depth * 30}px)`
  }
})

const findDeep = (arr, val) => {
  console.log(arr, Array.isArray(arr))
  return arr.find(item => {
    if (item.name === val) {
      item.isActive = true
    } else {
      findDeep(item.children, val)
    }
    return item
  })
}

const toggleExpand = () => {
  isShow.value = !isShow.value
  props.item.isActive = !props.item.isActive
  emit('change', props.item)
}
const handleChange = item => {
  console.log('item: ', item)
  props.item.isActive = true
  updateActive(props.item.name)
  console.log()
  emit('change', item)
}
onMounted(async () => {
  // await nextTick()
  // isShow.value = props.item.isActive
})
</script>

<template>
  <div :class="['tree-menu', { actived: active == item.name }]">
    <div :style="indent" :class="canClick" @click="toggleExpand">
      {{ item.name }}
      <span v-if="children">&nbsp;{{ item.isActive ? '[-]' : '[+]' }}</span>
    </div>
    <tree-menu
      v-show="item.isActive"
      v-for="(child, idx) in children"
      :children="child.children"
      :item="child"
      :depth="depth + 1"
      :key="`${idx}_${depth + 1}`"
      :data-id="`${idx}_${depth + 1}`"
      :active="active"
      @change="handleChange"
    >
    </tree-menu>
  </div>
</template>

<style scoped lang="scss">
.tree-menu {
  font-size: 20px;
  display: block;
  &.actived > .category {
    color: yellow;
    background: black;
  }
  &.hide {
    display: none;
  }
  cursor: pointer;
  .category {
    color: #a49393;
  }
  .book {
    color: #67595e;
  }
}
</style>
