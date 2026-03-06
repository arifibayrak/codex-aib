import { cn } from '@/lib/utils/cn';

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn('min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm', props.className)} />;
}
