<template>
  <div class="terminal-wrapper" :style="wrapperStyle" @click="focusCommandInput">
    <!-- 终端主内容区域 -->
    <div ref="terminalRef" class="yq-terminal" :style="mainStyle">
      <div v-for="item in output" :key="item.id" class="terminal-output">
        <div class="input-line">{{ item.input }}</div>
        <div class="result-line">{{ item.result.message }}</div>
      </div>
      <div class="input-area">
        <span class="command-input-prompt"> {{ prompt }} </span>
        <a-input
          ref="commandInputRef"
          type="text"
          size="middle"
          :bordered="false"
          v-model:value="input"
          class="command-input"
          placeholder="输入命令"
          autofocus
          @press-enter="handleEnter"
        >
          <!-- <template #addonBefore>
                    
                </template> -->
        </a-input>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTerminalConfigStore } from '@/configs/terminalConfigStore'
import { computed, ref, type StyleValue, nextTick } from 'vue'
import { commandExecutor } from '@/core/commandExecutor'
const configStore = useTerminalConfigStore()
// 输入命令
const input = ref('')
const output = ref<any[]>([])
const commandInputRef = ref<any>(null)
// 前缀
const prompt = ref('[localhost]  ')
// 处理输入命令
const handleEnter = async () => {
  if (input.value.trim() === '') {
    return
  }

  const currentInput = input.value.trim()
  const result = await commandExecutor(currentInput, {
    clear: async () => {
      output.value = []
    },
    id: 0,
    input: '',
    result: {
      code: 0,
      message: '',
    },
  })
  output.value.push({
    id: Date.now(),
    input: prompt.value + currentInput,
    result,
  })
  console.log('handleEnter', input.value, document.activeElement)
  input.value = ''
  await nextTick()
  commandInputRef.value?.focus?.()
}
// 终端主样式
const mainStyle = computed(() => {
  const fullscreenStyle: StyleValue = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
  return fullscreenStyle
})
// 终端包装类主样式
const wrapperStyle = computed(() => {
  const { background } = configStore
  const style = {
    ...mainStyle.value,
  }
  return style
})
// 点击窗口聚焦输入框
const focusCommandInput = async (event?: MouseEvent) => {
  const target = event?.target as HTMLElement

  if (target?.closest('.command-input')) {
    return
  }
  console.log('click')
  await nextTick()
  commandInputRef.value?.focus?.()
}
</script>

<style scoped>
.terminal-wrapper {
  background: black;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5rem;
}
.terminal-output{
color: white;
  font-size: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.4;
  padding: 0;
}
.yq-terminal {
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  overflow: scroll;
}
.input-area {
  display: flex;
  color: white;
  align-items: center;
  gap: 10px;
  min-height: 50px;
}
.command-input {
  flex: 1;
  min-width: 0;
  font-size: 1.5rem;
  caret-color: white;
  font-size: 1.5rem;
}
:deep(.command-input.ant-input),
:deep(.command-input .ant-input) {
  color: white !important;
  font-size: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.4;
  padding: 0;
  background: transparent;
  caret-color: white;
}
.command-input :deep(.ant-input-group-addon) {
  background: none;
  border: none;
  padding: 0;
}
.command-input-prompt {
  flex: 0 0 auto;
  font-size: 1.5rem;
  color: white;
}
</style>
