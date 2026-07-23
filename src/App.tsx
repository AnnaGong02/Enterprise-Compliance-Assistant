import { useEffect, useMemo, useState } from 'react'
import { chapters, questionFilters, questions, type Question } from './data/content'
import { siteConfig } from './config/site'

function ArrowIcon() { return <span aria-hidden="true">↘</span> }

const sectionLinks = [
  { id: 'overview', no: '01', label: '白皮书简介' },
  { id: 'chapters', no: '02', label: '七章框架' },
  { id: 'ai-overview', no: '03', label: '决策过渡' },
  { id: 'ai-assistant', no: '04', label: 'AI助手入口' },
  { id: 'usage-guide', no: '05', label: '现场操作' },
  { id: 'question-bank', no: '06', label: '提问库' },
  { id: 'qr-end', no: '07', label: '再次扫码' },
]

function Hero() {
  return <header className="hero" id="top">
    <nav className="nav wrap"><a className="wordmark" href="#top"><i />解除合规指南</a><a href="#question-bank">现场提问库</a></nav>
    <div className="hero-graphic" aria-hidden="true"><i className="node n1" /><i className="node n2" /><i className="node n3" /><i className="line l1" /><i className="line l2" /></div>
    <div className="hero-content wrap reveal">
      <p className="eyebrow">EMPLOYMENT TERMINATION COMPLIANCE · 2026</p>
      <h1><span className="hero-title-main">从解雇合规SOP到法律AI：</span><br />智能化用工风险管理的实践与落地<br /><span className="hero-title-event">——暨《企业劳动用工解除合规白皮书暨风险决策指南》宣讲会</span></h1>
      <p className="hero-lead">从解除路径选择、证据固定到程序履行，<br />将高风险用工决策转化为可执行的SOP与风险判断。</p>
      <div className="hero-actions"><a className="button primary" href="#chapters">查看白皮书框架 <ArrowIcon /></a><a className="button secondary" href="#ai-assistant">体验AI助手 <ArrowIcon /></a></div>
    </div>
    <div className="risk-legend wrap"><span><i className="green" />路径可行</span><span><i className="yellow" />材料待补</span><span><i className="red" />高风险</span></div>
  </header>
}

function WhitepaperOverview() {
  const keywords = ['7大解除场景', '标准化SOP', '风险决策树', '案例复盘', '配套文书']
  return <section className="section overview reveal" id="overview"><div className="wrap overview-grid"><div><p className="section-index">01 / 白皮书简介</p><h2>辞退不是一个动作，<br />而是一条完整的合规链。</h2></div><div className="overview-copy"><p>劳动关系解除并不是一句简单的“辞退”，而是解除理由、事实证据、法定程序、文书内容及送达方式相互衔接的完整链条。</p><p>《企业劳动用工解除合规白皮书暨风险决策指南》围绕企业最常见的解除场景，通过法律红线、案例复盘、标准化SOP、风险决策树及配套文书，为企业提供从风险识别到落地执行的系统解决方案。</p></div></div><div className="keyword-row wrap">{keywords.map((item, i) => <div key={item}><b>0{i + 1}</b><span>{item}</span></div>)}</div></section>
}

function AuthorIntroduction() {
  return <section className="section authors" aria-labelledby="authors-title"><div className="wrap authors-layout"><div className="authors-copy reveal"><p className="section-index">作者介绍</p><h2 id="authors-title">专业团队，<br />共同完成。</h2><p>《企业劳动用工解除合规白皮书暨风险决策指南》由劳动与人力资源专业团队共同编写。</p></div><figure className="authors-image reveal"><SafeImage src={siteConfig.authorImage} label="白皮书作者介绍" /><figcaption>作者按写作章节排序</figcaption></figure></div></section>
}

