import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  initialValue: string;
  placeholder: string;
  onSearch: (value: string) => void;
}

export function SearchBar({ initialValue, placeholder, onSearch }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="flex w-full gap-2 sm:max-w-sm">
      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <Button type="submit">Cari</Button>
    </form>
  );
}
