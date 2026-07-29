'use client';

import { useParams, useRouter } from 'next/navigation';
import { landListings } from '@/lib/land-data';

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const property = landListings.find((p) => p.id === params.id);

  if (!property) {
    return (
      <div style={{ background: '#faf9f7', minHeight: '100vh' }} className="flex items-center justify-center">
        <div className="text-center">
          <h1 style={{ color: '#061b0e', fontFamily: 'Manrope' }} className="text-2xl font-bold mb-4">
            Property Not Found
          </h1>
          <button
            onClick={() => router.push('/')}
            style={{ background: '#061b0e', color: '#ffffff' }}
            className="font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition"
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
    <div style={{ background: '#faf9f7', minHeight: '100vh' }} className="font-['Work_Sans']">
      {/* Header */}
      <header style={{ background: '#061b0e', color: '#ffffff', borderBottomColor: 'rgba(6,27,14,0.1)' }} className="py-6 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => router.push('/')}
            style={{ color: 'rgba(255,255,255,0.8)' }}
            className="mb-4 hover:text-white font-semibold flex items-center gap-2 transition"
          >
            ← Back to Search
          </button>
          <h1 style={{ fontFamily: 'Manrope' }} className="text-4xl font-bold">
            {property.address}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>
            {property.city}, {property.state} {property.zipCode}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(67,72,67,0.1)' }} className="overflow-hidden shadow-sm">
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
              <div style={{ background: '#d0e9d4', borderRadius: '8px', borderLeftColor: '#061b0e' }} className="p-6 border-l-4">
                <p style={{ color: '#061b0e' }} className="text-sm font-medium mb-1">Total Land</p>
                <p style={{ color: '#061b0e', fontFamily: 'Manrope' }} className="text-3xl font-bold">
                  {property.acres.toFixed(1)} acres
                </p>
              </div>

              <div style={{ background: '#b5c9d9', borderRadius: '8px', borderLeftColor: '#051925' }} className="p-6 border-l-4">
                <p style={{ color: '#051925' }} className="text-sm font-medium mb-1">Total Price</p>
                <p style={{ color: '#051925', fontFamily: 'Manrope' }} className="text-3xl font-bold">
                  {formatPrice(property.price)}
                </p>
              </div>

              <div style={{ background: '#e7c08c', borderRadius: '8px', borderLeftColor: '#76592e' }} className="p-6 border-l-4">
                <p style={{ color: '#76592e' }} className="text-sm font-medium mb-1">Price per Acre</p>
                <p style={{ color: '#76592e', fontFamily: 'Manrope' }} className="text-3xl font-bold">
                  {formatPrice(property.pricePerAcre)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 style={{ color: '#061b0e', fontFamily: 'Manrope' }} className="text-2xl font-bold mb-4">
                Description
              </h2>
              <p style={{ color: '#434843' }} className="leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Details */}
            <div className="mb-8">
              <h2 style={{ color: '#061b0e', fontFamily: 'Manrope' }} className="text-2xl font-bold mb-4">
                Property Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div style={{ borderColor: 'rgba(67,72,67,0.2)', borderRadius: '8px' }} className="border rounded-lg p-4">
                  <p style={{ color: '#434843' }} className="text-sm font-medium mb-1">Address</p>
                  <p style={{ color: '#061b0e' }} className="text-lg font-medium">{property.address}</p>
                </div>
                <div style={{ borderColor: 'rgba(67,72,67,0.2)', borderRadius: '8px' }} className="border rounded-lg p-4">
                  <p style={{ color: '#434843' }} className="text-sm font-medium mb-1">City</p>
                  <p style={{ color: '#061b0e' }} className="text-lg font-medium">{property.city}</p>
                </div>
                <div style={{ borderColor: 'rgba(67,72,67,0.2)', borderRadius: '8px' }} className="border rounded-lg p-4">
                  <p style={{ color: '#434843' }} className="text-sm font-medium mb-1">State</p>
                  <p style={{ color: '#061b0e' }} className="text-lg font-medium">{property.state}</p>
                </div>
                <div style={{ borderColor: 'rgba(67,72,67,0.2)', borderRadius: '8px' }} className="border rounded-lg p-4">
                  <p style={{ color: '#434843' }} className="text-sm font-medium mb-1">Zip Code</p>
                  <p style={{ color: '#061b0e' }} className="text-lg font-medium">{property.zipCode}</p>
                </div>
                <div style={{ borderColor: 'rgba(67,72,67,0.2)', borderRadius: '8px' }} className="border rounded-lg p-4">
                  <p style={{ color: '#434843' }} className="text-sm font-medium mb-1">Latitude</p>
                  <p style={{ color: '#061b0e', fontFamily: 'JetBrains Mono' }} className="text-lg font-medium">{property.lat.toFixed(4)}</p>
                </div>
                <div style={{ borderColor: 'rgba(67,72,67,0.2)', borderRadius: '8px' }} className="border rounded-lg p-4">
                  <p style={{ color: '#434843' }} className="text-sm font-medium mb-1">Longitude</p>
                  <p style={{ color: '#061b0e', fontFamily: 'JetBrains Mono' }} className="text-lg font-medium">{property.lng.toFixed(4)}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: '#061b0e', borderRadius: '8px' }} className="text-white p-8 text-center">
              <h3 style={{ fontFamily: 'Manrope' }} className="text-2xl font-bold mb-2">
                Interested in this property?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)' }} className="mb-6">
                Contact our real estate team for more information
              </p>
              <button
                style={{
                  background: '#ffffff',
                  color: '#061b0e',
                  borderRadius: '8px'
                }}
                className="font-bold py-3 px-8 hover:opacity-90 transition"
              >
                Schedule a Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
