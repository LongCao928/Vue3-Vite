
import { defineStore } from "pinia"
import { reactive,toRefs } from "vue"


export const useMenuStore = defineStore('menu', () => {
    const data = reactive({
        isCollapse: false,
        menu: [
            {
                title: '房源',
                index: '/house',
                icon: 'icon-house'
            },
            {
                title: '合同列表',
                index: '/concart',
                icon: 'icon-concart'
            },
            {
                title: '菜单',
                index: '1',
                children: [
                    {
                        title: '子菜单1',
                        index: '/children-menu1'
                    },
                    {
                        title: '子菜单2',
                        index: '/children-menu2'
                    },
                ]
            }
        ]
    })

    const getIsCollapse = () => {
        return data.isCollapse
    }

    const changeCollapse = () => {
        data.isCollapse = !data.isCollapse
    }

    return { ...toRefs(data), getIsCollapse, changeCollapse }
})