import React from 'react'

export const Checkbox = ({ checked, onCheckedChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  )
}