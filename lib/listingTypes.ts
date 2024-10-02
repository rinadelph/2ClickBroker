import { Home, Building, Map, Star, ShoppingBag, Warehouse, Trees, Hotel, Users, GraduationCap, PlusCircle, Key, AlertTriangle, DollarSign } from 'lucide-react'

export const primaryTypes = [
  { id: 'residential', name: 'Residential', icon: Home },
  { id: 'commercial', name: 'Commercial', icon: Building },
  { id: 'land', name: 'Land', icon: Map },
  { id: 'special-purpose', name: 'Special Purpose', icon: Star },
]

export const specificTypes = {
  residential: [
    { id: 'single-family', name: 'Single Family', icon: Home },
    { id: 'condo-townhouse', name: 'Condo/Townhouse', icon: Building },
    { id: 'multi-family', name: 'Multi-Family', icon: Building },
    { id: 'manufactured-mobile', name: 'Manufactured/Mobile Home', icon: Home },
  ],
  commercial: [
    { id: 'retail', name: 'Retail', icon: ShoppingBag },
    { id: 'office', name: 'Office', icon: Building },
    { id: 'industrial', name: 'Industrial', icon: Warehouse },
    { id: 'mixed-use', name: 'Mixed-Use', icon: Building },
    { id: 'multi-family-5plus', name: 'Multi-Family (5+ units)', icon: Building },
  ],
  land: [
    { id: 'residential-lot', name: 'Residential Lot', icon: Map },
    { id: 'agricultural', name: 'Agricultural', icon: Trees },
    { id: 'commercial-lot', name: 'Commercial Lot', icon: Map },
    { id: 'recreational', name: 'Recreational', icon: Trees },
  ],
  'special-purpose': [
    { id: 'vacation-resort', name: 'Vacation/Resort', icon: Hotel },
    { id: 'senior-living', name: 'Senior Living', icon: Users },
    { id: 'student-housing', name: 'Student Housing', icon: GraduationCap },
  ],
}

export const secondaryCharacteristics = [
  { id: 'new-construction', name: 'New Construction', icon: PlusCircle },
  { id: 'resale', name: 'Resale', icon: Home },
  { id: 'for-sale', name: 'For Sale', icon: DollarSign },
  { id: 'for-rent', name: 'For Rent', icon: Key },
  { id: 'foreclosure-reo', name: 'Foreclosure/REO', icon: AlertTriangle },
  { id: 'short-sale', name: 'Short Sale', icon: AlertTriangle },
]