import React from 'react';
import { cn } from "@/lib/utils";

export const Alert = ({ children, ...props }) => {
  return <div role="alert" {...props}>{children}</div>;
};

export const AlertDescription = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};