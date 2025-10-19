import { createServer } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createServer();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) {
    notFound();
  }

  // In Phase 2, you'd check if user is admin before showing hidden projects
  // For now, all projects are accessible if you know the URL
  if (project.is_hidden) {
    // Later: check if user is admin
    // For now, show it anyway since there's no auth
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <nav className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
          {project.is_hidden && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
              <p className="text-sm text-red-800 dark:text-red-200">
                This project is hidden from the public view
              </p>
            </div>
          )}

          {project.cover_url && (
            <img
              src={project.cover_url}
              alt={project.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              {project.title}
            </h1>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.summary && (
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                {project.summary}
              </p>
            )}

            <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              <time dateTime={project.created_at}>
                {new Date(project.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          {project.content && (
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap">{project.content}</div>
            </div>
          )}
        </article>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to all projects
          </Link>
        </div>
      </main>
    </div>
  );
}
