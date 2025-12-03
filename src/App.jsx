import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Layers, Lock, Package } from 'lucide-react';
import { AdminCategories } from './components/AdminCategories';
import { AdminProducts } from './components/AdminProducts';
import { CategoryBanner } from './components/Banner';
import { CategoryList } from './components/List';
import { CartPopup } from './components/Cart';
import { ConfirmDialog } from './components/ConfirmDialog';
import { Footer } from './components/Footer';
import { LoginDialog } from './components/LoginDialog';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductCarousel } from './components/ProductCarousel';
import { SearchBar } from './components/SearchBar';
import { Button } from './components/ui/button';
import { AspectRatio } from './components/ui/aspect-ratio';
import { categories as initialCategories, products as initialProducts } from './data/products.js';

const CART_STORAGE_KEY = 'coffeetime_cart';
const PRODUCTS_STORAGE_KEY = 'coffeetime_products';
const CATEGORIES_STORAGE_KEY = 'coffeetime_categories';

const textOutlineStyle = {
  textShadow: '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff'
};

const RestrictedAccess = ({ onLogin }) => (
  <div className="flex flex-col items-center justify-center py-32 text-center bg-black/80 backdrop-blur-md rounded-xl border border-amber-900/30 m-4 shadow-2xl">
    <div className="mb-4 drop-shadow-md text-amber-500">
      <Lock className="w-16 h-16" />
    </div>
    <h1 className="text-3xl font-bold text-amber-50 mb-2 drop-shadow-sm">Acceso Restringido</h1>
    <p className="text-amber-200/90 font-medium mb-6 max-w-md drop-shadow-sm">
      Esta sección es exclusiva para administradores. Por favor, inicia sesión para continuar.
    </p>
    <Button 
      className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-2 font-bold shadow-md transition-all hover:scale-105" 
      onClick={onLogin}
    >
      Iniciar Sesión
    </Button>
  </div>
);

const Layout = ({ onAdminLogin, onCartClick, userRole, setUserRole, cartItems }) => {
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div 
      className="min-h-screen flex flex-col font-sans bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('https://imgs.search.brave.com/AXGCAOcewzZEqbrZRuSt9B8bcjx9wEC1eLtiJ0T_3_Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbWlu/aW1hbGlzdC1jb2Zm/ZWUtMTMzMi14LTg1/MC13YWxscGFwZXIt/bzh5OHBnaHhydmd3/Mmp1ay5qcGc')"
      }}
    >
      <Navbar
        userRole={userRole}
        cartItemCount={totalItems}
        onCartClick={onCartClick}
        onRoleChange={setUserRole}
        onAdminLogin={onAdminLogin}
      />
      <main className="container mx-auto px-4 flex-grow w-full max-w-7xl my-4 min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const AdminPanel = ({ productCount, categoryCount }) => {
  const navigate = useNavigate();
  return (
    <div className="p-8 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl mt-8 shadow-sm">
      <h2 className="text-2xl font-bold text-amber-900 mb-4">Panel de Administración</h2>
      <p className="text-gray-600 mb-6">Gestión de inventario y categorías.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div 
          className="p-6 border rounded-lg bg-white/50 text-center hover:shadow-md transition cursor-pointer group flex flex-col items-center" 
          onClick={() => navigate('/admin/productos')}
        >
          <Package className="w-10 h-10 text-amber-700 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg group-hover:text-amber-700 transition-colors">Productos</h3>
          <p className="text-sm text-gray-500 mb-4">{productCount} productos registrados</p>
          <Button variant="outline" className="w-full pointer-events-none">Ir a Productos</Button>
        </div>
        <div 
          className="p-6 border rounded-lg bg-white/50 text-center hover:shadow-md transition cursor-pointer group flex flex-col items-center" 
          onClick={() => navigate('/admin/categorias')}
        >
          <Layers className="w-10 h-10 text-amber-700 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg group-hover:text-amber-700 transition-colors">Categorías</h3>
          <p className="text-sm text-gray-500 mb-4">{categoryCount} categorías activas</p>
          <Button variant="outline" className="w-full pointer-events-none">Ir a Categorías</Button>
        </div>
      </div>
    </div>
  );
};

