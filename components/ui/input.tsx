import { cn } from '@/lib/utils/cn';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('h-10 w-full rounded-md border border-slate-300 px-3 text-sm', props.className)} />;
}
