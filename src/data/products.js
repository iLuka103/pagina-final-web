//Categorias y Productos de PRUEBA

export const categories = [
  {
    id: 'bebidas-calientes',
    name: 'Bebidas Calientes',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZXxlbnwxfHx8fDE3NjQzMTI5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'bebidas-frias',
    name: 'Bebidas Frías',
    image: 'https://images.unsplash.com/photo-1582152747136-af63c112fce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGNvZmZlZXxlbnwxfHx8fDE3NjQyOTQ0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'granos',
    name: 'Granos de Café',
    image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFuc3xlbnwxfHx8fDE3NjQzNzAwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1461988279488-1dac181a78f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBncmluZGVyfGVufDF8fHx8MTc2NDMxODUxN3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'postres',
    name: 'Postres',
    image: 'https://images.unsplash.com/photo-1637419226404-aab6130b2a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjYWtlfGVufDF8fHx8MTc2NDM3MjQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export const products = [
  {
    id: '1',
    name: 'Espresso',
    description: 'Café espresso italiano intenso y aromático',
    price: 2.50,
    category: 'bebidas-calientes',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZXxlbnwxfHx8fDE3NjQzMTI5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: true,
    promoPrice: 2.00
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Espresso con leche espumosa y cacao',
    price: 3.50,
    category: 'bebidas-calientes',
    image: 'https://images.unsplash.com/photo-1708430651927-20e2e1f1e8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlfGVufDF8fHx8MTc2NDMyNTk1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: false
  },
  {
    id: '3',
    name: 'Café Americano',
    description: 'Espresso diluido con agua caliente',
    price: 2.80,
    category: 'bebidas-calientes',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZXxlbnwxfHx8fDE3NjQzMTI5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: false
  },
  {
    id: '4',
    name: 'Latte Helado',
    description: 'Café con leche y hielo, refrescante',
    price: 4.00,
    category: 'bebidas-frias',
    image: 'https://images.unsplash.com/photo-1582152747136-af63c112fce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGNvZmZlZXxlbnwxfHx8fDE3NjQyOTQ0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: true,
    promoPrice: 3.20
  },
  {
    id: '5',
    name: 'Frappé de Caramelo',
    description: 'Bebida fría batida con caramelo',
    price: 4.50,
    category: 'bebidas-frias',
    image: 'https://images.unsplash.com/photo-1582152747136-af63c112fce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGNvZmZlZXxlbnwxfHx8fDE3NjQyOTQ0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: true,
    promoPrice: 3.80
  },
  {
    id: '6',
    name: 'Granos Arábica Premium',
    description: 'Granos de café arábica de alta calidad, 500g',
    price: 15.00,
    category: 'granos',
    image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFuc3xlbnwxfHx8fDE3NjQzNzAwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: false
  },
  {
    id: '7',
    name: 'Granos Robusta',
    description: 'Granos de café robusta intenso, 500g',
    price: 12.00,
    category: 'granos',
    image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFuc3xlbnwxfHx8fDE3NjQzNzAwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: true,
    promoPrice: 10.00
  },
  {
    id: '8',
    name: 'Molinillo de Café',
    description: 'Molinillo manual de acero inoxidable',
    price: 25.00,
    category: 'accesorios',
    image: 'https://images.unsplash.com/photo-1461988279488-1dac181a78f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBncmluZGVyfGVufDF8fHx8MTc2NDMxODUxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: false
  },
  {
    id: '9',
    name: 'Prensa Francesa',
    description: 'Cafetera de prensa francesa 1L',
    price: 30.00,
    category: 'accesorios',
    image: 'https://images.unsplash.com/photo-1695502986995-fa4167488af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBwcmVzcyUyMGNvZmZlZXxlbnwxfHx8fDE3NjQzMzg2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: true,
    promoPrice: 24.00
  },
  {
    id: '10',
    name: 'Máquina de Espresso',
    description: 'Máquina automática para espresso casero',
    price: 250.00,
    category: 'accesorios',
    image: 'https://images.unsplash.com/photo-1620807773206-49c1f2957417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWNoaW5lfGVufDF8fHx8MTc2NDMwNjk0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: false
  },
  {
    id: '11',
    name: 'Pastel de Café',
    description: 'Delicioso pastel con sabor a café y nueces',
    price: 4.50,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1637419226404-aab6130b2a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjYWtlfGVufDF8fHx8MTc2NDM3MjQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: false
  },
  {
    id: '12',
    name: 'Croissant',
    description: 'Croissant francés recién horneado',
    price: 3.00,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1712723246766-3eaea22e52ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzY0MzU3Nzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    isPromo: true,
    promoPrice: 2.50
  }
];