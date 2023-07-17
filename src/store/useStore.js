import { reactive } from "vue";
const defauleActive = localStorage.getItem('active') || ''
const store = reactive({
    state: {
        booklist: [
            {
                name: '我的書櫃',
                isActive: false,
                children: [
                    {
                        name: '言情',
                        isActive: false,
                        children: [
                            {
                                name: '西方',
                                isActive: false,
                                children: [
                                    {
                                        name: '決戰王妃',
                                        isActive: false
                                    },
                                    {
                                        name: '暮光之城',
                                        isActive: false
                                    }
                                ]
                            },
                            {
                                name: '中國古風',
                                isActive: false,
                                children: [
                                    {
                                        name: '宮鬥',
                                        isActive: false,
                                        children: [
                                            {
                                                name: '甄嬛傳',
                                                isActive: false
                                            },
                                            {
                                                name: '延禧攻略',
                                                isActive: false
                                            },
                                            {
                                                name: '如懿傳',
                                                isActive: false
                                            }
                                        ]
                                    },
                                    {
                                        name: '轉生',
                                        isActive: false,
                                        children: [
                                            {
                                                name: '神醫嫡女',
                                                isActive: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '奇幻/科幻',
                        isActive: false,
                        children: [
                            {
                                name: '經典',
                                isActive: false,
                                children: [
                                    {
                                        name: '魔戒',
                                        isActive: false
                                    },
                                    {
                                        name: '基地',
                                        isActive: false
                                    },
                                    {
                                        name: '科學怪人',
                                        isActive: false
                                    }
                                ]
                            },
                            {
                                name: '反烏托邦',
                                isActive: false,
                                children: [
                                    {
                                        name: '我們',
                                        isActive: false
                                    },
                                    {
                                        name: '美麗新世界',
                                        isActive: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '偵探',
                        isActive: false,
                        children: [
                            {
                                name: '福爾摩斯',
                                isActive: false
                            }
                        ]
                    }
                ]
            },
            {
                name: '我的書櫃2',
                isActive: false,
                children: [
                    {
                        name: '言情2',
                        isActive: false,
                        children: [
                            {
                                name: '西方2',
                                isActive: false,
                                children: [
                                    {
                                        name: '決戰王妃2',
                                        isActive: false
                                    },
                                    {
                                        name: '暮光之城2',
                                        isActive: false
                                    }
                                ]
                            },
                            {
                                name: '中國古風2',
                                isActive: false,
                                children: [
                                    {
                                        name: '宮鬥2',
                                        isActive: false,
                                        children: [
                                            {
                                                name: '甄嬛傳2',
                                                isActive: false
                                            },
                                            {
                                                name: '延禧攻略2',
                                                isActive: false
                                            },
                                            {
                                                name: '如懿傳2',
                                                isActive: false
                                            }
                                        ]
                                    },
                                    {
                                        name: '轉生2',
                                        isActive: false,
                                        children: [
                                            {
                                                name: '神醫嫡女2',
                                                isActive: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '奇幻/科幻2',
                        isActive: false,
                        children: [
                            {
                                name: '經典2',
                                isActive: false,
                                children: [
                                    {
                                        name: '魔戒2',
                                        isActive: false
                                    },
                                    {
                                        name: '基地2',
                                        isActive: false
                                    },
                                    {
                                        name: '科學怪人2',
                                        isActive: false
                                    }
                                ]
                            },
                            {
                                name: '反烏托邦2',
                                isActive: false,
                                children: [
                                    {
                                        name: '我們2',
                                        isActive: false
                                    },
                                    {
                                        name: '美麗新世界2',
                                        isActive: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '偵探2',
                        isActive: false,
                        children: [
                            {
                                name: '福爾摩斯2',
                                isActive: false
                            }
                        ]
                    }
                ]
            }
        ],
        active: defauleActive
    },
});

const setBookList =  (booklist) => {
    store.state.booklist = booklist;
};


export const useBookStore = () => ({
    store,
    setBookList,
});
