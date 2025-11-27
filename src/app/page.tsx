import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-3xl font-bold">Careers Page Builder</h1>
      <p className="text-muted-foreground">
        Login as a recruiter to customize your company careers page.
      </p>
      <Link
        href="/login"
        className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-100"
      >
        Go to Login
      </Link>
    </main>
  );
}
