import { FC, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface CalendarProps {
  mode: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void;
  className?: string;
}

export const Calendar: FC<CalendarProps> = ({ mode, selected, onSelect, className }) => {
  return (
    <div className={`p-4 bg-white shadow-md rounded-lg ${className}`}>
      <DayPicker
        mode={mode}
        selected={selected}
        onSelect={onSelect}
      />
    </div>
  );
};