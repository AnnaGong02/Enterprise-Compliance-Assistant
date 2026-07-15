# 企业合规助手

面向企业用户的劳动用工合规咨询网页第一版。项目包含信息确认页、快捷咨询分类、聊天交互、模拟回复、免责声明、人工咨询提示、清空对话和重新开始功能。

当前版本只在浏览器中演示完整交互，不连接真实腾讯元器 API，不保存用户数据，也不包含登录、数据库或管理后台。

## 技术栈

- React
- Vite
- TypeScript
- Vitest + Testing Library
- 原生 CSS（响应式适配手机端与电脑端）

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

终端会显示本地地址，通常为 `http://localhost:5173`，在浏览器打开即可预览。

## 测试与构建

```bash
# 运行自动化测试
npm test

# 代码检查
npm run lint

# 生成生产版本
npm run build

# 本地预览生产版本
npm run preview
```

生产文件会生成在 `dist/` 目录。

## 部署

本项目是标准 Vite 静态站点，可免费部署到 GitHub Pages、Cloudflare Pages、Vercel 或 Netlify。

通用部署设置：

- 构建命令：`npm run build`
- 发布目录：`dist`
- Node.js 版本：20+

如果使用 GitHub Pages 且仓库发布在子路径下，请在 `vite.config.ts` 中增加对应的 `base` 配置；若绑定自定义域名或部署在域名根目录，则无需修改。

## 后续接入腾讯元器 API

接口预留文件位于 `src/services/yuanqi.ts`。正式接入时应新增后端或 Serverless Function 作为安全代理，把 API 密钥保存在服务端环境变量中，再由该 service 调用自有后端。不要把真实密钥写进前端代码或任何以 `VITE_` 开头的变量。

`.env.example` 只保留非敏感配置示例；请复制为 `.env.local` 后填写本地配置，`.env.local` 已被 Git 忽略。

## 项目结构

```text
src/
  services/yuanqi.ts  # 腾讯元器 API 预留层与本地模拟回复
  App.tsx             # 页面与交互
  App.test.tsx        # 核心流程测试
  main.tsx            # 应用入口
  styles.css          # 响应式视觉样式
```
