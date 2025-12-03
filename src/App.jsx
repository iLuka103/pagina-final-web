import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { CategoryBanner } from './components/Banner.jsx';
import { CategoryList } from './components/List.jsx';
import { CartPopup } from './components/Cart.jsx';
import { Footer } from './components/Footer';
import { LoginDialog } from './components/LoginDialog';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductCarousel } from './components/ProductCarousel';
import { SearchBar } from './components/SearchBar';
import { Button } from './components/ui/button';
import { categories, products } from './data/products.js';

const Layout = ({ onAdminLogin, onCartClick, userRole, setUserRole, cartItems }) => {
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar
        userRole={userRole}
        cartItemCount={totalItems}
        onCartClick={onCartClick}
        onRoleChange={setUserRole}
        onAdminLogin={onAdminLogin}
      />
      <main className="container mx-auto px-4 flex-grow w-full max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const AdminPanel = () => (
  <div className="p-8 bg-white border border-gray-200 rounded-xl mt-8 shadow-sm">
    <h2 className="text-2xl font-bold text-amber-900 mb-4">Panel de Administración</h2>
    <p className="text-gray-600 mb-6">Gestión de inventario y categorías.</p>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 border rounded-lg bg-gray-50 text-center hover:shadow-md transition cursor-pointer">
        <h3 className="font-bold text-lg">Productos</h3>
        <p className="text-sm text-gray-500 mb-4">{products.length} productos registrados</p>
        <Button variant="outline" className="w-full">Gestionar</Button>
      </div>
      <div className="p-6 border rounded-lg bg-gray-50 text-center hover:shadow-md transition cursor-pointer">
        <h3 className="font-bold text-lg">Categorías</h3>
        <p className="text-sm text-gray-500 mb-4">{categories.length} categorías activas</p>
        <Button variant="outline" className="w-full">Gestionar</Button>
      </div>
    </div>
  </div>
);

