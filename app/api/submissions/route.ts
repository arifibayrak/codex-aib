import { NextResponse } from 'next/server';
import { submissionRepository } from '@/lib/db/repository';
import { trackEvent } from '@/lib/analytics/events';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const created = submissionRepository.create(payload);
    trackEvent('submission_created', { submissionId: created.submission.id });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid submission payload', details: `${error}` }, { status: 400 });
  }
}
