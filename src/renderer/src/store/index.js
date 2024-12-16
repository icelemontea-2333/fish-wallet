import useAnimationStore from './modules/animation.js'
import useGlobalStore from './modules/global.js'
 
// 统一导出useStore方法
export default function useStore() {
  return {
    animation: useAnimationStore(),
    global: useGlobalStore()
  }
}