const ProductDetail = ({ addToCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800">Producto no encontrado</h2>
      <Button variant="link" onClick={() => navigate('/')}>Volver al inicio</Button>
    </div>
  );

  return (
    <div className="py-12 grid md:grid-cols-2 gap-12 items-center">
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
        <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover" />
        {product.isPromo && (
          <span className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">OFERTA</span>
        )}
      </div>
      <div className="space-y-8">
        <div>
          <span className="text-amber-600 font-medium tracking-wider text-sm uppercase cursor-pointer hover:underline" onClick={() => navigate(`/categoria/${product.category}`)}>
            {categories.find(c => c.id === product.category)?.name}
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">{product.description}</p>
        </div>
        <div className="flex items-center gap-6 border-y border-gray-100 py-6">
          <span className="text-4xl font-bold text-amber-700">${product.price}</span>
        </div>
        <div className="flex gap-4">
          <Button size="lg" className="flex-1 text-lg py-6 bg-amber-900 hover:bg-amber-800 text-white" onClick={() => addToCart(product)}>
            Agregar al Carrito
          </Button>
          <Button variant="outline" size="lg" className="py-6" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};

const CategoryPage = ({ addToCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const filteredProducts = products.filter(p => p.category === id);
  const categoryName = categories.find(c => c.id === id)?.name || id;

  return (
    <div className="py-8">
      <Button variant="ghost" onClick={() => navigate('/')} className="mb-4 text-gray-500 hover:text-amber-900">
        &larr; Volver al inicio
      </Button>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 capitalize border-b pb-4">{categoryName}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-full">
              <div className="relative cursor-pointer" onClick={() => navigate(`/producto/${product.id}`)}>
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4" />
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-900 cursor-pointer hover:text-amber-700" onClick={() => navigate(`/producto/${product.id}`)}>{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-xl font-bold text-amber-700">${product.price}</span>
                  <Button size="sm" onClick={() => addToCart(product)} className="bg-amber-900 hover:bg-amber-800 text-white">Agregar</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">No hay productos disponibles en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = ({ onCategorySelect }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoOnly, setShowPromoOnly] = useState(false);
  
  const promoProducts = useMemo(() => products.filter(p => p.isPromo), []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPromo = showPromoOnly ? product.isPromo : true;
      return matchesSearch && matchesPromo;
    });
  }, [searchQuery, showPromoOnly]);

  return (
    <div className="space-y-12 py-8">
      <section className="text-center space-y-6 py-12 bg-amber-50 rounded-3xl mx-4 md:mx-0 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-900">CAFÉ PASIOON</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          CAFE CAFE CAFE CAFE CAFE CAFE
        </p>
        
        <div className="flex justify-center mt-6 w-full px-4">
          <SearchBar 
            categories={categories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory="" 
            onCategoryChange={(catId) => catId && navigate(`/categoria/${catId}`)}
            showPromoOnly={showPromoOnly}
            onPromoToggle={() => setShowPromoOnly(!showPromoOnly)}
          />
        </div>
      </section>

      {!searchQuery && (
        <>
          <CategoryBanner 
            categories={categories} 
            onCategoryClick={onCategorySelect} 
          />
          <ProductCarousel 
            products={promoProducts} 
            onProductClick={(p) => navigate(`/producto/${p.id}`)} 
          />
        </>
      )}

      {searchQuery && (
        <section className="px-4 md:px-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Resultados para "{searchQuery}"
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredProducts.length > 0 ? (
               filteredProducts.map(p => (
                 <div key={p.id} className="border border-gray-100 p-4 rounded-xl shadow-sm bg-white text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/producto/${p.id}`)}>
                    <div className="relative">
                      <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                      {p.isPromo && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">OFERTA</span>}
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">{p.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{p.description}</p>
                    <p className="text-amber-700 font-bold text-lg mb-4">${p.price}</p>
                    <Button variant="outline" className="w-full mt-auto">Ver Detalle</Button>
                 </div>
               ))
             ) : (
               <div className="col-span-full text-center py-10 text-gray-500">
                 No se encontró producto
               </div>
             )}
          </div>
        </section>
      )}
    </div>
  );
};

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userRole, setUserRole] = useState('client');
  const [showCart, setShowCart] = useState(false);
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product: product, quantity: 1 }];
    });
    alert(`¡${product.name} agregado al carrito!`);
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (productId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategoryModal(category);
  };

  return (
    <BrowserRouter>
      <CartPopup 
        open={showCart} 
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
      />

      <LoginDialog 
        open={showLogin} 
        onClose={() => setShowLogin(false)}
        onLogin={() => setUserRole('admin')}
      />

      <CategoryList 
        open={!!selectedCategoryModal}
        onClose={() => setSelectedCategoryModal(null)}
        categoryName={selectedCategoryModal?.name || ''}
        products={selectedCategoryModal ? products.filter(p => p.category === selectedCategoryModal.id) : []}
        onAddToCart={addToCart}
      />

      <Routes>
        <Route path="/" element={
          <Layout 
            cartItems={cartItems} 
            userRole={userRole} 
            setUserRole={setUserRole} 
            onCartClick={() => setShowCart(true)}
            onAdminLogin={() => setShowLogin(true)}
          />
        }>
          <Route index element={<Home onCategorySelect={handleCategorySelect} />} />
          <Route path="categoria/:id" element={<CategoryPage addToCart={addToCart} />} />
          <Route path="producto/:id" element={<ProductDetail addToCart={addToCart} />} />
          
          <Route path="admin" element={
            userRole === 'admin' ? <AdminPanel /> : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h1 className="text-4xl mb-4 text-gray-400 font-bold">Acceso Restringido</h1>
                <p className="text-gray-600 mt-2">Acceso solo para Administradores, inicia sesion</p>
                <Button className="mt-4 bg-amber-900 text-white" onClick={() => setShowLogin(true)}>Iniciar Sesión</Button>
              </div>
            )
          } />
          
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center py-20">
              <h1 className="text-6xl font-bold text-gray-200">404</h1>
              <p className="text-xl text-gray-600 mt-4">Página no encontrada</p>
              <Button variant="link" onClick={() => window.location.href = '/'}>Volver al Inicio</Button>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}