function ChapterMap() {
  const [open, setOpen] = useState(0)
  return <section className="section chapters" id="chapters"><div className="wrap"><div className="section-head reveal"><div><p className="section-index">02 / 七章框架</p><h2>从决策起点，到程序落地</h2></div><p>点击章节，查看完整专题与配套文书</p></div><div className="chapter-list reveal">{chapters.map((chapter, index) => { const active = open === index; return <article className={`chapter ${active ? 'active' : ''}`} key={chapter.id}><button aria-expanded={active} onClick={() => setOpen(active ? -1 : index)}><span className="chapter-no">{chapter.number}</span><span className="chapter-short">{chapter.short}</span><strong>{chapter.title}</strong><span className="toggle">{active ? '−' : '+'}</span></button><div className="chapter-detail"><div><p className="chapter-summary">{chapter.description}</p><div className="outline-block"><span className="outline-label">核心专题</span><ol>{chapter.sections.map((item, itemIndex) => <li key={item}><b>{String(itemIndex + 1).padStart(2, '0')}</b><span>{item}</span></li>)}</ol></div><div className="outline-block attachments"><span className="outline-label">配套文书</span><ul>{chapter.attachments.map(item => <li key={item}><i>DOC</i><span>{item}</span></li>)}</ul></div><div className="tags"><span>法律红线</span><span>标准化SOP</span><span>风险决策树</span></div></div></div></article>})}</div></div></section>
}

function WhitepaperReader() {
  return <section className="section whitepaper-reader" aria-labelledby="reader-title"><div className="wrap reader-layout"><a className="reader-cover reveal" href={siteConfig.whitepaper.pdf} target="_blank" rel="noreferrer" aria-label="打开完整白皮书PDF"><SafeImage src={siteConfig.whitepaper.cover} label="企业劳动用工解除合规白皮书封面" /><span>PDF · 83页</span></a><div className="reader-copy reveal"><p className="section-index">完整白皮书</p><h2 id="reader-title">在线阅读<br />完整PDF版本</h2><p>点击封面或下方按钮，即可在浏览器中直接查看《企业劳动用工解除合规白皮书暨风险决策指南》。</p><a className="button primary" href={siteConfig.whitepaper.pdf} target="_blank" rel="noreferrer">打开完整白皮书 <ArrowIcon /></a><small>PDF 文件将在新窗口打开，亦可使用浏览器下载或保存。</small></div></div></section>
}

function AiTransition() {
  return <section className="ai-transition" id="ai-overview"><div className="wrap reveal"><p className="section-index light">03 / 从知识到决策</p><div className="transition-grid"><div><h2>看到这里，大家可能已经有一点<br /><em>“信息过载”。</em></h2><p>白皮书提供的是完整的知识体系，但真正面对一名具体员工时，HR和管理人员往往需要在几分钟内判断：</p></div><ul><li>能不能解除？</li><li>现有证据够不够？</li><li>缺少哪些程序？</li><li>下一步应该做什么？</li></ul></div><p className="transition-note">为了让白皮书中的SOP和风险决策逻辑更加便捷地应用于日常管理，我们同步推出了配套的AI解雇SOP助手。</p><div className="stats"><div><strong>179<small>页</small></strong><span>专业内容<br />不必每次从头翻找</span></div><div><strong>01<small>次输入</small></strong><span>描述具体场景<br />快速完成初步风险识别</span></div></div></div></section>
}

