'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, ChevronLeft, Home, Building, Map, Star, Upload,
  ShoppingBag, Briefcase, Factory, Leaf, Mountain, Umbrella, Heart, School,
  PlusCircle, DollarSign, Key, AlertTriangle, Info, X, Camera,
  SquareDot, MapPin, Bed, Bath, Calendar, Car, Trees, BarChart, FileText, Settings
} from 'lucide-react'
import { 
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import { sanitizeInput } from '@/lib/sanitize' // Create this utility function
import { toast } from 'react-hot-toast' // For user notifications
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const primaryTypes = [
  { id: 'residential', name: 'Residential', icon: Home },
  { id: 'commercial', name: 'Commercial', icon: Building },
  { id: 'land', name: 'Land', icon: Map },
  { id: 'special-purpose', name: 'Special Purpose', icon: Star },
]

const specificTypes = {
  residential: [
    { id: 'single-family', name: 'Single Family', icon: Home },
    { id: 'condo-townhouse', name: 'Condo/Townhouse', icon: Building },
    { id: 'multi-family', name: 'Multi-Family', icon: Building },
    { id: 'manufactured-mobile', name: 'Manufactured/Mobile Home', icon: Home },
  ],
  commercial: [
    { id: 'retail', name: 'Retail', icon: ShoppingBag },
    { id: 'office', name: 'Office', icon: Briefcase },
    { id: 'industrial', name: 'Industrial', icon: Factory },
    { id: 'mixed-use', name: 'Mixed-Use', icon: Building },
    { id: 'multi-family-5plus', name: 'Multi-Family (5+ units)', icon: Building },
  ],
  land: [
    { id: 'residential-lot', name: 'Residential Lot', icon: Map },
    { id: 'agricultural', name: 'Agricultural', icon: Leaf },
    { id: 'commercial-lot', name: 'Commercial Lot', icon: Map },
    { id: 'recreational', name: 'Recreational', icon: Mountain },
  ],
  'special-purpose': [
    { id: 'vacation-resort', name: 'Vacation/Resort', icon: Umbrella },
    { id: 'senior-living', name: 'Senior Living', icon: Heart },
    { id: 'student-housing', name: 'Student Housing', icon: School },
  ],
}

const secondaryCharacteristics = {
  residential: [
    { id: 'new-construction', name: 'New Construction', icon: PlusCircle },
    { id: 'resale', name: 'Resale', icon: Home },
    { id: 'for-sale', name: 'For Sale', icon: DollarSign },
    { id: 'for-rent', name: 'For Rent', icon: Key },
    { id: 'foreclosure-reo', name: 'Foreclosure/REO', icon: AlertTriangle },
    { id: 'short-sale', name: 'Short Sale', icon: AlertTriangle },
  ],
  commercial: [
    { id: 'for-sale', name: 'For Sale', icon: DollarSign },
    { id: 'for-lease', name: 'For Lease', icon: Key },
    { id: 'investment', name: 'Investment Property', icon: Briefcase },
    { id: 'reo', name: 'REO', icon: AlertTriangle },
    { id: 'development', name: 'Development Opportunity', icon: PlusCircle },
  ],
  land: [
    { id: 'for-sale', name: 'For Sale', icon: DollarSign },
    { id: 'for-lease', name: 'For Lease', icon: Key },
    { id: 'development', name: 'Development Opportunity', icon: PlusCircle },
  ],
  'special-purpose': [
    { id: 'for-sale', name: 'For Sale', icon: DollarSign },
    { id: 'for-lease', name: 'For Lease', icon: Key },
    { id: 'investment', name: 'Investment Property', icon: Briefcase },
    { id: 'reo', name: 'REO', icon: AlertTriangle },
    { id: 'development', name: 'Development Opportunity', icon: PlusCircle },
  ],
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}

const areaUnits = [
  { value: 'sqft', label: 'sq ft' },
  { value: 'sqm', label: 'sq m' },
  { value: 'acres', label: 'acres' },
  { value: 'hectares', label: 'hectares' },
]

export default function AddNewListing() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const [step, setStep] = useState(1)
  const [primaryType, setPrimaryType] = useState('')
  const [specificType, setSpecificType] = useState('')
  const [characteristics, setCharacteristics] = useState<string[]>([])
  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    buildingArea: '',
    lotArea: '',
    address: '',
    yearBuilt: '',
    parkingSpaces: '',
    amenities: '',
    latitude: '',
    longitude: '',
  })
  const [images, setImages] = useState<File[]>([])
  const [isOfferingCommission, setIsOfferingCommission] = useState(false)
  const [commission, setCommission] = useState({ type: 'percentage', value: '' })
  const [buildingAreaUnit, setBuildingAreaUnit] = useState('sqft')
  const [lotAreaUnit, setLotAreaUnit] = useState('sqft')
  const [additionalInfoFields, setAdditionalInfoFields] = useState<string[]>([])
  const [additionalInfo, setAdditionalInfo] = useState({
    yearBuilt: '',
    parkingSpaces: '',
    amenities: '',
  })

  const handleNext = () => {
    if (step === 1 && primaryType) {
      setStep(2)
    } else if (step === 2 && specificType) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleCharacteristicChange = (id: string) => {
    setCharacteristics(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handlePropertyDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const sanitizedValue = sanitizeInput(value)
    setPropertyDetails(prev => ({ ...prev, [name]: sanitizedValue }))
  }

  const handleImageUpload = (files: File[]) => {
    setImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (status !== 'authenticated') {
      toast.error('You must be logged in to create a listing.');
      return;
    }

    try {
      const formData = new FormData();
      const listingData = {
        title: propertyDetails.title,
        description: propertyDetails.description,
        price: Number(propertyDetails.price),
        primaryType,
        specificType,
        characteristics,
        buildingArea: propertyDetails.buildingArea ? Number(propertyDetails.buildingArea) : undefined,
        buildingAreaUnit,
        lotArea: propertyDetails.lotArea ? Number(propertyDetails.lotArea) : undefined,
        lotAreaUnit,
        address: propertyDetails.address,
        location: propertyDetails.address, // This might be redundant with address
        bedrooms: propertyDetails.bedrooms ? Number(propertyDetails.bedrooms) : undefined,
        bathrooms: propertyDetails.bathrooms ? Number(propertyDetails.bathrooms) : undefined,
        yearBuilt: additionalInfo.yearBuilt ? Number(additionalInfo.yearBuilt) : undefined,
        parkingSpaces: additionalInfo.parkingSpaces ? Number(additionalInfo.parkingSpaces) : undefined,
        amenities: additionalInfo.amenities,
        isOfferingCommission,
        commissionType: commission.type,
        commissionValue: commission.value ? Number(commission.value) : undefined,
        latitude: propertyDetails.latitude,
        longitude: propertyDetails.longitude,
      };

      formData.append('listingData', JSON.stringify(listingData));
      images.forEach((image) => formData.append('images', image));

      console.log('Submitting listing data:', listingData); // Add this line

      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status); // Add this line
      console.log('Response data:', await response.json()); // Add this line

      if (response.ok) {
        toast.success('Listing created successfully!');
        resetForm();
      } else {
        toast.error('Error creating listing. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      toast.error('Error creating listing. Please try again.');
    }
  };

  const handleCommissionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCommission(prev => ({ ...prev, [name]: value }))
  }

  const handleAreaUnitChange = (value: string, areaType: 'building' | 'lot') => {
    console.log(`Changing ${areaType} unit to:`, value);
    if (areaType === 'building') {
      setBuildingAreaUnit(value);
    } else {
      setLotAreaUnit(value);
    }
  }

  const handleAdditionalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const sanitizedValue = sanitizeInput(value)
    setAdditionalInfo(prev => ({ ...prev, [name]: sanitizedValue }))
  }

  const toggleAdditionalInfoField = (field: string) => {
    setAdditionalInfoFields(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    )
  }

  const renderPropertyDetailsFields = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title" className="text-lg font-semibold">Title</Label>
            <Input
              id="title"
              name="title"
              value={propertyDetails.title}
              onChange={handlePropertyDetailChange}
              className="mt-2 text-lg"
            />
          </div>
          <div>
            <Label htmlFor="price" className="text-lg font-semibold">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={propertyDetails.price}
              onChange={handlePropertyDetailChange}
              className="mt-2 text-lg"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={propertyDetails.description}
            onChange={handlePropertyDetailChange}
            className="mt-2 text-lg"
            rows={4}
          />
        </div>

        {primaryType === 'residential' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="bedrooms" className="text-lg font-semibold">Bedrooms</Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                value={propertyDetails.bedrooms}
                onChange={handlePropertyDetailChange}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms" className="text-lg font-semibold">Bathrooms</Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                value={propertyDetails.bathrooms}
                onChange={handlePropertyDetailChange}
                className="mt-2 text-lg"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="buildingArea" className="text-lg font-semibold">Building Area</Label>
            <div className="flex mt-2">
              <Input
                id="buildingArea"
                name="buildingArea"
                type="number"
                value={propertyDetails.buildingArea}
                onChange={handlePropertyDetailChange}
                className="text-lg flex-grow"
              />
              <Select 
                value={buildingAreaUnit} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleAreaUnitChange(e.target.value, 'building')}
              >
                <SelectTrigger>
                  <SelectValue>{buildingAreaUnit}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {areaUnits.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="lotArea" className="text-lg font-semibold">Lot Area</Label>
            <div className="flex mt-2">
              <Input
                id="lotArea"
                name="lotArea"
                type="number"
                value={propertyDetails.lotArea}
                onChange={handlePropertyDetailChange}
                className="text-lg flex-grow"
              />
              <Select 
                value={lotAreaUnit} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleAreaUnitChange(e.target.value, 'lot')}
              >
                <SelectTrigger>
                  <SelectValue>{lotAreaUnit}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {areaUnits.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="text-lg font-semibold">Address</Label>
          <Input
            id="address"
            name="address"
            value={propertyDetails.address}
            onChange={handlePropertyDetailChange}
            className="mt-2 text-lg"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['yearBuilt', 'parkingSpaces', 'amenities'].map((field) => (
              <Button
                key={field}
                onClick={() => toggleAdditionalInfoField(field)}
                variant={additionalInfoFields.includes(field) ? "default" : "outline"}
                size="sm"
              >
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </Button>
            ))}
          </div>
          {additionalInfoFields.includes('yearBuilt') && (
            <div className="mb-4">
              <Label htmlFor="yearBuilt" className="text-lg font-semibold">Year Built</Label>
              <Input
                id="yearBuilt"
                name="yearBuilt"
                type="number"
                value={additionalInfo.yearBuilt}
                onChange={handleAdditionalInfoChange}
                className="mt-2 text-lg"
              />
            </div>
          )}
          {additionalInfoFields.includes('parkingSpaces') && (
            <div className="mb-4">
              <Label htmlFor="parkingSpaces" className="text-lg font-semibold">Parking Spaces</Label>
              <Input
                id="parkingSpaces"
                name="parkingSpaces"
                type="number"
                value={additionalInfo.parkingSpaces}
                onChange={handleAdditionalInfoChange}
                className="mt-2 text-lg"
              />
            </div>
          )}
          {additionalInfoFields.includes('amenities') && (
            <div className="mb-4">
              <Label htmlFor="amenities" className="text-lg font-semibold">Amenities</Label>
              <Textarea
                id="amenities"
                name="amenities"
                value={additionalInfo.amenities}
                onChange={handleAdditionalInfoChange}
                className="mt-2 text-lg"
                rows={3}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderCommissionSection = () => {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Commission Information</h3>
          <div className="mb-4">
            <Label htmlFor="isOfferingCommission" className="flex items-center">
              <input
                type="checkbox"
                id="isOfferingCommission"
                checked={isOfferingCommission}
                onChange={(e) => setIsOfferingCommission(e.target.checked)}
                className="mr-2"
                aria-label="Seller Offering Commission"
              />
              Seller Offering Commission?
            </Label>
          </div>
          {isOfferingCommission && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="commissionValue">Commission Value</Label>
                <Input
                  id="commissionValue"
                  type="number"
                  name="value"
                  value={commission.value}
                  onChange={handleCommissionChange}
                  placeholder="Enter commission value"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="commissionType">Commission Type</Label>
                <select
                  id="commissionType"
                  name="type"
                  value={commission.type}
                  onChange={handleCommissionChange}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                  aria-label="Commission Type"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderStep1 = () => {
    return (
      <motion.div key="step1" {...fadeInUp}>
        <h2 className="text-2xl font-bold mb-4">Select Primary Property Type</h2>
        <p className="text-gray-600 mb-4">Choose the main category that best describes your property.</p>
        <RadioGroup 
          className="grid grid-cols-2 md:grid-cols-4 gap-4" 
          value={primaryType} 
          onValueChange={setPrimaryType}
        >
          {primaryTypes.map((type) => (
            <Label
              key={type.id}
              htmlFor={type.id}
              className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                primaryType === type.id
                  ? 'bg-blue-50 border-blue-500 shadow-md'
                  : 'hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors duration-200 ${
                primaryType === type.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <type.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium text-center transition-colors duration-200 ${
                primaryType === type.id ? 'text-blue-700' : 'text-gray-900'
              }`}>
                {type.name}
              </span>
            </Label>
          ))}
        </RadioGroup>
      </motion.div>
    )
  }

  const renderPreview = () => {
    if (step === 1) return null;

    const getTypeIcon = () => {
      switch(primaryType) {
        case 'residential': return <Home className="w-6 h-6" />;
        case 'commercial': return <Building className="w-6 h-6" />;
        case 'land': return <Map className="w-6 h-6" />;
        case 'special-purpose': return <Star className="w-6 h-6" />;
        default: return null;
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2 flex items-center">
          <Info className="w-5 h-5 mr-2" /> Listing Preview
        </h3>
        <div className="space-y-4">
          {step >= 2 && (
            <>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700 flex items-center">
                  {getTypeIcon()}
                  <span className="ml-2">Type:</span>
                </span>
                <span className="text-gray-800 font-semibold">
                  {`${primaryType.charAt(0).toUpperCase() + primaryType.slice(1)} - ${specificType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`}
                </span>
              </div>
              {characteristics.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Characteristics:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {characteristics.map(char => (
                      <span key={char} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {char.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          {step === 3 && (
            <>
              <PreviewItem icon={<DollarSign className="w-5 h-5" />} label="Price" value={`$${Number(propertyDetails.price).toLocaleString()}`} />
              <Separator className="my-4" />
              <h4 className="font-medium text-gray-700 mb-2">Commission</h4>
              {isOfferingCommission ? (
                <PreviewItem
                  icon={<DollarSign className="w-5 h-5" />}
                  label="Seller Commission"
                  value={`${commission.value}${commission.type === 'percentage' ? '%' : '$'}`}
                />
              ) : (
                <p className="text-gray-500">No commission offered by seller</p>
              )}
              <PreviewItem 
                icon={<SquareDot className="w-5 h-5" />} 
                label="Building Area" 
                value={`${Number(propertyDetails.buildingArea).toLocaleString()} ${buildingAreaUnit}`} 
              />
              <PreviewItem 
                icon={<Trees className="w-5 h-5" />} 
                label="Lot Area" 
                value={`${Number(propertyDetails.lotArea).toLocaleString()} ${lotAreaUnit}`} 
              />
              <PreviewItem icon={<MapPin className="w-5 h-5" />} label="Address" value={propertyDetails.address} />
              {primaryType === 'residential' && propertyDetails.bedrooms && (
                <PreviewItem icon={<Bed className="w-5 h-5" />} label="Bedrooms" value={propertyDetails.bedrooms} />
              )}
              {primaryType === 'residential' && propertyDetails.bathrooms && (
                <PreviewItem icon={<Bath className="w-5 h-5" />} label="Bathrooms" value={propertyDetails.bathrooms} />
              )}
              {additionalInfoFields.includes('yearBuilt') && additionalInfo.yearBuilt && (
                <PreviewItem icon={<Calendar className="w-5 h-5" />} label="Year Built" value={additionalInfo.yearBuilt} />
              )}
              {additionalInfoFields.includes('parkingSpaces') && additionalInfo.parkingSpaces && (
                <PreviewItem icon={<Car className="w-5 h-5" />} label="Parking Spaces" value={additionalInfo.parkingSpaces} />
              )}
              {additionalInfoFields.includes('amenities') && additionalInfo.amenities && (
                <PreviewItem icon={<Star className="w-5 h-5" />} label="Amenities" value={additionalInfo.amenities} />
              )}
            </>
          )}
        </div>
        {step === 3 && images.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <Camera className="w-5 h-5 mr-2" /> Images
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-20 object-cover rounded shadow-sm"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const PreviewItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <span className="font-medium text-gray-700 flex items-center">
        {icon}
        <span className="ml-2">{label}:</span>
      </span>
      <span className="text-gray-800 font-semibold">{value}</span>
    </div>
  );

  const steps = [
    { number: 1, title: "Property Type" },
    { number: 2, title: "Specific Details" },
    { number: 3, title: "Listing Information" }
  ];

  const renderSideMenu = () => {
    return (
      <aside className="w-64 bg-white shadow-md z-20">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">2Click Broker</h1>
        </div>
        <nav className="mt-6">
          <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/listing-finder" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <MapPin className="w-5 h-5 mr-3" />
            Listing Finder
          </Link>
          <Link href="/analytics" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <BarChart className="w-5 h-5 mr-3" />
            Analytics
          </Link>
          <Link href="/listing-manager" className="flex items-center px-6 py-3 text-gray-700 bg-gray-100">
            <FileText className="w-5 h-5 mr-3" />
            Listing Manager
          </Link>
          <Link href="/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </aside>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {renderSideMenu()}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Listing</h1>
          
          {/* Enhanced Progress Bar */}
          <div className="mb-12 relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-blue-200">
              <motion.div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <div className="flex justify-between">
              {steps.map((s, index) => (
                <div key={s.number} className="text-center relative">
                  <motion.div
                    className={`w-10 h-10 mx-auto rounded-full text-lg flex items-center justify-center ${
                      step >= s.number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: step === s.number ? 1.2 : 1,
                      backgroundColor: step >= s.number ? '#3B82F6' : '#E5E7EB',
                      color: step >= s.number ? '#FFFFFF' : '#4B5563'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {s.number}
                  </motion.div>
                  <div className="text-xs font-medium text-gray-600 mt-2">{s.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-8">
            <div className="w-2/3">
              <AnimatePresence mode="wait">
                {step === 1 && renderStep1()}
                {step === 2 && (
                  <motion.div key="step2" {...fadeInUp}>
                    <h2 className="text-2xl font-bold mb-4">Select Specific Type</h2>
                    <p className="text-gray-600 mb-4">Choose the specific type of property you're listing.</p>
                    <RadioGroup 
                      className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6" 
                      value={specificType} 
                      onValueChange={setSpecificType}
                    >
                      {specificTypes[primaryType as keyof typeof specificTypes].map((type) => (
                        <Label
                          key={type.id}
                          htmlFor={type.id}
                          className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            specificType === type.id
                              ? 'bg-blue-50 border-blue-500 shadow-md'
                              : 'hover:bg-gray-50 hover:border-gray-300'
                          }`}
                        >
                          <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors duration-200 ${
                            specificType === type.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <type.icon className="w-6 h-6" />
                          </div>
                          <span className={`text-sm font-medium text-center transition-colors duration-200 ${
                            specificType === type.id ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {type.name}
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">Secondary Characteristics</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0">
                              <Info className="w-5 h-5 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>You can select multiple characteristics that apply to your listing.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-gray-600 mb-4">Select all that apply to your property. You can choose multiple options.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {secondaryCharacteristics[primaryType as keyof typeof secondaryCharacteristics].map((char) => (
                        <div
                          key={char.id}
                          onClick={() => handleCharacteristicChange(char.id)}
                          className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                            characteristics.includes(char.id)
                              ? 'bg-blue-50 border-blue-500'
                              : 'hover:bg-gray-50 hover:border-gray-300'
                          }`}
                        >
                          <char.icon className={`w-5 h-5 ${
                            characteristics.includes(char.id) ? 'text-blue-500' : 'text-gray-500'
                          }`} />
                          <span className={`text-sm font-medium ${
                            characteristics.includes(char.id) ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {char.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" {...fadeInUp}>
                    <h2 className="text-2xl font-semibold mb-4">Property Details and Images</h2>
                    <Card>
                      <CardContent className="p-6">
                        {renderPropertyDetailsFields()}
                      </CardContent>
                    </Card>
                    {renderCommissionSection()}
                    <div className="mt-6">
                      <Label className="text-lg font-semibold">Images</Label>
                      <ImageUpload onUpload={handleImageUpload} maxFiles={5} />
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Uploaded image ${index + 1}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Remove image"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <Button onClick={handleBack} variant="outline">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button onClick={handleNext} className="ml-auto">
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="ml-auto bg-blue-600 hover:bg-blue-700">
                    Submit Listing <PlusCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="w-1/3">
              <div className="sticky top-6">
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}