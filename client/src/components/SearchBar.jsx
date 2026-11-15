
import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity || loading) return;

    onSearch(trimmedCity);
    setCity("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Search size={19} className="search-icon" />

      <input
        type="text"
        placeholder="Search any city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        aria-label="Search city"
        maxLength={100}
      />

      {city && (
        <button
          type="button"
          className="clear-search"
          onClick={() => setCity("")}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}

      <button
        type="submit"
        className="search-submit"
        disabled={loading || !city.trim()}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
