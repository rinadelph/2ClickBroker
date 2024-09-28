import React from 'react'

export const Slider = ({ min, max, value, onValueChange }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value[0]}
      onChange={(e) => onValueChange([parseInt(e.target.value), value[1]])}
    />
  )
}