function AiFeatures() {
  const items = [
    ['01', '场景化提问', '无需检索法条，只需描述员工情况、解除理由和现有证据。'],
    ['02', '风险灯提示', '根据事实完整度及程序履行情况，提供红灯、黄灯或绿灯风险提示。'],
    ['03', 'SOP行动建议', '告知当前缺少的材料、需要补充的程序以及建议采取的下一步行动。'],
    ['04', '律师复核提示', 'AI回答用于初步风险识别，具体个案仍应结合完整材料由专业律师复核。'],
  ]
  const assistantQr = siteConfig.qrCodes[0]
  return <section className="section features"><div className="wrap"><div className="section-head reveal"><div><p className="section-index">04 / AI助手功能与入口</p><h2>把复杂判断，转化为清晰下一步</h2></div></div><div className="feature-grid reveal">{items.map(([no, title, text]) => <article key={no}><span>{no}</span><div className={`feature-icon icon-${no}`} aria-hidden="true"><i /><i /><i /></div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="feature-entry reveal" id="ai-assistant"><div><p className="section-index">扫码进入AI助手</p><h3>现在扫码，跟随现场操作</h3><p>关注公众号后进入AI解雇SOP助手，输入具体员工场景，即可开始初步风险识别。</p></div><div className="entry-qr"><SafeImage src={assistantQr.src} label={assistantQr.title} /><strong>{assistantQr.title}</strong></div></div></div></section>
}

function QuestionCard({ question, onOpen, onCopy }: { question: Question; onOpen: () => void; onCopy: () => void }) {
  return <article className="question-card" onClick={onOpen} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onOpen() }}><div className="question-meta"><span>{question.chapter} · {question.category}</span>{question.recommended && <b>推荐演示</b>}</div><p>{question.text}</p><button onClick={(e) => { e.stopPropagation(); onCopy() }}>复制问题</button></article>
}

function QuestionBank() {
  const [filter, setFilter] = useState('全部'); const [current, setCurrent] = useState<Question | null>(null); const [demo, setDemo] = useState(false); const [toast, setToast] = useState(false)
  const filtered = useMemo(() => filter === '全部' ? questions : questions.filter(q => q.category === filter), [filter])
  const copy = async (q: Question) => { try { await navigator.clipboard.writeText(q.text) } catch { const el = document.createElement('textarea'); el.value = q.text; document.body.appendChild(el); el.select(); document.execCommand('copy'); el.remove() } setToast(true); window.setTimeout(() => setToast(false), 1800) }
  const move = (step: number) => { const list = filtered; const index = Math.max(0, list.findIndex(q => q.id === current?.id)); setCurrent(list[(index + step + list.length) % list.length]) }
  const random = () => { const pool = filtered.filter(q => q.id !== current?.id); setCurrent(pool[Math.floor(Math.random() * pool.length)] || filtered[0]) }
  const close = () => { setCurrent(null); setDemo(false) }
  return <section className="section question-bank" id="question-bank"><div className="wrap"><div className="section-head reveal"><div><p className="section-index">06 / 现场提问库</p><h2>把问题带到现场，让判断发生</h2></div><button className="demo-button" onClick={() => { setDemo(true); setCurrent(filtered[0]) }}>▣ 现场演示模式</button></div><div className="filters reveal" aria-label="问题分类">{questionFilters.map(item => <button className={filter === item ? 'active' : ''} onClick={() => { setFilter(item); setCurrent(null) }} key={item}>{item}</button>)}</div><div className="question-grid reveal">{filtered.map(q => <QuestionCard key={q.id} question={q} onOpen={() => setCurrent(q)} onCopy={() => void copy(q)} />)}</div></div>{current && <div className={`question-modal ${demo ? 'demo' : ''}`} role="dialog" aria-modal="true" aria-label="问题展示"><button className="modal-close" onClick={close} aria-label="关闭">×</button><div className="modal-inner"><div className="question-meta"><span>{current.chapter} · {current.category}</span>{current.recommended && <b>推荐演示</b>}</div><p>{current.text}</p><div className="modal-actions"><button onClick={() => move(-1)}>← 上一题</button><button onClick={() => void copy(current)}>复制问题</button><button onClick={random}>随机抽题</button><button onClick={() => move(1)}>下一题 →</button></div></div></div>}<div className={`toast ${toast ? 'show' : ''}`} role="status">✓ 已复制到剪贴板</div></section>
}

