import { IconSearch, IconX } from "../../lib/icons";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

export function SearchInput({ value, onChange, placeholder, label }: SearchInputProps) {
  return (
    <div className="relative">
      <label htmlFor="search-input" className="sr-only">
        {label}
      </label>
      <IconSearch className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#5c7a62]" />
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#c9dfcd] bg-white py-3.5 pl-12 pr-11 text-base text-[#17301c] placeholder:text-[#5c7a62] focus:border-brand-500"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Limpar busca"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#5c7a62] hover:bg-brand-50 hover:text-brand-800"
        >
          <IconX className="size-4" />
        </button>
      )}
    </div>
  );
}
