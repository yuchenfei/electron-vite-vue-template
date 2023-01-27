import { spawn } from 'child_process'
import Electron from 'electron'
import { build, createServer } from 'vite'

async function startViteDevSever() {
  console.log('starting vite dev server...')
  const viteDevServer = await createServer({
    configFile: 'vite.config.js',
    mode: 'development',
  })
  await viteDevServer.listen()
}

async function startElectronDevWatcher() {
  console.log('starting electron watcher...')
  await build({
    configFile: 'electron/vite.config.js',
    mode: 'development',
    build: {
      watch: {}, // 监听文件变动，自动重新打包
    },
    plugins: [
      {
        name: 'restart-electron-dev-app-on-change',
        closeBundle() {
          if (process.electronDevApp) {
            process.electronDevApp.removeAllListeners()
            process.electronDevApp.kill()
            process.electronDevApp = null
          }

          process.electronDevApp = spawn(
            Electron,
            ['.'], // electron 入口在 package.json 的 main 中指定
            { stdio: 'inherit' } // log 输出到当前命令行
          )
          process.electronDevApp.addListener('exit', process.exit)
        },
      },
    ],
  })
}

await startViteDevSever()
await startElectronDevWatcher()
