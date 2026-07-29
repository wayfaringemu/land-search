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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">🏞️ Land Search</h1>
          <p className="text-green-100">Find your perfect property today</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>

              <div className="space-y-4">
                {/* Location Filters */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g., Austin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value.toUpperCase())}
                    placeholder="e.g., TX"
                    maxLength={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g., 78741"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Land Size Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Min Acres
                  </label>
                  <input
                    type="number"
                    value={minAcres}
                    onChange={(e) => setMinAcres(e.target.value)}
                    placeholder="e.g., 20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Price Filters */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="e.g., 100000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="e.g., 500000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Buttons */}
                <div className="space-y-2 pt-4">
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-gray-600 text-sm">
                {results.length === 0 && !loading
                  ? 'No properties found'
                  : `Showing ${results.length} propert${results.length === 1 ? 'y' : 'ies'}`}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Loading...</div>
              </div>
            ) : results.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">No properties match your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((property) => (
                  <Link key={property.id} href={`/property/${property.id}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer transform hover:scale-105">
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={property.imageUrl}
                          alt={property.address}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                          {property.acres.toFixed(1)} acres
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">
                          {property.address}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {property.city}, {property.state} {property.zipCode}
                        </p>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                          {property.description}
                        </p>

                        <div className="border-t pt-3">
                          <p className="text-2xl font-bold text-green-600">
                            {formatPrice(property.price)}
                          </p>
                          <p className="text-gray-600 text-sm">
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
