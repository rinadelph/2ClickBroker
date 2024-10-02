'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, ChevronLeft, Home, Building, Map, Star, Upload,
  ShoppingBag, Briefcase, Factory, Leaf, Mountain, Umbrella, Heart, School,
  PlusCircle, DollarSign, Key, AlertTriangle, Info
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

export default function AddNewListing() {
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
    squareFootage: '',
    address: '',
  })
  const [images, setImages] = useState<File[]>([])

  const handleNext = () => {
    if (step === 1 && primaryType) {
      setStep(2)
    } else if (step === 2 && specificType) {
      console.log('Selected listing type:', { primaryType, specificType, characteristics })
      // Here you would typically move to the next major step in your form or submit the data
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
      setSpecificType('')
      setCharacteristics([])
    }
  }

  const handleCharacteristicChange = (id: string) => {
    setCharacteristics(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handlePropertyDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPropertyDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (files: File[]) => {
    setImages(prev => [...prev, ...files])
  }

  const handleSubmit = async () => {
    // Implement form submission logic here
    console.log('Submitting:', { primaryType, specificType, characteristics, propertyDetails, images })
    // Call API to create new listing
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Add New Listing</h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
          <div className={`w-16 h-1 ${step === 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
        </div>
        <p className="text-sm text-gray-500">Step {step} of 2</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
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
            )}
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
                <h2 className="text-2xl font-bold mb-4">Property Details and Images</h2>
                <div className="space-y-4">
                  <Input
                    name="title"
                    value={propertyDetails.title}
                    onChange={handlePropertyDetailChange}
                    placeholder="Property Title"
                  />
                  <Textarea
                    name="description"
                    value={propertyDetails.description}
                    onChange={handlePropertyDetailChange}
                    placeholder="Property Description"
                  />
                  <Input
                    name="price"
                    type="number"
                    value={propertyDetails.price}
                    onChange={handlePropertyDetailChange}
                    placeholder="Price"
                  />
                  <Input
                    name="bedrooms"
                    type="number"
                    value={propertyDetails.bedrooms}
                    onChange={handlePropertyDetailChange}
                    placeholder="Number of Bedrooms"
                  />
                  <Input
                    name="bathrooms"
                    type="number"
                    value={propertyDetails.bathrooms}
                    onChange={handlePropertyDetailChange}
                    placeholder="Number of Bathrooms"
                  />
                  <Input
                    name="squareFootage"
                    type="number"
                    value={propertyDetails.squareFootage}
                    onChange={handlePropertyDetailChange}
                    placeholder="Square Footage"
                  />
                  <Input
                    name="address"
                    value={propertyDetails.address}
                    onChange={handlePropertyDetailChange}
                    placeholder="Property Address"
                  />
                  <ImageUpload onUpload={handleImageUpload} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <Button type="button" onClick={handleBack} variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        )}
        <Button 
          onClick={step === 3 ? handleSubmit : handleNext}
          disabled={(step === 1 && !primaryType) || (step === 2 && !specificType)}
          className={step === 1 ? 'ml-auto' : ''}
        >
          {step === 3 ? 'Submit' : 'Continue'} <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}