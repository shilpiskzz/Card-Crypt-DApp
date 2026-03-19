"use client"

export default function TailwindTest() {
  return (
    <div className="p-4 border border-red-500">
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Tailwind Test</h1>
      <div className="bg-green-200 p-4 rounded-lg">
        <p className="text-green-800">If you see green background and blue text, Tailwind is working!</p>
      </div>
      <div className="bg-walmart-blue text-white p-4 rounded-lg mt-4">
        <p>Custom Walmart blue color test</p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Test Button
      </button>
    </div>
  )
}
