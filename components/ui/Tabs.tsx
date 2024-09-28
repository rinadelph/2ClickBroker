import React, { useState } from 'react'

interface TabsProps {
  defaultValue: string
  className?: string
  children: React.ReactNode
}

export function Tabs({ defaultValue, className, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab })
        }
        if (React.isValidElement(child) && child.type === TabsContent) {
          return React.cloneElement(child, { activeTab })
        }
        return child
      })}
    </div>
  )
}

interface TabsListProps {
  className?: string
  children: React.ReactNode
  activeTab?: string
  setActiveTab?: (value: string) => void
}

export function TabsList({ className, children, activeTab, setActiveTab }: TabsListProps) {
  return (
    <div className={`flex ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, { activeTab, setActiveTab })
        }
        return child
      })}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  activeTab?: string
  setActiveTab?: (value: string) => void
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }: TabsTriggerProps) {
  return (
    <button
      className={`px-4 py-2 ${activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveTab && setActiveTab(value)}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  activeTab?: string
}

export function TabsContent({ value, children, activeTab }: TabsContentProps) {
  if (value !== activeTab) return null
  return <div>{children}</div>
}