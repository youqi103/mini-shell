export function parseInput(input: string) {
  const parts = input.trim().split(/\s+/)
  const commandName = parts[0]
  const args = parts.slice(1)

  return {
    commandName,
    args,
  }
}
