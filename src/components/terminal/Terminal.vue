<template>
    <div class="terminal-wrapper" :style="wrapperStyle">
        <!-- 终端主内容区域 -->
       <div ref="terminalRef" class="yq-terminal" :style="mainStyle">
           <div v-for="item in output" :key="item.id" class="terminal-output">
                <div class="input-line">{{ item.input }}</div>
                <div class="result-line">{{ item.result.message }}</div>
           </div>
          <div class="input-area">
            <span>youqi:</span>
            <input type="text" placeholder="请输入命令" v-model="input" @keyup.enter="handleEnter">
          </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useTerminalConfigStore } from '@/configs/terminalConfigStore'
import { computed, ref, type StyleValue } from 'vue'
import { commandExecutor } from '@/core/commandExecutor'
const configStore = useTerminalConfigStore()
// 输入命令
const input = ref('');
const output = ref<any[]>([]);

// 处理输入命令
const handleEnter = async () =>{
    if(input.value.trim() === ''){
        return;
    }
    const currentInput = input.value.trim();
    const result = await commandExecutor(currentInput,{
        clear: async () => {
            output.value = [];
        },
        id: 0,
        input: '',
        result: {
            code:0,
            message:'',
        }
    });
    output.value.push({
        id:Date.now(),
        input:currentInput,
        result
    })
    input.value = '';
}
// 终端主样式
const mainStyle = computed(()=>{
    const fullscreenStyle:StyleValue = {
        position:'fixed',
        top:0,
        left:0,
        bottom:0,
        right:0,
    }
    return fullscreenStyle
})
// 终端包装类主样式
const wrapperStyle = computed(()=>{
    const {background} =configStore;
    const style = {
        ...mainStyle.value,
    }
    return style
})
</script>

<style scoped>
.terminal-wrapper {
    background: black;
}
.yq-terminal {
    color:white;
    background: rgba(0, 0, 0, 0.6);
    padding: 20px;
    overflow: scroll;
}
</style>