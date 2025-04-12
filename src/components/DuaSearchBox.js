export default function DuaSearchBox() {
  return (
    <div className="absolute w-[371px] h-[52px] top-[54px] left-[1100px]">
      <div className="w-full h-full flex items-center bg-white rounded-xl border-gray-200 overflow-hidden">
        <input
          type="text"
          placeholder="Search by Dua Name"
          className="flex-1 h-full pl-6 pr-2 text-gray-500 text-sm focus:outline-none placeholder-gray-400"
        />
        <div className="h-full px-4 flex items-center justify-center bg-gray-100">
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
