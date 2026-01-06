type AddTaskFormProps = {
  onAddTask(description: string): void;
};

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  return (
    <form className="mt-4 p-4 border rounded-md space-y-3">
      <div>
        <label className="block text-sm font-medium">Description</label>
        <input type="text" className="w-full mt-1 p-2 border rounded" />
      </div>

      <div className="flex space-x-3">
        <div className="flex-1">
          <label className="block text-sm font-medium">Difficulty (1–10)</label>
          <input
            type="number"
            min={1}
            max={10}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium">Priority (1–10)</label>
          <input
            type="number"
            min={1}
            max={10}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
      </div>
      <button type="submit" className="w-full py-2 border rounded font-medium">
        Add task
      </button>
    </form>
  );
}
