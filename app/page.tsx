'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LandListing } from '@/lib/land-data';

export default function Home() {
  const [results, setResults] = useState<LandListing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [navShadow, setNavShadow] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.append('city', searchQuery);

    const response = await fetch(`/api/search?${params.toString()}`);
    const data = await response.json();
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavShadow(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Featured/curated collections
  const collections = [
    { name: 'Timberland Assets', count: 12, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD97ZOCie84TV0Gq-0s7sVJ0VvoFOA7tp1ZE8QUmzPtG-RcWEMV9zjAH0VA4iamUujz5BxtyemORqGVTofbfOQQeYBbPUwZIPu8FJgQqp-8H0kBGjACKR16G5MYoUm07YDrGXR3RGfla6PUX72Ntv5xp_WXCMcQ2GmLp-zCaubP_9jVE_2zG5RAs5pO6rVMNN-g8EjlFDU6StHPuZLt7aMgIVpsXYOHOGbaUY2yiyc2usSoWDMfSWbB' },
    { name: 'Waterfront', count: 8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6PYuYRMvh3dVy6wGxRxLLqv5_yzDAGHFp4BLy3NKgk6haioGgqAmvv_LZ59fuiBKE5we_LjltKIKlNP7FeuPOBDMXquo_mHvsu9u5LfuAd9vyJLBroDmHLqib5Wa048Y5Ti84sOW7Zb6fa1VoLVXE038cOOptTGBvgYVBXsUkLRAnIBQVVzcU1c8vd-Ra27V4bTTvIGzURBr6U4ljwR5Y3X5CETO01RuuKgPIk7-YhIlNm4dMHXr3' },
    { name: 'Cropland', count: 15, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfRsxIuhzFer5g4io_Vsem8LClPkLSbhtyc5VOKhdmB8_Qs6TVj_bJU4GT9cCQYST4Bys46oxYi7pbaNgCus6o4TRleoXnGqdy4WiC-rxYkGkPS3eKvJ5B8iRj7ga51itVUM64n7-uZPWGSolC5bkScqYAw-jH8BxdDhe02F_pWhdwdhdXuq14T19u3Oxv1uQC76zA0AIZ3J-0iJa-iPoB83MbGPm70AiQCxWiJaK24dRY4bYfm6FB' },
  ];

  return (
    <div style={{ background: '#faf9f7', minHeight: '100vh' }} className="font-['Work_Sans']">
      {/* Top App Bar */}
      <header
        style={{
          background: '#ffffff',
          borderBottomColor: navShadow ? 'rgba(0,0,0,0.05)' : 'transparent'
        }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all ${navShadow ? 'shadow-sm' : ''}`}
      >
        <div className="flex justify-between items-center w-full px-4 py-4 max-w-7xl mx-auto">
          <button className="hover:opacity-80 transition-opacity">
            <span className="text-2xl">☰</span>
          </button>
          <h1 style={{ fontFamily: 'Manrope', color: '#061b0e' }} className="text-2xl font-bold">
            Land Legacy
          </h1>
          <button className="hover:opacity-80 transition-opacity">
            <span className="text-2xl">🔍</span>
          </button>
        </div>
      </header>

      <main className="relative min-h-screen pb-32 pt-16">
        {/* Hero Section */}
        <section className="relative h-96 w-full overflow-hidden">
          <div
            className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3jOJefyD1H0NJX5rqe1XKDFDZbd510GHUkuuf9NfDMYYo-D7nAsFFAwxGdVoKvX-B_3rHfmnv6QjvB0kvYjnVJ2BH1FYVT00Ssnen5o402oxjYOOgRIgEu1EoJ1TVajNyHEV56CiGIYeOEXW9idfRlH21B-JvHU3slL7krDK4nKqKGCoakkGte_tb8bvUuRdpio2jLPpcxtqkaDXUhrANOuTlwEGgCrd67ThJ1Vijgm_gOlVwS9T_')"
            }}
          />
          <div
            className="absolute inset-0 z-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(6, 27, 14, 0.4) 0%, rgba(6, 27, 14, 0) 50%, rgba(250, 249, 247, 1) 100%)'
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-end h-full px-4 pb-8 text-center">
            <h2 style={{ fontFamily: 'Manrope', color: '#1a1c1b' }} className="text-3xl md:text-4xl font-bold mb-6 max-w-md">
              Find Your Legacy in the Open Land.
            </h2>

            {/* Search Container */}
            <div className="w-full max-w-md rounded-xl p-2 mb-4" style={{ background: '#ffffff', boxShadow: '0 8px 32px rgba(27,48,34,0.12)' }}>
              <div
                className="flex items-center rounded-lg px-4 py-3 focus-within:ring-2 transition-all"
                style={{ background: '#f4f3f1', borderColor: '#061b0e', '--tw-ring-color': '#061b0e' } as any}
              >
                <span className="mr-3">📍</span>
                <input
                  className="bg-transparent border-none focus:ring-0 w-full font-['Work_Sans'] text-sm"
                  placeholder="Zip, City, or State"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ color: '#1a1c1b' }}
                />
                <button
                  onClick={handleSearch}
                  className="transition-opacity active:scale-95 ml-2 p-2 rounded-lg"
                  style={{ background: '#061b0e', color: '#ffffff' }}
                >
                  →
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {['5+ Acres', 'Under $100k', 'Farm Land'].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 rounded-full text-xs font-medium border transition-colors hover:text-white"
                  style={{
                    background: '#e3e2e0',
                    color: '#1a1c1b',
                    borderColor: 'rgba(67,72,67,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1b3022';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#e3e2e0';
                    e.currentTarget.style.color = '#1a1c1b';
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section className="px-4 mt-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span style={{ color: '#061b0e', fontFamily: 'JetBrains Mono' }} className="text-xs uppercase tracking-widest font-semibold">
                Collections
              </span>
              <h3 style={{ color: '#1a1c1b', fontFamily: 'Manrope' }} className="text-2xl font-bold">
                Curated Land
              </h3>
            </div>
            <button style={{ color: '#061b0e' }} className="text-sm font-semibold flex items-center gap-1 hover:opacity-70">
              VIEW ALL →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Large featured collection */}
            <Link href="#" className="col-span-2">
              <div className="aspect-video relative rounded-2xl overflow-hidden shadow-sm group cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('${collections[0].image}')`
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(6, 27, 14, 0.8) 0%, transparent 100%)'
                  }}
                />
                <div className="absolute bottom-0 left-0 p-6">
                  <p style={{ color: '#ffffff', fontFamily: 'Manrope' }} className="text-xl font-bold mb-1">
                    {collections[0].name}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'JetBrains Mono' }} className="text-xs uppercase">
                    {collections[0].count} LISTINGS
                  </p>
                </div>
              </div>
            </Link>

            {/* Smaller collections */}
            {collections.slice(1).map((collection) => (
              <Link key={collection.name} href="#" className="col-span-1">
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-sm group cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('${collection.image}')`
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(6, 27, 14, 0.8) 0%, transparent 100%)'
                    }}
                  />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p style={{ color: '#ffffff', fontFamily: 'Manrope' }} className="font-bold">
                      {collection.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Search Results Grid */}
          {searchQuery && results.length > 0 && (
            <div className="mt-12">
              <h3 style={{ color: '#1a1c1b', fontFamily: 'Manrope' }} className="text-2xl font-bold mb-6">
                Search Results ({results.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((property) => (
                  <Link key={property.id} href={`/property/${property.id}`}>
                    <div
                      className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(67,72,67,0.1)'
                      }}
                    >
                      <div className="relative h-40 bg-gray-200 overflow-hidden">
                        <img
                          src={property.imageUrl}
                          alt={property.address}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div style={{ background: '#061b0e', borderRadius: '6px' }} className="absolute top-3 right-3 text-white px-3 py-1 text-xs font-semibold">
                          {property.acres.toFixed(1)} acres
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 style={{ color: '#061b0e', fontFamily: 'Manrope' }} className="font-bold text-sm mb-1">
                          {property.address}
                        </h4>
                        <p style={{ color: '#434843' }} className="text-xs mb-3">
                          {property.city}, {property.state}
                        </p>
                        <div className="border-t pt-3" style={{ borderColor: 'rgba(67,72,67,0.1)' }}>
                          <p style={{ color: '#061b0e', fontFamily: 'Manrope' }} className="font-bold text-lg">
                            {formatPrice(property.price)}
                          </p>
                          <p style={{ color: '#434843' }} className="text-xs">
                            {formatPrice(property.pricePerAcre)}/acre
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Trust Section */}
        <section className="mt-16 px-4 py-12 rounded-t-3xl max-w-7xl mx-auto" style={{ background: '#f4f3f1' }}>
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl mb-4">✓</span>
            <h4 style={{ color: '#1a1c1b', fontFamily: 'Manrope' }} className="text-2xl font-bold mb-4">
              Authority in Acreage
            </h4>
            <p style={{ color: '#434843' }} className="mb-8 max-w-md">
              We provide detailed soil reports, historical tax data, and topographical analysis for every property.
            </p>
            <button
              className="w-full md:w-64 py-4 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: '#1b3022' }}
            >
              Start Survey
            </button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 rounded-t-2xl"
        style={{
          background: '#ffffff',
          boxShadow: '0 -4px 12px rgba(27,48,34,0.08)',
          borderTopColor: 'rgba(67,72,67,0.1)'
        }}
      >
        {[
          { icon: '🔍', label: 'Explore', active: true },
          { icon: '❤️', label: 'Saved', active: false },
          { icon: '🗺️', label: 'Map', active: false },
          { icon: '👤', label: 'Profile', active: false }
        ].map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all active:scale-90"
            style={{
              background: item.active ? '#1b3022' : 'transparent',
              color: item.active ? '#ffffff' : '#434843'
            }}
            onMouseEnter={(e) => {
              if (!item.active) {
                e.currentTarget.style.color = '#061b0e';
              }
            }}
            onMouseLeave={(e) => {
              if (!item.active) {
                e.currentTarget.style.color = '#434843';
              }
            }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
