import { FC, ReactNode, useState } from 'react';

interface TabsProps {
  children: ReactNode;
  className?: string;
}

export const Tabs: FC<TabsProps> = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`tabs ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isActive: index === activeTab,
            onClick: () => setActiveTab(index),
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: FC<TabsListProps> = ({ children, className }) => {
  return <div className={`tabs-list ${className}`}>{children}</div>;
};

interface TabsTriggerProps {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const TabsTrigger: FC<TabsTriggerProps> = ({ children, isActive, onClick, className }) => {
  return (
    <button
      className={`tabs-trigger ${isActive ? 'active' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};