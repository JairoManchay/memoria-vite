export default function Header() {
  return (
    <header className="h-[250px] bg-[#1E73D8] flex flex-col justify-end pb-0 px-10 relative">
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[#4DA3FF]" />
      
      <div className="flex items-center justify-center w-full mb-4">
        <div className="flex items-center gap-3 absolute left-0">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold text-white">
            M
          </div>
          <span className="text-white text-sm font-semibold tracking-wide">
            Premium Realty
          </span>
        </div>

        <span className="text-white text-xl font-semibold tracking-wide text-center">
          Encuentra las inmobiliarias de la expoferia San Miguel 2025
        </span>

        <div className="w-24 absolute right-0" />
      </div>
    </header>
  );
}
