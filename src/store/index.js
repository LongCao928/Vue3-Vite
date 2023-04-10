import { useUserStore } from '@/store/modules/user'
import { useMenuStore } from '@/store/modules/menu'

const appStore = {}

/* 注册 store 状态库
 */
export const registerStore = () => {
  appStore.userModule = useUserStore()
  appStore.menuModule = useMenuStore()
}

export default appStore
