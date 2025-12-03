import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Navbar({ 
  onAdminLogin, 
  userRole = 'client', 
  onRoleChange, 
  cartItemCount = 0, 
  onCartClick 
}) {
  const handleAdminClick = () => {
    if (userRole !== 'admin') {
      onAdminLogin && onAdminLogin();
    } else {
      onRoleChange('client');
    }
  };

  return (
    <header className="bg-amber-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-amber-700 flex items-center justify-center text-amber-900 font-bold text-xl">
               CT
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-amber-50 hidden sm:block">Coffee Time</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-amber-50 hover:bg-amber-800 hover:text-white relative">
                  Perfil
                  {userRole === 'admin' && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-[10px] border-none text-white">
                      A
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-48 bg-white border-amber-100 p-1 shadow-xl">
                <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-gray-700">
                  Modo: {userRole === 'admin' ? 'Administrador' : 'Cliente'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 my-1" />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 p-2 rounded text-sm text-gray-700 outline-none focus:bg-gray-100" onClick={() => onRoleChange('client')}>
                  Vista Cliente
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 p-2 rounded text-sm text-gray-700 outline-none focus:bg-gray-100" onClick={handleAdminClick}>
                  {userRole === 'admin' ? 'Cerrar Sesión Admin' : 'Acceso Administrador'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              className="text-amber-50 hover:bg-amber-800 hover:text-white relative"
              onClick={onCartClick}
            >
              Carrito
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white border-none text-xs font-bold">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}