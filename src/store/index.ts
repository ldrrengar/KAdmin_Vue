/**
 * 当js或ts单独引用pinia时，需要本文件，不然报错。具体如下：
 * import piniaScript from '@/store/index'
 * import { app } from "@/store/app/app";
 * // appStore 可以在本文件中随意使用
 * const appStore = app(piniaScript);
 */
import { createPinia } from 'pinia';
const piniaScript = createPinia();
export default piniaScript;