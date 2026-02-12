"use client";

interface FilterTabsProps<T extends string> {
  filters: { value: T; label: string }[];
  active: T;
  onChange: (value: T) => void;
}

export function FilterTabs<T extends string>({
  filters,
  active,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`whitespace-nowrap px-4 py-2 text-[11px] tracking-[2px] uppercase font-medium transition-all rounded-full border-none cursor-pointer ${
            active === filter.value
              ? "text-dark bg-dark/[0.06]"
              : "text-muted bg-transparent hover:text-dark/70"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
