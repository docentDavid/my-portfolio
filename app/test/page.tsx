import { createServer } from "@/lib/supabase/server";

export default async function TestPage() {
  const supabase = await createServer();

  // Test 1: Check connection
  const { data: connectionTest, error: connectionError } = await supabase
    .from("projects")
    .select("count");

  // Test 2: Get all projects
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*");

  // Test 3: Check environment variables
  const envCheck = {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlStart: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20),
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>

      <div className="space-y-6">
        {/* Environment Check */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded overflow-auto">
            {JSON.stringify(envCheck, null, 2)}
          </pre>
        </div>

        {/* Connection Test */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Connection Test</h2>
          {connectionError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
              <p className="text-red-800 dark:text-red-200 font-semibold">
                Connection Error:
              </p>
              <pre className="text-sm mt-2 text-red-600 dark:text-red-300">
                {JSON.stringify(connectionError, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
              <p className="text-green-800 dark:text-green-200">
                ✓ Connection successful
              </p>
              <pre className="text-sm mt-2">
                {JSON.stringify(connectionTest, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Projects Data */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Projects Data ({projects?.length || 0})
          </h2>
          {projectsError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
              <p className="text-red-800 dark:text-red-200 font-semibold">
                Error fetching projects:
              </p>
              <pre className="text-sm mt-2 text-red-600 dark:text-red-300 overflow-auto">
                {JSON.stringify(projectsError, null, 2)}
              </pre>
            </div>
          ) : (
            <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(projects, null, 2)}
            </pre>
          )}
        </div>
      </div>

      <div className="mt-6">
        <a
          href="/admin"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Admin
        </a>
      </div>
    </div>
  );
}
