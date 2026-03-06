import { NextResponse } from 'next/server';
import { submissionRepository } from '@/lib/db/repository';
import { extractionService, validationService } from '@/lib/services';

export async function POST(req: Request) {
  const { submissionId } = await req.json();
  const record = submissionRepository.getById(submissionId);
  if (!record) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

  const extractionResult = await extractionService.extractFromSubmission(record);
  const result = await validationService.run(record, extractionResult);

  record.extraction = result.extraction;
  record.qaFlags = result.flags;
  record.submission.status = result.flags.length ? 'needs_followup' : 'ready_for_review';
  submissionRepository.update(record);

  return NextResponse.json({ quality: result.extraction.quality, flags: result.flags });
}
