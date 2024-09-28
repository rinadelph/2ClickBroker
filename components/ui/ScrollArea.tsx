import React from 'react'

export const ScrollArea = ({ children }) => {
  return <div style={{ overflowY: 'auto', maxHeight: '100%' }}>{children}</div>
}