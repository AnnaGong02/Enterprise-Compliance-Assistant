import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import App from './App'

beforeAll(() => { vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} }) })
afterEach(cleanup)

describe('白皮书互动页', () => {
  it('体验AI助手按钮直接跳转到二维码入口', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /体验AI助手/ })).toHaveAttribute('href', '#ai-assistant')
    expect(document.querySelector('#ai-assistant')).toHaveClass('feature-entry')
    expect(document.querySelector('#ai-assistant img')).toHaveAttribute('alt', 'AI助手入口')
  })

  it('章节手风琴同一时间只展开一项', async () => {
    const user = userEvent.setup(); render(<App />)
    const second = screen.getByRole('button', { name: /试用期管理与解除实战/ })
    await user.click(second)
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /决策起点/ })).toHaveAttribute('aria-expanded', 'false')
  })

  it('问题库筛选和演示模式可用', async () => {
    const user = userEvent.setup(); render(<App />)
    await user.click(screen.getByRole('button', { name: '试用期' }))
    expect(screen.getAllByText(/员工试用期表现不好/).length).toBeGreaterThan(0)
    expect(screen.queryByText(/公司因组织调整撤销/)).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /现场演示模式/ }))
    expect(screen.getByRole('dialog', { name: '问题展示' })).toBeInTheDocument()
  })

  it('提供七个页面指引和前后翻页控制', () => {
    render(<App />)
    const navigator = screen.getByRole('navigation', { name: '页面章节导航' })
    expect(navigator).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /01.*白皮书简介/ })).toHaveAttribute('href', '#overview')
    expect(screen.getByRole('link', { name: /07.*再次扫码/ })).toHaveAttribute('href', '#qr-end')
    expect(screen.getByRole('button', { name: '上一页' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '下一页' })).toBeEnabled()
  })
})
