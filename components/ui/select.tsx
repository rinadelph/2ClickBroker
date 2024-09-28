import * as React from "react"

// This is a simplified version. You might want to use a library like Radix UI for a full implementation
export const Select = ({ children, ...props }) => <select {...props}>{children}</select>
export const SelectContent = ({ children }) => <>{children}</>
export const SelectItem = ({ children, ...props }) => <option {...props}>{children}</option>
export const SelectTrigger = ({ children }) => <>{children}</>
export const SelectValue = ({ children }) => <>{children}</>