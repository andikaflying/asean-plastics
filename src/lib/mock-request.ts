import { NextResponse, type NextRequest } from 'next/server';

/**
 * Shared mock-API behaviour: `?__delay=ms` simulates latency, `?__error=1`
 * forces a 500 response. Lets loading/error states be exercised on demand.
 */
export async function applyMockRequestBehavior(request: NextRequest): Promise<NextResponse | null> {
  const { searchParams } = request.nextUrl;

  const delay = Number(searchParams.get('__delay'));
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  if (searchParams.get('__error') === '1') {
    return NextResponse.json({ message: 'Simulated server error' }, { status: 500 });
  }

  return null;
}
