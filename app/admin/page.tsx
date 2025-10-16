import Link from "next/link";
import DeleteButton from "@/app/admin/DeleteButton";
import {
  getAllProjects,
  deleteProject,
  toggleHidden,
} from "@/app/actions/projects";

export default async function AdminPage() {
  const projects = await getAllProjects();

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Manage Projects
        </h1>
        <Link
          href="/admin/projects/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Create New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">
            No projects yet. Create your first one!
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {projects.map((project) => (
              <li key={project.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 truncate">
                          {project.title}
                        </h3>
                        {project.is_hidden && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {project.summary}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
                        <span>Slug: {project.slug}</span>
                        {project.tags && project.tags.length > 0 && (
                          <span>Tags: {project.tags.join(", ")}</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex gap-2">
                      <form
                        action={toggleHidden.bind(
                          null,
                          project.id,
                          project.is_hidden
                        )}
                      >
                        <button
                          type="submit"
                          className="px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-700 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        >
                          {project.is_hidden ? "Show" : "Hide"}
                        </button>
                      </form>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-700 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      >
                        Edit
                      </Link>
                      <form action={deleteProject.bind(null, project.id)}>
                        <DeleteButton label="Delete" />
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
