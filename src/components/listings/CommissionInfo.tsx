"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface CommissionInfoProps {
  listingId: string;
  token: string;
}

export default function CommissionInfo({ listingId, token }: CommissionInfoProps) {
  const [commissionType, setCommissionType] = useState<string | null>(null);
  const [commissionValue, setCommissionValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const response = await fetch(`/api/listings/${listingId}/verify-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        setCommissionType(data.commissionType);
        setCommissionValue(data.commissionValue);
        setIsValid(true);
      } else {
        setIsValid(false);
      }

      setIsLoading(false);
    };

    verifyToken();
  }, [listingId, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    router.push('/');
    return null;
  }

  return (
    <div>
      <h2>Commission Information</h2>
      <p>Commission Type: {commissionType}</p>
      <p>Commission Value: {commissionValue}</p>
    </div>
  );
}