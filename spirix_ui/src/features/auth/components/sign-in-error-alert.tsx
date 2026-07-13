type Props = { message: string };

export function SignInErrorAlert({ message }: Props) {
  return (
    <div
      className="rounded-lg border border-destructive/25 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive dark:bg-destructive/10"
      role="alert"
    >
      {message}
    </div>
  );
}
