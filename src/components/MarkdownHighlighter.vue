<template>
    <div v-highlight v-html="renderedMarkdown" class="markdown"></div>
</template>

<script>
import { ref, watch } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/edge-light.css';
import { h } from 'vue'
import { ElMessage } from 'element-plus'

export default {
    name: 'MarkdownHighlighter',
    props: {
        markdownText: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const renderedMarkdown = ref('');

        // 复制到剪贴板的方法
        const copyToClipboard = (code) => {
            navigator.clipboard.writeText(code).then(() => {
                // console.log(code)
                ElMessage({
                    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
                        h('span', null, '复制成功'),
                    ]),
                })
            }).catch(err => {
                console.error('复制失败:', err);
            });
        };
        // 添加复制按钮的方法
        const addCopyButtons = () => {
            // 确保在DOM更新后调用
            setTimeout(() => {
                const blocks = document.querySelectorAll('.markdown pre');
                blocks.forEach((block) => {
                    if (!block.querySelector('.copy-button')) { // 检查按钮是否已存在
                        const code = block.querySelector('code').innerText;
                        const copyButton = document.createElement('div');
                        copyButton.innerText = '复制代码';
                        copyButton.className = "copy-button";
                        copyButton.style = "color: #2a598a;width :100%;text-align: right;cursor: pointer; "
                        copyButton.onclick = () => {
                            copyToClipboard(code);
                        };
                        block.insertBefore(copyButton, block.firstChild);
                    }
                });
            });
        };
        // 监测 markdownText 的变化
        watch(() => props.markdownText, (newValue) => {
            renderedMarkdown.value = marked(newValue);
            addCopyButtons(); // 每次更新时添加复制按钮
        }, { immediate: true });

        // 初始化时添加复制按钮
        addCopyButtons();

        return {
            renderedMarkdown,
            addCopyButtons, // 暴露 addCopyButtons 方法
            copyToClipboard  // 暴露 copyToClipboard 方法
        };
    }
};

// 创建指令 highlightDirective 
const highlightDirective = {
    beforeMount(el) {
        highlightCode(el);
    },
    updated(el) {
        highlightCode(el);
    }
};

function highlightCode(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    });
}

export { highlightDirective };
</script>

<style scoped>
.copy-button {
    background-color: #007bff; /* 按钮背景颜色 */
    color: white; /* 字体颜色 */
    border: none; /* 无边框 */
    padding: 5px 10px; /* 内边距 */
    border-radius: 3px; /* 圆角 */
    cursor: pointer; /* 鼠标样式 */
    margin-bottom: 5px; /* 底部间距 */
}

.copy-button:hover {
    background-color: #0056b3; /* 悬停时背景颜色 */
}
</style>
