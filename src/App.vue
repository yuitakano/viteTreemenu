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
                    return (item.children && flatten(item.children, deep === 0 ? id : gId, deep)) || item
                }),
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
    const handleChange = async (item) => {
        console.log({ item }, 'app change')
        item.isActive = true
        console.log(fltternMap, 'fltternMap')
        // fltternMap.value.map((_item) => {
        //     console.log(_item, '_item')
        //     if (_item.name === item.name) {
        //         active.value = _item.name
        //     }
        //     console.log(_item.gId === item.gId, ' _item.gId === item.gId')
        //     return (_item.isActive = _item.gId === item.gId)
        // })
        await nextTick()
        randomId.value = Math.random() * 100
    }
    onMounted(() => {
        active.value =
            fltternMap.value.find((item) => item.name === active.value && (item.isActive = true))?.name ||
            fltternMap.value[0].name
        console.log(active, 'active')
    })
    watch(active, (newVal, oldVal) => {
        console.log(newVal, oldVal)
        const activeObj =  fltternMap.value.find((item) => item.name === newVal)
        console.log(activeObj, 'activeObj')
        const id = fltternMap.value.map((item) => {
            if (item.gId === activeObj.gId  && item.deep <= activeObj.deep) {
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
        ref="MainTreeMenu" />
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
