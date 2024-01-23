import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>A scoreboard for Ekronot lessons</h1>
        <Link href="/scoreboard" className="link">Scoreboard</Link>
    </main>
  );
}
