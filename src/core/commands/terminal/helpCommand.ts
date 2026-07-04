import type { CommandType, CommandContext, CommandResult } from "../type";
import { getCommand, getAllCommands } from "@/core/commandRegister";
export const helpCommand: CommandType = {
  name: 'help',
  description: '查看帮助信息',
  usage: 'help [命令名]',
  execute(args: string[], context: CommandContext): CommandResult {
    const targetName = args[0]

    if (targetName) {
      const command = getCommand(targetName)
      if (!command) {
        return {
          code: 1,
          message: `没有找到命令：${targetName}`,
        }
      }

      return {
        code: 0,
        message: `${command.name}：${command.description}\n用法：${command.usage}`,
      }
    }

    const commandList = getAllCommands()
      .map((command) => `${command.name} - ${command.description}`)
      .join('\n')

    return {
      code: 0,
      message: commandList,
    }
  },
}