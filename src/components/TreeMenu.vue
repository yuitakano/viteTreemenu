<!-- @format -->

<script setup>
    import { ref, computed, onMounted, nextTick } from 'vue'
    import TreeMenu from './TreeMenu.vue'

    const props = defineProps({
        item: Object,
        children: Array,
        depth: Number,
    })
    const emit = defineEmits(['change'])
    let isShow = ref(false)
    const canClick = computed(() => {
        return {
            category: props.children,
            book: !props.children,
        }
    })
    const indent = computed(() => {
        return {
            transform: `translate(${props.depth * 30}px)`,
        }
    })

    const findDeep = (arr, val) => {
        console.log(arr, Array.isArray(arr))
        return arr.find((item) => {
            if (item.name === val) {
                item.isActive = true
            } else {
                findDeep(item.children, val)
            }
            return item
        })
    }

    const toggleExpand = async () => {
        // isShow.value = !isShow.value
        props.item.isActive = !props.item.isActive
        emit('change', props.item)
    }
    const handleChange = (item) => {
        console.log('item: ', item);
       props.item.isActive = true
    }
    onMounted(async () => {
        // await nextTick()
        // isShow.value = props.item.isActive
    })
</script>

<template>
    <div :class="['tree-menu']">
        <div
            :style="indent"
            :class="canClick"
            @click="toggleExpand">
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
            @change="handleChange">
        </tree-menu>
    </div>
</template>

<style scoped></style>
