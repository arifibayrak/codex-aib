import { NextResponse } from 'next/server';
import { submissionRepository } from '@/lib/db/repository';

export async function POST(req: Request) {
  const { submissionId, questionId, answer } = await req.json();
  const record = submissionRepository.getById(submissionId);
  if (!record) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

  const question = record.followups.find((f) => f.id === questionId);
  if (!question) return NextResponse.json({ error: 'Follow-up question not found' }, { status: 404 });

  question.answer = answer;
  question.answered = true;
  submissionRepository.update(record);

  return NextResponse.json({ followup: question });
}