const ProductDetail = ({ addToCart, products, categories }) => {
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
    <div className="py-12 grid md:grid-cols-2 gap-12 items-start bg-white/80 p-8 rounded-3xl backdrop-blur-sm shadow-sm">
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
        <AspectRatio ratio={1 / 1}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </AspectRatio>
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

const CategoryPage = ({ addToCart, products, categories }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const filteredProducts = products.filter(p => p.category === id);
  const categoryName = categories.find(c => c.id === id)?.name || id;

  return (
    <div className="py-8">
      <Button variant="ghost" onClick={() => navigate('/')} className="mb-4 text-gray-700 hover:text-amber-900 hover:bg-white/50">
        &larr; Volver al inicio
      </Button>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 capitalize border-b border-gray-200/50 pb-4">{categoryName}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-white/90 backdrop-blur-sm flex flex-col h-full group">
              <div className="relative cursor-pointer overflow-hidden rounded-lg mb-4" onClick={() => navigate(`/producto/${product.id}`)}>
                <AspectRatio ratio={4 / 3}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </AspectRatio>
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
          <div className="col-span-full py-20 text-center bg-white/50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-600 text-lg">No hay productos disponibles en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = ({ onCategorySelect, onProductSelect, products, categories }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoOnly, setShowPromoOnly] = useState(false);
  
  const promoProducts = useMemo(() => products.filter(p => p.isPromo), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPromo = showPromoOnly ? product.isPromo : true;
      return matchesSearch && matchesPromo;
    });
  }, [searchQuery, showPromoOnly, products]);

  return (
    <div className="space-y-12 py-8">
      <section className="text-center space-y-6 py-12 bg-white/80 backdrop-blur-md rounded-3xl mx-4 md:mx-0 px-4 shadow-sm">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-900">Pasión por el Café</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre los mejores granos seleccionados y las herramientas profesionales para tu hogar.
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
          <ProductCarousel 
            products={promoProducts} 
            onProductClick={onProductSelect} 
          />
          <CategoryBanner 
            categories={categories} 
            onCategoryClick={onCategorySelect} 
          />
        </>
      )}

      {searchQuery && (
        <section className="px-4 md:px-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center bg-white/50 p-2 rounded-lg inline-block mx-auto w-full">
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
               <div className="col-span-full text-center py-10 text-gray-800 bg-white/50 rounded-xl">
                 No se encontraron productos.
               </div>
             )}
          </div>
        </section>
      )}
    </div>
  );
};

export default function App() {
  const [userRole, setUserRole] = useState('client');
  
  const [appProducts, setAppProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch (error) {
      return initialProducts;
    }
  });

  const [appCategories, setAppCategories] = useState(() => {
    try {
      const savedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      return savedCategories ? JSON.parse(savedCategories) : initialCategories;
    } catch (error) {
      return initialCategories;
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  
  useEffect(() => { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(appProducts)); }, [appProducts]);
  useEffect(() => { localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(appCategories)); }, [appCategories]);

  const handleAddProduct = (newProduct) => setAppProducts([...appProducts, newProduct]);
  const handleEditProduct = (prod) => setAppProducts(appProducts.map(p => p.id === prod.id ? prod : p));
  const handleDeleteProduct = (id) => setAppProducts(appProducts.filter(p => p.id !== id));

  const handleAddCategory = (newCat) => setAppCategories([...appCategories, newCat]);
  const handleEditCategory = (cat) => setAppCategories(appCategories.map(c => c.id === cat.id ? cat : c));
  const handleDeleteCategory = (id) => setAppCategories(appCategories.filter(c => c.id !== id));
  
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
  };

  const clearCart = () => setCartItems([]);
  const updateQuantity = (pid, delta) => setCartItems(prev => prev.map(i => i.product.id === pid ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0));
  const handleCategorySelect = (category) => setSelectedCategoryModal(category);

  return (
    <BrowserRouter>
      <CartPopup open={showCart} onClose={() => setShowCart(false)} cartItems={cartItems} onUpdateQuantity={updateQuantity} onClearCart={clearCart} />
      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} onLogin={() => setUserRole('admin')} />
      <ConfirmDialog open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={() => {}} title="Confirmar Acción" description="¿Estás seguro?" confirmText="Confirmar" />
      
      <CategoryList 
        open={!!selectedCategoryModal} 
        onClose={() => setSelectedCategoryModal(null)} 
        categoryName={selectedCategoryModal?.name || ''} 
        products={selectedCategoryModal ? appProducts.filter(p => p.category === selectedCategoryModal.id) : []} 
        onAddToCart={addToCart} 
      />
      
      <ProductCard 
        product={selectedProductModal} 
        open={!!selectedProductModal} 
        onClose={() => setSelectedProductModal(null)} 
        onAddToCart={addToCart} 
      />

      <Routes>
        <Route path="/" element={<Layout cartItems={cartItems} userRole={userRole} setUserRole={setUserRole} onCartClick={() => setShowCart(true)} onAdminLogin={() => setShowLogin(true)} />}>
          <Route index element={<Home products={appProducts} categories={appCategories} onCategorySelect={handleCategorySelect} onProductSelect={setSelectedProductModal} />} />
          <Route path="categoria/:id" element={<CategoryPage products={appProducts} categories={appCategories} addToCart={addToCart} />} />
          <Route path="producto/:id" element={<ProductDetail products={appProducts} categories={appCategories} addToCart={addToCart} />} />
          
          <Route path="admin" element={
            userRole === 'admin' ? <AdminPanel productCount={appProducts.length} categoryCount={appCategories.length} /> : <RestrictedAccess onLogin={() => setShowLogin(true)} />
          } />
          
          <Route path="admin/productos" element={
             userRole === 'admin' ? <AdminProducts products={appProducts} categories={appCategories} onAdd={handleAddProduct} onEdit={handleEditProduct} onDelete={handleDeleteProduct} /> : <RestrictedAccess onLogin={() => setShowLogin(true)} />
          } />

          <Route path="admin/categorias" element={
             userRole === 'admin' ? <AdminCategories categories={appCategories} onAdd={handleAddCategory} onEdit={handleEditCategory} onDelete={handleDeleteCategory} /> : <RestrictedAccess onLogin={() => setShowLogin(true)} />
          } />
          
          <Route path="*" element={<div className="p-20 text-center">404 - Página no encontrada</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}