import type { CommandType } from './commands/type'
import { clearCommand } from './commands/terminal/clearCommand'
import { baiduSearchCommand } from './commands/search/baiduSearch'
import { helpCommand } from './commands/terminal/helpCommand'

/**
 * 命令列表
 */
export const commandList: CommandType[] = [clearCommand, baiduSearchCommand, helpCommand]

/**
 * 命令字典
 */
export const commandDict: Record<string, CommandType> = {}

commandList.forEach((command) => {
  commandDict[command.name] = command
  command.alias?.forEach((alias) => {
    commandDict[alias] = command
  })
})

export function getCommand(name: string) {
  return commandDict[name]
}

export function getAllCommands() {
  return commandList
}