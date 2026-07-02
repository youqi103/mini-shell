import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        // 背景颜色
        background: "black",
    }),
    getters: {
       
    },
    persist: {
        key: "user-store",
        storage: window.sessionStorage,
    },
    actions: {
        setBackground(url:string){
            if(!url){
                return;
            }
            this.background = url;
        },
        
    }

});