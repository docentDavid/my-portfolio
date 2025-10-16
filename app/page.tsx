import { createServer } from "@/lib/supabase/server";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createServer();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_hidden", false)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) console.error(error);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <nav className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            My Portfolio
          </h1>
          <Link
            href="/admin"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Admin
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!projects || projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">
              No projects to display yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.slug}`}
                className="group block"
              >
                <article className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
                  {project.cover_url && (
                    <img
                      src={project.cover_url}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h2>
                    {project.summary && (
                      <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-3">
                        {project.summary}
                      </p>
                    )}
                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
