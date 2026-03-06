'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewSubmissionForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const payload = {
      startupName: formData.get('startupName'),
      website: formData.get('website'),
      founderName: formData.get('founderName'),
      founderEmail: formData.get('founderEmail'),
      stage: formData.get('stage'),
      raiseAmountUsd: Number(formData.get('raiseAmountUsd')),
      notes: formData.get('notes')
    };

    const res = await fetch('/api/submissions', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      setError('Could not create submission. Check required fields.');
      setLoading(false);
      return;
    }
    const data = await res.json();
    router.push(`/founder/upload?submissionId=${data.submission.id}`);
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
      <h2 className="text-xl font-semibold">New startup submission</h2>
      <Input name="startupName" placeholder="Startup name" required />
      <Input name="website" placeholder="https://company.com" required />
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="founderName" placeholder="Founder full name" required />
        <Input name="founderEmail" type="email" placeholder="founder@company.com" required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input name="stage" placeholder="Pre-Seed / Seed / Series A" required />
        <Input name="raiseAmountUsd" type="number" placeholder="Raise amount (USD)" required />
      </div>
      <Input name="notes" placeholder="Optional context" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button disabled={loading}>{loading ? 'Creating...' : 'Create submission'}</Button>
    </form>
  );
}
