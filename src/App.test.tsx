import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('企业合规助手', () => {
  it('完成信息确认后进入咨询页面并收到模拟回复', async () => {
    const user = userEvent.setup()
    render(<App />)

    const startButton = screen.getByRole('button', { name: /开始咨询/ })
    expect(startButton).toBeDisabled()

    await user.type(screen.getByPlaceholderText('请输入公司全称'), '示例科技有限公司')
    await user.click(screen.getByRole('checkbox'))
    await user.click(startButton)

    expect(screen.getByRole('button', { name: '试用期' })).toBeInTheDocument()
    await user.type(screen.getByLabelText('咨询问题'), '试用期最长多久？')
    await user.click(screen.getByRole('button', { name: /发送/ }))

    expect(await screen.findByText(/正式版本将结合企业劳动用工合规知识库/)).toBeInTheDocument()
    expect(screen.getByText(/以上内容仅供初步参考/)).toBeInTheDocument()
  })
})
