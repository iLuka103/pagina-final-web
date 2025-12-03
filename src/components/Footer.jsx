export function Footer() {
  return (
    <footer className="bg-amber-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              Coffee Time
            </h3>
            <p className="text-amber-100 text-sm leading-relaxed max-w-xs">
              LA MEJOR CAFETERY del cONDADO.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-lg text-amber-50">Contacto</h4>
            <div className="space-y-3 text-sm text-amber-100">
              <div className="flex items-center gap-3">
                <span className="font-bold">Tel:</span>
                <span>+54 (2901) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold">Email:</span>
                <span>hola@coffeetime.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold">Dir:</span>
                <span>San Martín 123, Ushuaia</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-lg text-amber-50">Síguenos</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-amber-800 p-2 rounded-full hover:bg-amber-700 hover:text-amber-200 transition-all text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a 
                href="#" 
                className="bg-amber-800 p-2 rounded-full hover:bg-amber-700 hover:text-amber-200 transition-all text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a 
                href="#" 
                className="bg-amber-800 p-2 rounded-full hover:bg-amber-700 hover:text-amber-200 transition-all text-xs font-bold"
                aria-label="Twitter"
              >
                TW
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-800/50 mt-10 pt-6 text-center text-sm text-amber-200/60">
          &copy; {new Date().getFullYear()} Coffee Time. Trabajo Práctico Final.
        </div>
      </div>
    </footer>
  );
}