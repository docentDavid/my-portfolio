"use client";

type DeleteButtonProps = {
  label?: string;
};

export default function DeleteButton({ label = "Delete" }: DeleteButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) {
      e.preventDefault();
    }
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      className="px-3 py-1 text-sm border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
    >
      {label}
    </button>
  );
}
