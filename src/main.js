import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { highlightDirective } from './components/MarkdownHighlighter.vue'; // 根据实际路径修改

const app = createApp(App);
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
});
//注册v-highlight全局指令
app.directive('highlight', highlightDirective);
app.mount('#app');
// 以下代码解决ResizeObserver在浏览器改变大小时报错
const debounce = (fn, delay) => {
    let timer
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
        callback = debounce(callback, 200);
        super(callback);
    }
}
