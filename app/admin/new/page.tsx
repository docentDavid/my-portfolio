import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewProject() {
  async function createProject(formData: FormData) {
    "use server";
    const supabase = await createServer();
export default function NewProject() {
  async function createProject(formData: FormData) {
    "use server";
    const supabase = await createServer();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Not authenticated:", userError);
      return;
    }

    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const { error } = await supabase.from("projects").insert({
      owner_id: user.id, // or user_id if that's your column name
      title,
      summary,
      slug,
    });
    if (error) {
      console.error("Insert failed:", error);
      return;
    }

    revalidatePath("/admin");
    redirect("/admin");
  }

  return (
    <form action={createProject} className="space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">New Project</h1>
      <input
        name="title"
        placeholder="Title"
        className="border p-2 w-full"
        required
      />
      <textarea
        name="summary"
        placeholder="Summary"
        className="border p-2 w-full"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
