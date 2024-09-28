import React from 'react'

interface DropdownMenuProps {
  children: React.ReactNode
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return (
    <div className="relative inline-block text-left">
      {children}
    </div>
  )
}

interface DropdownMenuTriggerProps {
  children: React.ReactElement
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children }) => {
  return (
    <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
      {children}
    </button>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  className?: string
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children, className }) => {
  return (
    <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}>
      <div className="py-1">
        {children}
      </div>
    </div>
  )
}

interface DropdownMenuItemProps {
  onSelect?: () => void
  children: React.ReactNode
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ onSelect, children }) => {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  )
}

interface DropdownMenuLabelProps {
  children: React.ReactNode
}

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({ children }) => {
  return (
    <span className="block px-4 py-2 text-xs text-gray-500">
      {children}
    </span>
  )
}

export const DropdownMenuSeparator: React.FC = () => {
  return <div className="border-t border-gray-100"></div>
}