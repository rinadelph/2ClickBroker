# Add New Listing Feature Documentation

## Overview

The Add New Listing feature allows users to create new property listings with a multi-step form process. This feature includes selecting primary and specific property types, secondary characteristics, and detailed property information including image uploads.

## Implementation Details

### Component: AddNewListing

Location: `components/listings/AddNewListing.tsx`

This component implements a three-step form for adding new listings:

1. **Step 1**: Select Primary Property Type
   - Users choose from Residential, Commercial, Land, or Special Purpose

2. **Step 2**: Select Specific Type and Secondary Characteristics
   - Users select a specific property type based on their primary selection
   - Users can choose multiple secondary characteristics

3. **Step 3**: Enter Property Details and Upload Images
   - Users fill in detailed property information
   - Users can upload and manage multiple property images

Key features:
- Utilizes Framer Motion for smooth transitions between steps
- Implements a responsive design for various screen sizes
- Uses custom UI components for consistent styling
- Includes an image upload feature with drag-and-drop functionality

### Data Structures

- `primaryTypes`: Array of primary property types
- `specificTypes`: Object containing specific types for each primary type
- `secondaryCharacteristics`: Object containing characteristics for each primary type
- `propertyDetails`: Object containing all possible property detail fields

### State Management

The component uses React's `useState` hook to manage:
- Current step
- Selected primary type
- Selected specific type
- Selected characteristics
- Property details
- Uploaded images

### API Integration

The component sends data to the API endpoint when the form is submitted:
