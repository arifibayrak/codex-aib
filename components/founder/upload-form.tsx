'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function UploadForm({ submissionId }: { submissionId: string }) {
  const [status, setStatus] = useState('');

  async function upload(type: 'deck' | 'financials') {
    setStatus('Uploading...');
    const res = await fetch('/api/files/upload', {
      method: 'POST',
      body: JSON.stringify({ submissionId, type, fileName: `${type}-placeholder.pdf` })
    });
    setStatus(res.ok ? `${type} uploaded.` : `Upload failed for ${type}.`);
  }

  async function runPipeline() {
    setStatus('Running extraction + QA...');
    await fetch('/api/extract/run', { method: 'POST', body: JSON.stringify({ submissionId }) });
    await fetch('/api/qa/run', { method: 'POST', body: JSON.stringify({ submissionId }) });
    await fetch('/api/followups/generate', { method: 'POST', body: JSON.stringify({ submissionId }) });
    setStatus('Pipeline complete.');
  }

  return (
    <div className="space-y-4 rounded-lg border bg-white p-6">
      <h2 className="text-xl font-semibold">Upload startup documents</h2>
      <p className="text-sm text-slate-600">MVP uses metadata placeholders for upload in local mode.</p>
      <Input readOnly value={submissionId} />
      <div className="flex gap-3">
        <Button type="button" onClick={() => upload('deck')}>Upload Pitch Deck</Button>
        <Button type="button" variant="secondary" onClick={() => upload('financials')}>Upload Financials</Button>
      </div>
      <Button type="button" variant="outline" onClick={runPipeline}>Run extraction and QA</Button>
      {status && <p className="text-sm text-slate-700">{status}</p>}
    </div>
  );
}
