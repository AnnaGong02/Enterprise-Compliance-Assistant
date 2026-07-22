export const siteConfig = {
  authorImage: `${import.meta.env.BASE_URL}authors-introduction.png`,
  whitepaper: {
    pdf: `${import.meta.env.BASE_URL}employment-termination-compliance-whitepaper.pdf`,
    cover: `${import.meta.env.BASE_URL}whitepaper-cover.png`,
  },
  usageImages: ['usage-step-1.png', 'usage-step-2.png', 'usage-step-3.png'].map(file => `${import.meta.env.BASE_URL}${file}`),
  usageTitles: ['找到AI助手入口', '输入问题，查看风险提示', '阅读完整使用指南'],
  qrCodes: [
    { src: `${import.meta.env.BASE_URL}qrcode.png`, title: 'AI助手入口', description: '扫码关注后，进入AI解雇SOP助手' },
    { src: `${import.meta.env.BASE_URL}official-qrcode.png`, title: '专业内容公众号', description: '扫码关注，获取更多劳动用工合规内容' },
  ],
  usagePlaceholders: [
    '公众号关注方式及页面截图待补充',
    '进入AI助手入口的操作截图待补充',
    '输入问题及查看回答的操作截图待补充',
  ],
}
