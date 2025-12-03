import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';

export function SearchBar({
  onSearchChange,
  categories = [],
  searchQuery,
  onPromoToggle,
  selectedCategory,
  onCategoryChange,
  showPromoOnly
}) {
  return (
    <div className="flex gap-2 items-center w-full max-w-lg mx-auto">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          
        </span>
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 rounded-full bg-white border-gray-200 focus-visible:ring-amber-500"
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full border-gray-200 shrink-0 px-4">
            Filtros
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200">
          <DropdownMenuLabel>Filtros</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuCheckboxItem
            checked={showPromoOnly}
            onCheckedChange={onPromoToggle}
          >
            Solo Promociones
          </DropdownMenuCheckboxItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Categoría</DropdownMenuLabel>
          
          <DropdownMenuItem onClick={() => onCategoryChange('')}>
            <span className={selectedCategory === '' ? 'font-bold text-amber-600' : ''}>
              Todas
            </span>
          </DropdownMenuItem>
          
          {categories.map((category) => (
            <DropdownMenuItem 
              key={category.id} 
              onClick={() => onCategoryChange(category.id)}
            >
              <span className={selectedCategory === category.id ? 'font-bold text-amber-600' : ''}>
                {category.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}