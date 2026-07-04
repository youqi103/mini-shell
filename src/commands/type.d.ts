/**
 * 命令=名称+别名+描述+用法+执行
 */
export interface CommandType {
    name:string,// 命令名称
    alias?:string[],// 命令别名
    description:string,// 命令描述
    usage:string,// 命令用法
    execute:(args:string[],context:CommandContext)=>CommandResult|Promise<CommandResult>,// 命令执行函数
}
/**
 * 命令上下文接口
 */
export interface CommandContext {
    id:number,// 命令上下文ID
    input:string,// 命令输入文本
    result:CommandResult,// 命令执行结果
    clear:()=>Promise<void>,// 清除终端
}

/**
 * 命令执行结果接口
 */
export interface CommandResult {
    code:number,// 命令执行状态码
    message:string,// 命令执行结果消息
}


