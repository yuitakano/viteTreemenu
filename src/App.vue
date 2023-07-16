<script setup>
import { reactive, ref, computed, onMounted, watch } from "vue";
import TreeMenu from "./components/TreeMenu.vue";
const booklist = reactive([
  {
    name: "我的書櫃",
    isActive: false,
    children: [
      {
        name: "言情",
        isActive: false,
        children: [
          {
            name: "西方",
            isActive: false,
            children: [
              {
                name: "決戰王妃",
                isActive: false,
              },
              {
                name: "暮光之城",
                isActive: false,
              },
            ],
          },
          {
            name: "中國古風",
            isActive: false,
            children: [
              {
                name: "宮鬥",
                isActive: false,
                children: [
                  {
                    name: "甄嬛傳",
                    isActive: false,
                  },
                  {
                    name: "延禧攻略",
                    isActive: false,
                  },
                  {
                    name: "如懿傳",
                    isActive: false,
                  },
                ],
              },
              {
                name: "轉生",
                isActive: false,
                children: [
                  {
                    name: "神醫嫡女",
                    isActive: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "奇幻/科幻",
        isActive: false,
        children: [
          {
            name: "經典",
            isActive: false,
            children: [
              {
                name: "魔戒",
                isActive: false,
              },
              {
                name: "基地",
                isActive: false,
              },
              {
                name: "科學怪人",
                isActive: false,
              },
            ],
          },
          {
            name: "反烏托邦",
            isActive: false,
            children: [
              {
                name: "我們",
                isActive: false,
              },
              {
                name: "美麗新世界",
                isActive: false,
              },
            ],
          },
        ],
      },
      {
        name: "偵探",
        isActive: false,
        children: [
          {
            name: "福爾摩斯",
            isActive: false,
          },
        ],
      },
    ],
  },
  {
    name: "我的書櫃2",
    isActive: false,
    children: [
      {
        name: "言情2",
        isActive: false,
        children: [
          {
            name: "西方2",
            isActive: false,
            children: [
              {
                name: "決戰王妃2",
                isActive: false,
              },
              {
                name: "暮光之城2",
                isActive: false,
              },
            ],
          },
          {
            name: "中國古風2",
            isActive: false,
            children: [
              {
                name: "宮鬥2",
                isActive: false,
                children: [
                  {
                    name: "甄嬛傳2",
                    isActive: false,
                  },
                  {
                    name: "延禧攻略2",
                    isActive: false,
                  },
                  {
                    name: "如懿傳2",
                    isActive: false,
                  },
                ],
              },
              {
                name: "轉生2",
                isActive: false,
                children: [
                  {
                    name: "神醫嫡女2",
                    isActive: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "奇幻/科幻2",
        isActive: false,
        children: [
          {
            name: "經典2",
            isActive: false,
            children: [
              {
                name: "魔戒2",
                isActive: false,
              },
              {
                name: "基地2",
                isActive: false,
              },
              {
                name: "科學怪人2",
                isActive: false,
              },
            ],
          },
          {
            name: "反烏托邦2",
            isActive: false,
            children: [
              {
                name: "我們2",
                isActive: false,
              },
              {
                name: "美麗新世界2",
                isActive: false,
              },
            ],
          },
        ],
      },
      {
        name: "偵探2",
        isActive: false,
        children: [
          {
            name: "福爾摩斯2",
            isActive: false,
          },
        ],
      },
    ],
  },
]);
const depth = ref(0);
const flatten = (arr) => {
  const arr_ = arr.flatMap((i) => i.children);
  console.log(arr_ ,'arr_')
  return arr_;
};
const fltternMap = computed(() => {
  return flatten(booklist);
});

const active = ref("");
const activeId = ref('')
onMounted(() => {
  active.value = fltternMap.value[0].name;
  activeId.value = '0_0'
});
watch(active, (newVal, oldVal) => {
  // console.log(newVal, oldVal)
  const id = fltternMap.value.find((item)=> item.name === newVal && (item.isActive = true))
  console.log(id.isActive, fltternMap.value, 'id')
})
</script>

<template>
  <tree-menu
    v-for="(book, idx) in booklist"
    :name="book.name"
    :children="book.children"
    :depth="depth"
    :active="activeId"
    :data-id="`${idx}_${depth}`"
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
