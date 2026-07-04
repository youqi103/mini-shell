import type { CommandType,CommandContext } from "../type";

export const clearCommand:CommandType = {
    name:'clear',
    alias:['cls'],
    description:'清除终端',
    usage:'clear',
    execute:async (args:string[],context:CommandContext)=>{   
         setTimeout(async ()=>{
            await context.clear();
         },0)
        return {
            code:0,
            message:'清除成功',
        }
    }
}