function AdminHeader({
  title,
  onAdd,
}: {
  title: string;
  onAdd?: () => void;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold text-[#1F263E]">
          {title} Table Details
        </h2>
        <p className="text-gray-500 text-sm">
          You can check all details
        </p>
      </div>

      {onAdd && (
        <button
          onClick={onAdd}
          className="bg-[var(--color-adminMainColor)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-adminMainColor)]/90 transition cursor-pointer"
        >
          Add New {title}
        </button>
      )}
    </div>
  );
}

export default AdminHeader;