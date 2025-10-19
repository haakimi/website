const { execSync } = require('child_process')

console.log('🚀 启动个人作品集网站...')
console.log('📍 项目地址: http://localhost:3000')
console.log('⏱️  正在启动服务器...')

try {
  execSync('npm run dev', { stdio: 'inherit' })
} catch (error) {
  console.error('❌ 启动失败:', error.message)
  process.exit(1)
}