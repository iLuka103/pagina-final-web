export function CategoryBanner({ onCategoryClick, categories }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6">
      <h2 className="text-2xl mb-6 font-bold text-amber-900">Nuestras Categorías</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="cursor-pointer group"
            onClick={() => onCategoryClick(category)}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="aspect-[3/4] relative">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-center font-medium text-lg drop-shadow-md">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}