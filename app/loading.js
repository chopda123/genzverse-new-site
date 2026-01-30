export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-500 flex flex-col items-center justify-center z-50">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-dark-300 rounded-full"></div>
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-400 font-heading text-sm tracking-widest animate-pulse">
        LOADING GENZVERSE
      </p>
    </div>
  )
}