<!-- @format -->

<script setup>
import { reactive, ref, computed, onMounted, watch, nextTick, toRef } from 'vue'
import TreeMenu from './components/TreeMenu.vue'
import { useBookStore } from './store/useStore'
const { store: bookStore, setBookList } = useBookStore()
const booklist = bookStore.state.booklist
const depth = ref(0)
const flatten = (arr, gId = -1, deep = 0) => {
  if (Array.isArray(arr)) {
    gId != -1 && deep++
    const res = [].concat.apply(
      arr,
      arr.map((item, id) => {
        item.gId = deep === 0 ? id : gId
        item.deep = deep
        return (
          (item.children &&
            flatten(item.children, deep === 0 ? id : gId, deep)) ||
          item
        )
      })
    )
    return res
  }
  // return Array.isArray(arr) ?  : [arr]
}

const fltternMap = computed(() => {
  return flatten(booklist)
})

const active = toRef(bookStore.state.active)
const activeId = ref('')

const randomId = ref(0)
const handleChange =  item => {
  console.log({ item }, 'app change')
  // item.isActive = !item.isActive
  active.value = item.name
  // fltternMap.value.map((_item) => {
  //     console.log(_item, '_item')
  //     if (_item.name === item.name) {
  //         active.value = _item.name
  //     }
  //     console.log(_item.gId === item.gId, ' _item.gId === item.gId')
  //     return (_item.isActive = _item.gId === item.gId)
  // })
  // await nextTick()
}
onMounted(() => {
  const defauleActive = localStorage.getItem('active') || ''
  active.value =
    fltternMap.value.find(
      item => item.name === defauleActive && (item.isActive = true)
    )?.name || fltternMap.value[0].name
  console.log(active, 'active')
})
watch(active, (newVal, oldVal) => {
  console.log(newVal, oldVal)
  const activeObj = fltternMap.value.find(item => item.name === newVal)
  console.log(activeObj, 'activeObj')
  const id = fltternMap.value.map(item => {
    if (item.gId === activeObj.gId && item.deep < activeObj.deep || item.deep === activeObj.deep && item.name === activeObj.name ) {
      item.isActive = true
    } else {
      item.isActive = false
    }

    // setBookList(booklist)
    // console.log(item, 'booklist')
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
    :data-id="`${idx}_${depth}_${randomId}`"
    @change="handleChange"
    :active="active"
    ref="MainTreeMenu"
  />
  <select v-model="active">
    <option v-for="item in fltternMap">{{ item.name }}</option>
  </select>
</template>

<style scoped lang="scss">
#app {
  display: flex;
  justify-content: center;
}
</style>
