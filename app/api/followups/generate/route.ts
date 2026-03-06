import { NextResponse } from 'next/server';
import { submissionRepository } from '@/lib/db/repository';
import { followupService } from '@/lib/services';

export async function POST(req: Request) {
  const { submissionId } = await req.json();
  const record = submissionRepository.getById(submissionId);
  if (!record) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

  const questions = await followupService.generate(record, record.qaFlags);
  record.followups = questions;
  submissionRepository.update(record);

  return NextResponse.json({ followups: questions });
}
