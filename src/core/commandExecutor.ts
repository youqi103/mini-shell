import type { CommandType,CommandContext } from "@/commands/type";
import { parseInput } from "./parseCommand";
import { getCommand } from "./commandRegister";
export const commandExecutor = async (input:string,context:CommandContext)=>{
    const {commandName,args} = parseInput(input);
    const command = getCommand(commandName as string);
    if(!command){
        return {
            code:1,
            message:`命令${commandName}不存在`,
        }
    }
    return command.execute(args,context)
}
