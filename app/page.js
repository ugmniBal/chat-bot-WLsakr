export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#fff7f3]">
      <div className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-sky-500 mb-4">REVO 챗봇</h1>
        <div className="bg-blue-50 rounded-2xl p-4 h-96 mb-4 overflow-y-auto">
          <div className="bg-red-200 rounded-xl px-3 py-1 mb-2 inline-block">내일 뭐할까</div>
          <div className="bg-green-200 rounded-xl px-3 py-1 inline-block">GPT 응답 중...</div>
        </div>
        <div className="flex items-center gap-2">
          <input className="flex-grow p-2 rounded-full border" placeholder="무엇이 궁금한가요?" />
          <button className="bg-teal-400 text-white rounded-full w-8 h-8 flex items-center justify-center">
            ▶
          </button>
        </div>
      </div>
    </div>
  )
}