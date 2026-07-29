'use client';

import { useParams, useRouter } from 'next/navigation';
import { landListings } from '@/lib/land-data';

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const property = landListings.find((p) => p.id === params.id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-blue-600 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => router.push('/')}
            className="mb-4 text-green-100 hover:text-white font-semibold flex items-center gap-2"
          >
            ← Back to Search
          </button>
          <h1 className="text-3xl font-bold">{property.address}</h1>
          <p className="text-green-100">
            {property.city}, {property.state} {property.zipCode}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image */}
          <div className="h-96 bg-gray-200 overflow-hidden">
            <img
              src={property.imageUrl}
              alt={property.address}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-600">
                <p className="text-gray-600 text-sm font-semibold mb-1">Total Land</p>
                <p className="text-3xl font-bold text-green-600">
                  {property.acres.toFixed(1)} acres
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-600 text-sm font-semibold mb-1">Total Price</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-600">
                <p className="text-gray-600 text-sm font-semibold mb-1">Price per Acre</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatPrice(property.pricePerAcre)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Address</p>
                  <p className="text-lg text-gray-800">{property.address}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">City</p>
                  <p className="text-lg text-gray-800">{property.city}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">State</p>
                  <p className="text-lg text-gray-800">{property.state}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Zip Code</p>
                  <p className="text-lg text-gray-800">{property.zipCode}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Latitude</p>
                  <p className="text-lg text-gray-800">{property.lat.toFixed(4)}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Longitude</p>
                  <p className="text-lg text-gray-800">{property.lng.toFixed(4)}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Interested in this property?</h3>
              <p className="mb-4">Contact our real estate team for more information</p>
              <button className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition">
                Schedule a Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
