"use client";

import React from 'react';

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Make label optional
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
};

export default Input;