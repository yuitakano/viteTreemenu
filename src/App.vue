<script setup>
import { reactive, ref, computed, onMounted, watch, nextTick, toRef } from 'vue'
import TreeMenu from './components/TreeMenu.vue'
import { useBookStore } from './store/useStore'
const { store: bookStore, setBookList } = useBookStore()
const booklist = bookStore.state.booklist
const depth = ref(0)
const flatten = arr => {
  if (Array.isArray(arr)) {
    const res = [].concat.apply(
      arr,
      arr.map((item, id) => {
        return item.children ? flatten(item.children) : { ...item}
      })
    )
    return res
  } else {
    return arr
  }
  // return Array.isArray(arr) ?  : [arr]
}

const fltternMap = computed(() => {
  return flatten(booklist)
})

const active = toRef(bookStore.state.active)
const activeId = ref('')
const handleChange = (item) => {
  console.log({item}, 'app change')
  item.isActive = true
    fltternMap.value.find(_item => _item.name === item.name && (_item.isActive = true))
    console.log(booklist, 'change')
}
onMounted(() => {
  active.value =
    fltternMap.value.find(item => item.name === active.value && (item.isActive = true))?.name ||
    fltternMap.value[0].name
  console.log(active, 'active')
})
watch(active,  (newVal, oldVal) => {
  console.log(newVal, oldVal)
  const id = fltternMap.value.map( item => {
    if (item.name === newVal) {
      item.isActive = true
    } else {
      item.isActive = false
    }

    setBookList(booklist)
    console.log(item, 'booklist')
    return item
  })
  localStorage.setItem('active', newVal)
  console.log(id, fltternMap.value, 'id')
})
</script>

<template>
  <tree-menu
    v-for="(book, idx) in booklist"
    :item="book"
    :children="book.children"
    :depth="depth"
    :data-id="`${idx}_${depth}`"
      @change="handleChange"
  />
  <select v-model="active">
    <option v-for="item in fltternMap">{{ item.name }}</option>
  </select>
</template>

<style scoped lang="scss">
#app {
  display: flex;
  justify-content: center;
  .tree-menu {
    font-size: 20px;
    display: block;
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
}
</style>
