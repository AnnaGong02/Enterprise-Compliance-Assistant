import { FormEvent, useRef, useState } from 'react'
import { sendComplianceQuestion } from './services/yuanqi'

type Profile = { company: string; name: string; contact: string }
type Message = { id: number; role: 'user' | 'assistant'; content: string }

const categories = ['试用期', '调岗调薪', '加班休假', '病假医疗期', '员工违纪', '劳动合同解除']
const disclaimer = '以上内容仅供初步参考，具体事项建议由专业律师结合完整事实和证据进一步复核。'

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
}

function App() {
  const [started, setStarted] = useState(false)
  const [profile, setProfile] = useState<Profile>({ company: '', name: '', contact: '' })
  const [consented, setConsented] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [showHuman, setShowHuman] = useState(false)
  const nextId = useRef(1)

  const start = (event: FormEvent) => {
    event.preventDefault()
    if (profile.company.trim() && consented) setStarted(true)
  }

  const send = async (event?: FormEvent) => {
    event?.preventDefault()
    const question = input.trim()
    if (!question || sending) return
    setMessages((current) => [...current, { id: nextId.current++, role: 'user', content: question }])
    setInput('')
    setSending(true)
    const reply = await sendComplianceQuestion(question)
    setMessages((current) => [...current, { id: nextId.current++, role: 'assistant', content: reply }])
    setSending(false)
  }

  const restart = () => {
    setStarted(false)
    setProfile({ company: '', name: '', contact: '' })
    setConsented(false)
    setMessages([])
    setInput('')
    setShowHuman(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="企业合规助手首页">
          <BrandMark />
          <span>企业合规助手<small>EMPLOYMENT COMPLIANCE</small></span>
        </a>
        {started && <span className="company-badge"><i />{profile.company}</span>}
      </header>

      {!started ? (
        <main className="entry-page" id="top">
          <section className="entry-card" aria-labelledby="entry-title">
            <div className="card-heading">
              <div className="card-logo"><BrandMark /></div>
              <h1 id="entry-title">企业合规助手</h1>
              <p>劳动用工问题，随时为您提供初步指引</p>
            </div>
            <form onSubmit={start}>
              <label>公司名称 <em>*</em>
                <input required value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} placeholder="请输入公司全称" />
              </label>
              <div className="field-row">
                <label>姓名或称呼 <small>选填</small>
                  <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="怎么称呼您" />
                </label>
                <label>联系方式 <small>选填</small>
                  <input value={profile.contact} onChange={(e) => setProfile({ ...profile, contact: e.target.value })} placeholder="手机或邮箱" />
                </label>
              </div>
              <label className="consent-box">
                <input type="checkbox" checked={consented} onChange={(e) => setConsented(e.target.checked)} />
                <span><b>信息使用说明</b>相关信息仅用于识别咨询主体、优化服务及必要的后续联系。请勿提交身份证号码、完整病历等敏感个人信息。</span>
              </label>
              <button className="primary-button" disabled={!profile.company.trim() || !consented} type="submit">开始咨询 <span>→</span></button>
            </form>
            <p className="secure-note">无需注册 · 信息仅用于本次咨询</p>
          </section>
        </main>
      ) : (
        <main className="consult-page" id="top">
          <section className="chat-panel" aria-label="咨询对话">
            <div className="chat-header">
              <div className="assistant-title"><BrandMark /><span><h1>企业合规助手</h1><p><i /> 在线 · AI 模拟回复</p></span></div>
              <div className="chat-actions">
                <button onClick={() => setShowHuman(true)}>人工咨询</button>
                <button onClick={() => setMessages([])} disabled={!messages.length}>清空对话</button>
                <button onClick={restart}>重新开始</button>
              </div>
            </div>

            <div className="messages" aria-live="polite">
              <div className="conversation">
                <div className="welcome-message">
                  <div className="avatar"><BrandMark /></div>
                  <div className="bubble assistant-bubble">
                    <p>您好{profile.name ? `，${profile.name}` : ''}！我是企业合规助手。</p>
                    <p>请告诉我您遇到的劳动用工问题。</p>
                  </div>
                </div>
                <div className="quick-questions" aria-label="快捷问题分类">
                  {categories.map((category) => (
                    <button key={category} onClick={() => setInput(`请问关于${category}，企业需要注意哪些合规事项？`)}>{category}</button>
                  ))}
                </div>
                {messages.map((message) => (
                  <div className={`message ${message.role}`} key={message.id}>
                    {message.role === 'assistant' && <div className="avatar"><BrandMark /></div>}
                    <div>
                      <div className={`bubble ${message.role}-bubble`}>{message.content}</div>
                      {message.role === 'assistant' && <p className="disclaimer">提示：{disclaimer}</p>}
                    </div>
                  </div>
                ))}
                {sending && <div className="message assistant"><div className="avatar"><BrandMark /></div><div className="typing" aria-label="正在回复"><i /><i /><i /></div></div>}
              </div>
            </div>

            <div className="composer-wrap">
              <form className="composer" onSubmit={send}>
                <textarea aria-label="咨询问题" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void send() } }} placeholder="请描述您的劳动用工问题…" rows={2} />
                <button type="submit" disabled={!input.trim() || sending}>发送 <span>↑</span></button>
              </form>
              <p>请勿提交身份证号、完整病历等敏感个人信息</p>
            </div>
          </section>
        </main>
      )}

      <footer><span>© 2026 企业合规助手</span><span>合规 · 专业 · 审慎</span></footer>

      {showHuman && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowHuman(false)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="human-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowHuman(false)} aria-label="关闭">×</button>
            <div className="modal-icon">☎</div>
            <p className="step-label">专业支持</p>
            <h2 id="human-title">人工咨询</h2>
            <p>如需进一步咨询，请发送邮件至：<a href="mailto:dachengshlabor@163.com">dachengshlabor@163.com</a>。请简要说明公司名称、所在地及咨询事项。</p>
            <button className="primary-button" onClick={() => setShowHuman(false)}>我知道了</button>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
