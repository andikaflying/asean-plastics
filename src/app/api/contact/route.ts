import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { CONTACT_FORM_SCHEMA } from '@/lib/contact-schema';
import { applyMockRequestBehavior } from '@/lib/mock-request';

export async function POST(request: NextRequest) {
  const mockResponse = await applyMockRequestBehavior(request);
  if (mockResponse) return mockResponse;

  const body: unknown = await request.json();
  const result = CONTACT_FORM_SCHEMA.safeParse(body);

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    return NextResponse.json({ fieldErrors }, { status: 422 });
  }

  return NextResponse.json(
    { message: 'Thanks — your message has been received.' },
    { status: 201 },
  );
}
