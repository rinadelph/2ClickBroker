import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Listing {
  id: string;
  title: string;
  views: number;
  inquiries: number;
}

export default function TopBottomListings() {
  const { data: session } = useSession();
  const [topListings, setTopListings] = useState<Listing[]>([]);
  const [bottomListings, setBottomListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      if (session?.user?.id) {
        const response = await fetch(`/api/listings?userId=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setTopListings(data.topListings);
          setBottomListings(data.bottomListings);
        }
      }
    };

    fetchListings();
  }, [session]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Inquiries</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>{listing.title}</TableCell>
                  <TableCell>{listing.views}</TableCell>
                  <TableCell>{listing.inquiries}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bottom Performing Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Inquiries</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bottomListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>{listing.title}</TableCell>
                  <TableCell>{listing.views}</TableCell>
                  <TableCell>{listing.inquiries}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}