import { NextRequest, NextResponse } from 'next/server';
import { searchLand } from '@/lib/land-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const filters = {
    city: searchParams.get('city') || undefined,
    state: searchParams.get('state') || undefined,
    zipCode: searchParams.get('zipCode') || undefined,
    minAcres: searchParams.get('minAcres') ? parseFloat(searchParams.get('minAcres')!) : undefined,
    minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
    maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
  };

  const results = searchLand(filters);

  return NextResponse.json(results);
}
