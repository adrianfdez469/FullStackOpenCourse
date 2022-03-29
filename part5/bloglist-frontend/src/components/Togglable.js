import React, { useState, forwardRef, useImperativeHandle } from 'react'

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
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
      <div style={{ display: visible ? 'None' : '' }}>
        <button data-testid="toggle-visble" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable