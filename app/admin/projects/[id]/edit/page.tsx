import { getProject, updateProject } from "@/app/actions/projects";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        Edit Project
      </h1>

      <form
        action={updateProject.bind(null, id)}
        className="bg-white dark:bg-zinc-900 shadow-sm rounded-lg p-6 space-y-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={project.title}
            className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Current slug: {project.slug}
          </p>
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Summary
          </label>
          <textarea
            name="summary"
            id="summary"
            rows={3}
            defaultValue={project.summary || ""}
            className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={10}
            defaultValue={project.content || ""}
            className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="React, Next.js, TypeScript"
            defaultValue={project.tags?.join(", ") || ""}
            className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Comma-separated list
          </p>
        </div>

        <div>
          <label
            htmlFor="cover_url"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Cover Image URL
          </label>
          <input
            type="url"
            name="cover_url"
            id="cover_url"
            placeholder="https://example.com/image.jpg"
            defaultValue={project.cover_url || ""}
            className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_hidden"
            id="is_hidden"
            defaultChecked={project.is_hidden}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="is_hidden"
            className="ml-2 block text-sm text-zinc-700 dark:text-zinc-300"
          >
            Hide from public view
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Project
          </button>
          <a
            href="/admin"
            className="inline-flex justify-center rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
