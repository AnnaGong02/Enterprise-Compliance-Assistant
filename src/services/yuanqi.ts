/**
 * 腾讯元器 API 接入预留层。
 *
 * 当前第一版只返回本地模拟回复，不发起任何网络请求，也不包含 API 密钥。
 * 后续接入时建议：
 * 1. 新建后端或 Serverless Function 代理腾讯元器请求；
 * 2. 在服务端环境变量中保存密钥，绝不要把密钥暴露在 VITE_ 变量或前端代码中；
 * 3. 在此处调用自有后端，并补充超时、错误提示、内容安全与流式响应处理。
 */

export const MOCK_REPLY =
  '您的问题已收到。正式版本将结合企业劳动用工合规知识库为您提供初步分析。'

export async function sendComplianceQuestion(question: string): Promise<string> {
  void question
  await new Promise((resolve) => window.setTimeout(resolve, 450))
  return MOCK_REPLY
}
