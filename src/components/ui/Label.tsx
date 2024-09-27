import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ children, ...props }) {
  return <label {...props}>{children}</label>;
}