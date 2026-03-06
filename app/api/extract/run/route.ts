import { NextResponse } from 'next/server';
import { submissionRepository } from '@/lib/db/repository';
import { extractionService } from '@/lib/services';

export async function POST(req: Request) {
  const { submissionId } = await req.json();
  const record = submissionRepository.getById(submissionId);
  if (!record) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

  record.submission.status = 'processing';
  const extractionResult = await extractionService.extractFromSubmission(record);
  record.extraction = extractionResult.extraction;
  submissionRepository.update(record);

  return NextResponse.json({ extraction: extractionResult.extraction, evidence: extractionResult.evidence });
}
