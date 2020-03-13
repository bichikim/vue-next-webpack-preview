import {compact, trimStart, repeat} from 'lodash'
const emptySpace = ' '

function getLines(content: string) {
  const lines = content.split(/\/r|\n|\r\n/)
  return compact(lines)
}

function getEmptyCount(line: string) {
  if(line.startsWith(emptySpace)) {
    let letter = line[0]
    let index = 0
    while(letter === emptySpace) {
      index += 1
      letter = line[index]
    }
    return index + 1
  }

  return 0
}

function removeEmpty(count: number) {

}

function fixFirstIndent(lines: string[]) {
  const startEmptyCount = getEmptyCount(lines[0])
  return lines.map((value) => (value.slice(startEmptyCount - 1, value.length)))
}

export default function (content, map, meta) {
  const lines = getLines(content)
  return fixFirstIndent(lines).join('\n')
}
