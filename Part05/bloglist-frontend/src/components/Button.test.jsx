import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('<Button />', () => {

    let container
    let likeStub
    
    beforeEach(() => {
        likeStub = vi.fn()
        const prop = {
          onClick: likeStub, 
          buttonLabel: "like",
          disabled: false
        }
      
        container = render(<Button onClick={prop.onClick} buttonLabel={prop.buttonLabel} disabled={prop.disabled}/>)
    })

    test('1. Like button twice-clicked -> event handler called twice', async () => {
        // screen.debug()
        const user = userEvent.setup()
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeStub.mock.calls).toHaveLength(2)
    })

})