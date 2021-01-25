import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BottomPane from '../../components/BottomPane'

describe('BottomPane', () => {
  it('defaults to a green background color in the header', () => {
    const { container } = render(<BottomPane />) 
    const headerBackground = container.querySelector('.bg-ferry-green')

    expect(headerBackground.classList.contains('bg-ferry-green')).toBe(true)
  })

  it('uses a different background class in the header if one is provided', () => {
    const { container } = render(<BottomPane headerColor="differentColor" />) 
    const headerBackground = container.querySelector('.differentColor')

    expect(headerBackground.classList.contains('differentColor')).toBe(true)
  })

  it('renders the passed in header text', () => {
    render(<BottomPane header="Samish" />)

    expect(screen.getByText('Samish')).toBeInTheDocument()
  })

  it('renders a passed in component', () => {
    render(<BottomPane toRender={<h1>Ferries Rule</h1>} />)

    expect(screen.getByText('Ferries Rule')).toBeInTheDocument()
  })
})
