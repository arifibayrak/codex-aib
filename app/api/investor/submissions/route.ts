import { NextResponse } from 'next/server';
import { submissionRepository } from '@/lib/db/repository';

export async function GET() {
  const submissions = submissionRepository.list();
  return NextResponse.json({ submissions });
}