function SafeImage({ src, label }: { src: string; label: string }) { const [failed, setFailed] = useState(false); return <div className="image-frame">{!failed && <img src={src} alt={label} onError={() => setFailed(true)} />}{failed && <div className="image-placeholder"><span>IMAGE PLACEHOLDER</span><i>＋</i><p>【{label}】</p><small>{src.replace('/', '/public/')}</small></div>}</div> }

function SectionNavigator() {
  const [current, setCurrent] = useState(0)
  const goTo = (index: number) => document.getElementById(sectionLinks[index].id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  useEffect(() => {
    const elements = sectionLinks.map(item => document.getElementById(item.id)).filter((item): item is HTMLElement => Boolean(item))
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { const index = sectionLinks.findIndex(item => item.id === entry.target.id); if (index >= 0) setCurrent(index) } }), { rootMargin: '-30% 0px -55%', threshold: 0 })
    elements.forEach(element => observer.observe(element))
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || ['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement).tagName)) return
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); goTo(Math.min(current + 1, sectionLinks.length - 1)) }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); goTo(Math.max(current - 1, 0)) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { observer.disconnect(); window.removeEventListener('keydown', onKeyDown) }
  }, [current])
  return <nav className="section-nav" aria-label="页面章节导航"><button className="nav-arrow" onClick={() => goTo(Math.max(current - 1, 0))} disabled={current === 0} aria-label="上一页">↑</button><div className="section-nav-links">{sectionLinks.map((item, index) => <a href={`#${item.id}`} className={current === index ? 'active' : ''} aria-current={current === index ? 'page' : undefined} key={item.id}><b>{item.no}</b><span>{item.label}</span></a>)}</div><button className="nav-arrow" onClick={() => goTo(Math.min(current + 1, sectionLinks.length - 1))} disabled={current === sectionLinks.length - 1} aria-label="下一页">↓</button></nav>
}

function UsageGuide() { return <section className="section usage" id="usage-guide"><div className="wrap"><div className="section-head reveal"><div><p className="section-index">05 / 现场操作</p><h2>如何使用AI解雇SOP助手</h2></div><p>扫码进入后，三步完成风险识别</p></div><div className="usage-grid reveal">{siteConfig.usageImages.map((src, i) => <article key={src}><div className="step-top"><b>步骤 {String(i + 1).padStart(2, '0')}</b><span>0{i + 1}</span></div><h3>{siteConfig.usageTitles[i]}</h3><SafeImage src={src} label={siteConfig.usagePlaceholders[i]} /></article>)}</div></div></section> }

function QrCodeSection() { return <section className="qr-section" id="qr-end"><div className="wrap qr-grid reveal"><div><p className="section-index light">07 / 再次扫码</p><h2>把合规工具与专业内容，<br />带回日常工作。</h2><p>保存入口，后续可随时使用AI助手或查看劳动用工专业内容。</p></div><div className="qr-cards">{siteConfig.qrCodes.map(item => <div className="qr-card" key={item.src}><SafeImage src={item.src} label={item.title} /><strong>{item.title}</strong><small>{item.description}</small></div>)}</div></div><p className="disclaimer wrap">AI助手提供的内容仅用于一般性法律信息及初步风险识别，不构成针对具体事项的正式法律意见。涉及具体员工处理时，请结合完整事实、证据及当地司法实践，由专业律师进一步复核。</p></section> }

function Footer() { return <footer><div className="wrap"><strong>企业劳动用工解除合规白皮书暨风险决策指南</strong><span>劳动与人力资源专业团队</span><a href="#top">返回顶部 ↑</a></div></footer> }

export default function App() {
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }), { threshold: .12 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); return () => observer.disconnect() }, [])
  return <><Hero /><SectionNavigator /><main><WhitepaperOverview /><AuthorIntroduction /><ChapterMap /><WhitepaperReader /><AiTransition /><AiFeatures /><UsageGuide /><QuestionBank /><QrCodeSection /></main><Footer /></>
}
