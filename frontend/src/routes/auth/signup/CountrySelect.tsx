import { countries } from "../utils";

interface Props {
  selected: { code: string; flag: string };
  onSelect: (country: { code: string; flag: string }) => void;
}

export function CountrySelect({ selected, onSelect }: Props) {
  return (
    <select
      className="px-3 py-2 border rounded-md text-sm bg-white"
      value={selected.code}
      onChange={(e) => {
        const selectedCountry = countries.find(
          (c) => c.code === e.target.value,
        );
        if (selectedCountry) onSelect(selectedCountry);
      }}
    >
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.flag} ({country.code})
        </option>
      ))}
    </select>
  );
}
