import type { CommandType, CommandContext, CommandResult } from "../type";

export const historyCommand: CommandType = {
  name: 'history',
  description: '查看命令历史',
  usage: 'history',
  execute(args: string[], context: CommandContext): CommandResult {
    return {
      code: 0,
      message: '命令历史',
    }
  },
}