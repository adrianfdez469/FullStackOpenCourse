// test-utils.jsx
import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

function customRender(
  ui,
  {
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {

    //return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
    return <BrowserRouter>{children}</BrowserRouter>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }