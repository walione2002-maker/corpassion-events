export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute w-24 h-24 border-t-2 border-brand-400 rounded-full animate-spin"></div>
        {/* Inner pulsing ring */}
        <div className="absolute w-16 h-16 border-r-2 border-brand-600 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        {/* Center dot */}
        <div className="w-4 h-4 bg-brand-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
      </div>
    </div>
  );
}
