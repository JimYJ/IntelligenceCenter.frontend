<template>
    <div v-highlight v-html="renderedMarkdown" class="markdown"></div>
</template>
  
<script>
import { ref, watch } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

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
        // 监测 markdownText 的变化
        watch(() => props.markdownText, (newValue) => {
            renderedMarkdown.value = marked(newValue);
        }, { immediate: true });

        return {
            renderedMarkdown
        };
    }
};
// 创建指令highlightDirective 
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