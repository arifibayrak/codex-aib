import { NextResponse } from 'next/server';
import { submissionRepository } from '@/lib/db/repository';
import { summaryService } from '@/lib/services';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const record = submissionRepository.getById(params.id);
  if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  record.investorSummary = await summaryService.summarize(record);
  submissionRepository.update(record);

  return NextResponse.json(record);
}
