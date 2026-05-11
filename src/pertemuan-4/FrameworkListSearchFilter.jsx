import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  // ✅ State jadi 1 object
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
  });

  // ✅ Handle semua input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // ✅ Filtering
  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  // ✅ Ambil semua tag unik
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      
      {/* 🔍 Input Search */}
      <input
        type="text"
        name="searchTerm"
        placeholder="Search framework..."
        value={dataForm.searchTerm}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* 🏷 Filter Tag */}
      <select
        name="selectedTag"
        value={dataForm.selectedTag}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Tags</option>
        {allTags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      {/* 📦 List Data */}
      {filteredFrameworks.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 p-5 mb-5 rounded-xl shadow-sm bg-white hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            {item.name}
          </h2>

          <p className="text-gray-600 mt-1">{item.description}</p>

          <p className="text-sm text-blue-600 mt-2 font-medium">
            {item.details.developer}
          </p>

          <a
            href={item.details.officialWebsite}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Visit Website
          </a>

          {/* 🏷 Tags */}
          <div className="mt-3">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block 
                           bg-blue-50 text-blue-600 
                           border border-blue-200
                           px-3 py-1 text-xs font-medium 
                           rounded-full mr-2 mb-2
                           transition duration-200
                           hover:bg-blue-100 hover:border-blue-300 hover:shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* ❗ Jika tidak ada data */}
      {filteredFrameworks.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Data tidak ditemukan 😢
        </p>
      )}
    </div>
  );
}