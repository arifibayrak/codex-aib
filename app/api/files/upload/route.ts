import { NextResponse } from 'next/server';
import { submissionRepository } from '@/lib/db/repository';

export async function POST(req: Request) {
  try {
    const { submissionId, type, fileName } = await req.json();
    const record = submissionRepository.getById(submissionId);
    if (!record) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

    const newFile = {
      id: crypto.randomUUID(),
      submission_id: submissionId,
      type,
      file_path: `uploads/${submissionId}/${fileName}`,
      uploaded_at: new Date().toISOString()
    };
    record.files.push(newFile);
    if (record.submission.status === 'draft') record.submission.status = 'uploaded';
    submissionRepository.update(record);

    return NextResponse.json({ file: newFile, storage: 'mock' });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed', details: `${error}` }, { status: 400 });
  }
}
