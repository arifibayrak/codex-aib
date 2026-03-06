import { UploadForm } from '@/components/founder/upload-form';

export default function UploadPage({ searchParams }: { searchParams: { submissionId?: string } }) {
  const submissionId = searchParams.submissionId;
  if (!submissionId) return <p>Missing submission ID.</p>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Document upload</h1>
      <UploadForm submissionId={submissionId} />
    </div>
  );
}
