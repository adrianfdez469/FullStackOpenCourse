import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'antd'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={{ display: visible ? '' : 'None' }}>
        {children}
        <Button type='primary' danger onClick={toggleVisibility}>Cancel</Button>
      </div>
      <div style={{ display: visible ? 'None' : '' }}>
        <Button type='primary' data-testid="toggle-visble" onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable