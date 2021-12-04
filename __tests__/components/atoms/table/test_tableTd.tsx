import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'

import TableTd from '../../../../pages/components/atoms/table/tableTd'

describe('App', () => {
  test('renders App component', () => {
    render(<TableTd value="aaa" />)
    const td = screen.getByText('aaa')
    expect(td).toBeInTheDocument()
    screen.debug()
  })
})
