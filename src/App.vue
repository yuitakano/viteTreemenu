<script setup>
import { reactive, ref } from 'vue'
// import TreeMenu from './components/TreeMenu.vue'
import HelloWorld from './components/HelloWorld.vue'
const booklist = reactive({
  name: '我的書櫃',
  children: [
    {
      name: '言情',
      children: [
        {
          name: '西方',
          children: [
            {
              name: '決戰王妃'
            },
            {
              name: '暮光之城'
            }
          ]
        },
        {
          name: '中國古風',
          children: [
            {
              name: '宮鬥',
              children: [
                {
                  name: '甄嬛傳'
                },
                {
                  name: '延禧攻略'
                },
                {
                  name: '如懿傳'
                }
              ]
            },
            {
              name: '轉生',
              children: [
                {
                  name: '神醫嫡女'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: '奇幻/科幻',
      children: [
        {
          name: '經典',
          children: [
            {
              name: '魔戒'
            },
            {
              name: '基地'
            },
            {
              name: '科學怪人'
            }
          ]
        },
        {
          name: '反烏托邦',
          children: [
            {
              name: '我們'
            },
            {
              name: '美麗新世界'
            }
          ]
        }
      ]
    },
    {
      name: '偵探',
      children: [
        {
          name: '福爾摩斯'
        }
      ]
    }
  ]
})
const depth = ref(0)
</script>

<template>
  <!-- <tree-menu
    :name="booklist.name"
    :children="booklist.children"
    :depth="depth"
  /> -->
  <HelloWorld :name="booklist.name" />
  {{booklist}}
  {{depth}}
</template>

<style scoped lang="scss">
#app {
  display: flex;
  justify-content: center;
  .tree-menu {
    font-size: 20px;
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
