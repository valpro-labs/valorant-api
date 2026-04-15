import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col justify-center items-center text-center flex-1 px-4 py-20 gap-6">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Valorant API
      </h1>
      <p className="max-w-2xl text-lg text-fd-muted-foreground">
        A typed TypeScript client for{' '}
        <a
          href="https://valorant-api.com/"
          className="font-medium underline underline-offset-4"
        >
          valorant-api.com
        </a>
        . Browse the full API reference below.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href="/docs"
          className="rounded-md bg-fd-primary text-fd-primary-foreground px-5 py-2.5 font-medium"
        >
          Read the docs
        </Link>
        <a
          href="https://www.npmjs.com/package/@valpro-labs/valorant-api"
          className="rounded-md border px-5 py-2.5 font-medium"
        >
          View on npm
        </a>
      </div>
    </main>
  );
}
