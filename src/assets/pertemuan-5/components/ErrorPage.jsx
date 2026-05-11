  export default function ErrorPage({
    code = 404,
    description = "Halaman yang kamu cari tidak ditemukan.",
    image = null,
  }) {
    const defaultImages = {
      400: "https://cdn-icons-png.flaticon.com/512/2748/2748558.png",
      401: "https://cdn-icons-png.flaticon.com/512/6195/6195699.png",
      403: "https://cdn-icons-png.flaticon.com/512/6195/6195678.png",
      404: "https://cdn-icons-png.flaticon.com/512/6195/6195702.png",
    };

    const imgSrc = image || defaultImages[code] || defaultImages[404];

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <img src={imgSrc} alt={`Error ${code}`} className="w-40 h-40 mb-6 opacity-80" />
        <h1 className="text-8xl font-black text-gray-200 leading-none">{code}</h1>
        <h2 className="text-2xl font-bold text-gray-700 mt-3">
          {code === 400 && "Bad Request"}
          {code === 401 && "Unauthorized"}
          {code === 403 && "Forbidden"}
          {code === 404 && "Page Not Found"}
        </h2>
        <p className="text-gray-400 mt-2 max-w-sm">{description}</p>
        <a
          href="/"
          className="mt-6 px-6 py-2 bg-[#1A7C6E] text-white rounded-xl font-semibold hover:bg-[#15675C] transition-colors"
        >
          Kembali ke Dashboard
        </a>
      </div>
    );
  }
