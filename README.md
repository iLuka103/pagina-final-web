INSTRUCCIONES DE USO

Descargue el ZIP y descomprimalo, le va a dejar una carpeta que en la que están todos los archivos.

Abra cmd y haga la ruta cd "Desktop" -> "(nombre de la carpeta)" (eso en caso de que lo descomprima en el escritorio)

una vez esté posicionado en "(nombre de la carpeta)", arranque el npm run dev.

DESCRIPCIÓN

Es una pagina orientada a la compra de articulos de café, ya sean maquinas, accesorios, bebidas, granos, etc
Cuenta con un apartado de Cliente en el que podes revisar, buscar y añadir cosas al carrito, Su apartado ADMIN cuya forma de entrar es poner de usuario y contraseña Admin/Admin permite el acceso a la gestion de productos y categorias, con nombre, descripcion, imagen y si está en oferta o no para el caso de los productos

DEPENDENCIAS UTILIZADAS

-react	Base para construir la interfaz

-react-dom	Manipulacion del DOM de forma eficiente

-react-router-dom	Navegacion entre diferentes paginas en una sola pagina

-tailwindcss	Framework CSS que permite estilizar rápidamente tu aplicación usando clases de utilidad.

-class-variance-authority	Permite crear componentes dinámicos que pueden variar su apariencia (estilos) basados en propiedades o props (esencialmente, maneja variantes de estilos de Tailwind).

-clsx	Pequeña utilidad para construir strings de nombres de clase de forma condicional y fácil, combinando clases estáticas y dinámicas.

-tailwind-merge	Resuelve conflictos al combinar múltiples clases de Tailwind, asegurando que las clases de mayor prioridad anulen correctamente a las de menor.

-@radix-ui/*	Colección de librerías headless (sin estilos predefinidos) para construir componentes de interfaz de usuario accesibles y de alta calidad (Alert Dialog, Aspect Ratio, Dropdown Menu, etc.). Proporciona la lógica y accesibilidad

-@radix-ui/react-slot	Utilidad para envolver/extender componentes, permitiendo que un componente transfiera sus props y referencias a su hijo.

-@radix-ui/react-alert-dialog	Lógica para el componente Alert Dialog (diálogo modal de advertencia).

-@radix-ui/react-aspect-ratio	Lógica para el componente que mantiene una Relación de Aspecto fija.

-@radix-ui/react-dialog	Lógica para el componente Diálogo (modal general).

-@radix-ui/react-dropdown-menu	Lógica para el componente Menú Desplegable.

-@radix-ui/react-label	Lógica para el componente Etiqueta (asociado a inputs de formulario).

-vite	Empaquetador y Servidor de Desarrollo ultra rápido. Se encarga de ensamblar, servir y optimizar el código para el desarrollo y producción.

-@vitejs/plugin-react	Plugin necesario para que Vite pueda entender y procesar el código de React (JSX y sintaxis específica).

-autoprefixer Postprocesador que añade automáticamente prefijos de proveedor (-webkit-, -moz-, etc.) a tu CSS para garantizar la compatibilidad con diferentes navegadores.

-@tailwindcss/postcss	Plugin que integra y optimiza Tailwind CSS en el pipeline de procesamiento de CSS de PostCSS.

-eslint	Herramienta de análisis estático de código (linter). Identifica patrones problemáticos, errores de sintaxis y asegura que se sigan los estándares de codificación.

-@eslint/js	Reglas base de ESLint para JavaScript estándar.

-eslint-plugin-react-hooks	Reglas específicas de ESLint para asegurar el uso correcto y optimizado de los Hooks de React (como useState, useEffect, etc.).

-eslint-plugin-react-refresh	Reglas de ESLint para optimizar la recarga rápida de módulos (HMR) durante el desarrollo.

-globals	Define qué variables globales (como window, document, o las específicas de Node.js) deben ser reconocidas por ESLint para evitar errores de "variable no definida".

-@types/react	Proporciona definiciones de tipos de TypeScript para la biblioteca React, ayudando a la autocompletado y a la detección de errores de tipado.

-@types/react-dom	Proporciona definiciones de tipos de TypeScript para la biblioteca react-dom.

-babel-plugin-react-compiler	Un plugin experimental de Babel/React que busca optimizar automáticamente los renders y la memoria de los componentes. Indica que estás utilizando la versión experimental de optimización de React.