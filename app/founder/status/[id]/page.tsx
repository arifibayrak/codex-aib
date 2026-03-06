import Link from 'next/link';

async function getSubmission(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/submissions/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function FounderStatusPage({ params }: { params: { id: string } }) {
  const record = await getSubmission(params.id);
  if (!record) return <p>Submission not found.</p>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Submission status</h1>
      <p>Status: <strong>{record.submission.status}</strong></p>
      <p>QA flags: {record.qaFlags.length}</p>
      <Link className="text-blue-700 underline" href={`/founder/followups/${record.submission.id}`}>
        Review follow-up questions
      </Link>
    </div>
  );
}
