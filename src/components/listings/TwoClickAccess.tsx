import React from 'react'

interface TwoClickAccessProps {
  listingId: string
}

const TwoClickAccess: React.FC<TwoClickAccessProps> = ({ listingId }) => {
  return (
    <div>
      <h2>Two Click Access</h2>
      <p>Listing ID: {listingId}</p>
      {/* Add more details or actions related to two-click access */}
    </div>
  )
}

export default TwoClickAccess