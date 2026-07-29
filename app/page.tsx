'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LandListing } from '@/lib/land-data';

export default function Home() {
  const [results, setResults] = useState<LandListing[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter state
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [minAcres, setMinAcres] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Load initial results
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (city) params.append('city', city);
    if (state) params.append('state', state);
    if (zipCode) params.append('zipCode', zipCode);
    if (minAcres) params.append('minAcres', minAcres);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    const response = await fetch(`/api/search?${params.toString()}`);
    const data = await response.json();
    setResults(data);
    setLoading(false);
  };

  const handleReset = () => {
    setCity('');
    setState('');
    setZipCode('');
    setMinAcres('');
    setMinPrice('');
    setMaxPrice('');
  };

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
      <header style={{ background: '#061b0e', borderBottomColor: 'rgba(6,27,14,0.1)' }} className="text-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ fontFamily: 'Manrope' }} className="text-5xl font-bold mb-2">
            Land Legacy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)' }} className="text-lg">
            Premium Real Estate Discovery
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div
              style={{
                background: '#f4f3f1',
                borderRadius: '12px',
                borderColor: 'rgba(67,72,67,0.2)'
              }}
              className="p-6 sticky top-4 border"
            >
              <h2 style={{ fontFamily: 'Manrope', color: '#061b0e' }} className="text-xl font-bold mb-6">
                Filters
              </h2>

              <div className="space-y-5">
                {/* Location Filters */}
                <div>
                  <label style={{ color: '#061b0e' }} className="block text-sm font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g., Austin"
                    style={{
                      borderColor: 'rgba(67,72,67,0.3)',
                      borderRadius: '8px'
                    }}
                    className="w-full px-3 py-2 border focus:outline-none focus:ring-2 transition"
                  />
                </div>

                <div>
                  <label style={{ color: '#061b0e' }} className="block text-sm font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value.toUpperCase())}
                    placeholder="e.g., TX"
                    maxLength={2}
                    style={{
                      borderColor: 'rgba(67,72,67,0.3)',
                      borderRadius: '8px'
                    }}
                    className="w-full px-3 py-2 border focus:outline-none focus:ring-2 transition"
                  />
                </div>

                <div>
                  <label style={{ color: '#061b0e' }} className="block text-sm font-medium mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g., 78741"
                    style={{
                      borderColor: 'rgba(67,72,67,0.3)',
                      borderRadius: '8px'
                    }}
                    className="w-full px-3 py-2 border focus:outline-none focus:ring-2 transition"
                  />
                </div>

                {/* Land Size Filter */}
                <div>
                  <label style={{ color: '#061b0e' }} className="block text-sm font-medium mb-2">
                    Min Acres
                  </label>
                  <input
                    type="number"
                    value={minAcres}
                    onChange={(e) => setMinAcres(e.target.value)}
                    placeholder="e.g., 20"
                    style={{
                      borderColor: 'rgba(67,72,67,0.3)',
                      borderRadius: '8px'
                    }}
                    className="w-full px-3 py-2 border focus:outline-none focus:ring-2 transition"
                  />
                </div>

                {/* Price Filters */}
                <div>
                  <label style={{ color: '#061b0e' }} className="block text-sm font-medium mb-2">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="e.g., 100000"
                    style={{
                      borderColor: 'rgba(67,72,67,0.3)',
                      borderRadius: '8px'
                    }}
                    className="w-full px-3 py-2 border focus:outline-none focus:ring-2 transition"
                  />
                </div>

                <div>
                  <label style={{ color: '#061b0e' }} className="block text-sm font-medium mb-2">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="e.g., 500000"
                    style={{
                      borderColor: 'rgba(67,72,67,0.3)',
                      borderRadius: '8px'
                    }}
                    className="w-full px-3 py-2 border focus:outline-none focus:ring-2 transition"
                  />
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-6">
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    style={{
                      background: '#061b0e',
                      color: '#ffffff',
                      borderRadius: '8px'
                    }}
                    className="w-full font-semibold py-3 px-4 transition hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </button>
                  <button
                    onClick={handleReset}
                    style={{
                      background: '#e3e2e0',
                      color: '#061b0e',
                      borderRadius: '8px'
                    }}
                    className="w-full font-semibold py-3 px-4 transition hover:opacity-80"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p style={{ color: '#434843' }} className="text-sm font-medium">
                {results.length === 0 && !loading
                  ? 'No properties found'
                  : `Showing ${results.length} propert${results.length === 1 ? 'y' : 'ies'}`}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div style={{ color: '#434843' }}>Loading...</div>
              </div>
            ) : results.length === 0 ? (
              <div
                style={{ background: '#f4f3f1', borderRadius: '12px', borderColor: 'rgba(67,72,67,0.2)' }}
                className="p-8 text-center border"
              >
                <p style={{ color: '#434843' }}>No properties match your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((property) => (
                  <Link key={property.id} href={`/property/${property.id}`}>
                    <div
                      style={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        border: '1px solid rgba(67,72,67,0.1)'
                      }}
                      className="overflow-hidden hover:shadow-lg transition cursor-pointer"
                    >
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={property.imageUrl}
                          alt={property.address}
                          className="w-full h-full object-cover"
                        />
                        <div style={{ background: '#061b0e', borderRadius: '6px' }} className="absolute top-3 right-3 text-white px-3 py-1 text-sm font-semibold">
                          {property.acres.toFixed(1)} acres
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 style={{ color: '#061b0e', fontFamily: 'Manrope' }} className="font-bold text-lg mb-1">
                          {property.address}
                        </h3>
                        <p style={{ color: '#434843' }} className="text-sm mb-3">
                          {property.city}, {property.state} {property.zipCode}
                        </p>

                        <p style={{ color: '#434843' }} className="text-sm mb-4 line-clamp-2">
                          {property.description}
                        </p>

                        <div className="border-t pt-3" style={{ borderColor: 'rgba(67,72,67,0.2)' }}>
                          <p style={{ color: '#076350', fontFamily: 'Manrope' }} className="text-2xl font-bold">
                            {formatPrice(property.price)}
                          </p>
                          <p style={{ color: '#434843' }} className="text-sm">
                            {formatPrice(property.pricePerAcre)}/acre
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
