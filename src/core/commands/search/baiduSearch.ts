import type { CommandType,CommandContext } from "../type";

export const baiduSearchCommand:CommandType = {
    name:'baidu',
    alias:['bd'],
    description:'百度搜索',
    usage:'baidu <query>',
    execute:(args:string[],context:CommandContext)=>{
       const keyword = args[0];
       if(!keyword){
           return {
               code:1,
               message:'请输入搜索关键词',
           }
       }
       window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}`);
       return {
           code:0,
           message:'搜索成功',
       }
    }
}