import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="p-8">
            {frameworkData.map((item) => (
		            <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
		                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
		                <p className="text-gray-600">{item.description}</p>
                        
		                <p className="text-red-600">{item.details.developer}</p>

                        <a href={item.details.officialWebsite} target="_blank" 
                        className="text-blue-300 underline">
                            {item.details.officialWebsite}
                        </a>
                        <br></br>
                        {item.tags.map((tag, index) => (
  <span
    key={index}
    className="inline-block 
               bg-blue-50 text-blue-600 
               border border-blue-200
               px-3 py-1 text-xs font-medium 
               rounded-full mr-2 mb-2
               transition duration-200 ease-in-out
               hover:bg-blue-100 hover:border-blue-300 hover:shadow-sm"
  >
    {tag}
  </span>
))}
                        
		            </div>
            ))}
        </div>
    )
}

