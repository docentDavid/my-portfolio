import { createServer } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createServer();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_hidden", false);

  if (error) console.error(error);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      <ul className="space-y-2">
        {projects?.map((p) => (
          <li
            key={p.id}
            className="border border-zinc-200 dark:border-zinc-800 p-4 rounded bg-white dark:bg-zinc-900 shadow-sm"
          >
            <h2 className="font-semibold">{p.title}</h2>
            <p>{p.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
