'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Followup = {
  id: string;
  question: string;
  reason: string;
  answered: boolean;
  answer?: string;
};

export default function FollowupsPage({ params }: { params: { id: string } }) {
  const [followups, setFollowups] = useState<Followup[]>([]);

  useEffect(() => {
    fetch(`/api/submissions/${params.id}`).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setFollowups(data.followups || []);
      }
    });
  }, [params.id]);

  async function submitAnswer(questionId: string, formData: FormData) {
    const answer = String(formData.get('answer') || '');
    await fetch('/api/followups/answer', {
      method: 'POST',
      body: JSON.stringify({ submissionId: params.id, questionId, answer })
    });
    setFollowups((prev) => prev.map((f) => (f.id === questionId ? { ...f, answered: true, answer } : f)));
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Follow-up questions</h1>
      {followups.length ? followups.map((f) => (
        <form key={f.id} action={(fd) => submitAnswer(f.id, fd)} className="space-y-2 rounded border bg-white p-4">
          <p className="font-medium">{f.question}</p>
          <p className="text-sm text-slate-500">Reason: {f.reason}</p>
          <Textarea name="answer" defaultValue={f.answer} placeholder="Type your answer..." required={!f.answered} />
          <Button disabled={f.answered}>{f.answered ? 'Answered' : 'Submit answer'}</Button>
        </form>
      )) : <p>No follow-up questions right now.</p>}
    </div>
  );
}
