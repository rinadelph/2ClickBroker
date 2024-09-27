"use client";

import React from 'react';

interface CommissionInfoProps {
  commission: {
    id: number;
    amount: number;
    listingId: number;
  };
}

const CommissionInfo: React.FC<CommissionInfoProps> = ({ commission }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Commission Information</h3>
      <p>Commission ID: {commission.id}</p>
      <p>Amount: ${commission.amount}</p>
      <p>Listing ID: {commission.listingId}</p>
    </div>
  );
};

export default CommissionInfo;