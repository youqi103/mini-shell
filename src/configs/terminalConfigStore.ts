import { defineStore } from "pinia";

export const useTerminalConfigStore = defineStore('terminalConfig',{
    state:()=>({
        background:'black',
    }),
})