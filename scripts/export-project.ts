/* eslint-disable */
/**
 * 禁用 eslint 检查，因为这是一个用于构建/维护的独立脚本，
 * 不需要遵守 Next.js 项目严格的业务代码规范 (如 no-explicit-any)。
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

// ================= 配置区域 =================

interface Config {
  outputFile: string
  ignoreDirs: Set<string>
  ignoreFiles: Set<string>
  binaryExtensions: Set<string>
}

const config: Config = {
  // 输出文件名
  outputFile: 'project_context.md',

  // 排除的目录
  ignoreDirs: new Set([
    'node_modules',
    '.git',
    '.next',
    'out',
    '.turbo',
    '.vscode',
    '.idea',
    'dist',
    'build',
    'coverage',
    'public',
    'assets'
    // 如果你不想包含脚本文件夹本身，可以取消下面注释
    // 'scripts'
  ]),

  // 排除的文件
  ignoreFiles: new Set([
    'export-project.ts',
    'project_context.md',
    'SYSTEM_PROMPT.md',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    'bun.lockb',
    '.env',
    '.env.local',
    '.env.production',
    '.DS_Store',
    '.eslintrc.json',
    '.eslintrc.js',
    '.gitignore',
    '.prettierignore',
    'tsconfig.json'
  ]),

  // 排除的二进制后缀
  binaryExtensions: new Set([
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.ico',
    '.svg',
    '.webp',
    '.mp4',
    '.mp3',
    '.pdf',
    '.zip',
    '.tar',
    '.gz',
    '.7z',
    '.rar',
    '.exe',
    '.dll',
    '.bin',
    '.ttf',
    '.woff',
    '.woff2',
    '.eot'
  ])
}

// ================= 工具函数 =================

function shouldIgnore(name: string, isDirectory: boolean): boolean {
  if (isDirectory) {
    return config.ignoreDirs.has(name)
  }
  return config.ignoreFiles.has(name)
}

function isBinaryFile(fileName: string): boolean {
  const ext = path.extname(fileName).toLowerCase()
  return config.binaryExtensions.has(ext)
}

function getLanguage(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase()
  const map: Record<string, string> = {
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.json': 'json',
    '.css': 'css',
    '.scss': 'scss',
    '.html': 'html',
    '.md': 'markdown',
    '.py': 'python',
    '.sh': 'bash',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.sql': 'sql',
    '.dockerfile': 'dockerfile'
  }
  return map[ext] || ''
}

// ================= 核心逻辑 =================

function generateFileTree(dirPath: string, prefix: string = ''): string {
  let output = ''
  let entries: string[] = []

  try {
    entries = fs.readdirSync(dirPath)
  } catch (error) {
    return ''
  }

  const filteredEntries = entries.filter((entry) => {
    const fullPath = path.join(dirPath, entry)
    let isDir = false
    try {
      isDir = fs.statSync(fullPath).isDirectory()
    } catch {
      return false
    }
    return !shouldIgnore(entry, isDir)
  })

  // 排序：文件夹优先
  filteredEntries.sort((a, b) => {
    const pathA = path.join(dirPath, a)
    const pathB = path.join(dirPath, b)
    const isDirA = fs.statSync(pathA).isDirectory()
    const isDirB = fs.statSync(pathB).isDirectory()
    if (isDirA === isDirB) return a.localeCompare(b)
    return isDirA ? -1 : 1
  })

  filteredEntries.forEach((entry, index) => {
    const isLast = index === filteredEntries.length - 1
    const fullPath = path.join(dirPath, entry)
    const isDir = fs.statSync(fullPath).isDirectory()

    output += `${prefix}${isLast ? '└── ' : '├── '}${entry}\n`

    if (isDir) {
      output += generateFileTree(fullPath, `${prefix}${isLast ? '    ' : '│   '}`)
    }
  })

  return output
}

interface FileEntry {
  fullPath: string
  relativePath: string
}

function walkDirectory(dirPath: string, rootPath: string, fileList: FileEntry[] = []): FileEntry[] {
  let entries: string[] = []
  try {
    entries = fs.readdirSync(dirPath)
  } catch {
    return fileList
  }

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry)
    let stat

    try {
      stat = fs.statSync(fullPath)
    } catch {
      return
    }

    if (shouldIgnore(entry, stat.isDirectory())) {
      return
    }

    if (stat.isDirectory()) {
      walkDirectory(fullPath, rootPath, fileList)
    } else {
      if (!isBinaryFile(entry)) {
        fileList.push({
          fullPath,
          // 统一路径分隔符为 /，方便 AI 阅读
          relativePath: path.relative(rootPath, fullPath).split(path.sep).join('/')
        })
      }
    }
  })

  return fileList
}

function main() {
  // process.cwd() 获取的是执行命令时的目录（通常是项目根目录）
  const rootDir = process.cwd()
  // 确保输出文件生成在根目录
  const outputPath = path.join(rootDir, config.outputFile)

  console.log(`🚀 Starting scan at: ${rootDir}`)

  let outputContent = `# Project Context\n\n`
  outputContent += `Generated time: ${new Date().toISOString()}\n\n`

  // 1. 生成树
  outputContent += `## 1. Project Structure\n\n`
  outputContent += '```text\n'
  outputContent += generateFileTree(rootDir)
  outputContent += '```\n\n'

  // 2. 读取文件
  const files = walkDirectory(rootDir, rootDir)
  outputContent += `## 2. File Contents\n\n`
  outputContent += `Total files: ${files.length}\n\n`

  let successCount = 0

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file.fullPath, 'utf-8')
      const lang = getLanguage(file.relativePath)

      outputContent += `### File: ${file.relativePath}\n\n`
      outputContent += `\`\`\`${lang}\n`
      outputContent += content
      if (!content.endsWith('\n')) outputContent += '\n'
      outputContent += `\`\`\`\n\n`

      successCount++
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      console.error(`❌ Error reading ${file.relativePath}: ${msg}`)
    }
  })

  // 3. 写入
  try {
    fs.writeFileSync(outputPath, outputContent, 'utf-8')
    console.log(`\n✅ Success! Output written to: ${outputPath}`)
    console.log(`Stats: Scanned ${files.length} files.`)
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`\n❌ Failed to write file: ${msg}`)
  }
}

main()
