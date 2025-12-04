import { api } from '../services/api.js'; 
import { initialCategories, initialProducts } from './Data.js'; 

const CATEGORY_IMAGES_KEY = 'coffeetime_category_images';
const PRODUCT_IMAGES_KEY = 'coffeetime_product_images';
const PROMO_DATA_KEY = 'coffeetime_promo_data';

const SEED_COMPLETED_KEY = 'coffeetime_seed_v2_final_fix'; 

let isSeeding = false;

const runSeeding = async () => {
    if (localStorage.getItem(SEED_COMPLETED_KEY)) return;
    if (isSeeding) return;
    isSeeding = true;

    try {
        console.log("Iniciando limpieza y restauración...");
        localStorage.removeItem(CATEGORY_IMAGES_KEY);
        localStorage.removeItem(PRODUCT_IMAGES_KEY);
        localStorage.removeItem(PROMO_DATA_KEY);
        
        localStorage.removeItem('coffeetime_seed_completed_v1_final');
        localStorage.removeItem('coffeetime_seed_completed_v5_stable');

        const [cats, prods] = await Promise.all([api.categories.getAll(), api.products.getAll()]);
        
        if (cats.length > 0 || prods.length > 0) {
            await Promise.all([
                ...prods.map(p => api.products.delete(p.id)),
                ...cats.map(c => api.categories.delete(c.id))
            ]);
        }

        const localCatImages = {};
        const localProdImages = {};
        const localPromos = {};
        const catMap = {};

        for (const cat of initialCategories) {
            const res = await api.categories.create({ ...cat, name: cat.title, picture: cat.picture, image: cat.picture });
            catMap[cat.id] = res.id;
            if (cat.picture) localCatImages[String(res.id)] = cat.picture;
        }

        const promises = initialProducts.map(async (prod) => {
            const realCatId = catMap[prod.categoryId];
            if (!realCatId) return;
            const res = await api.products.create({
                ...prod, category_id: realCatId, categoryId: realCatId, name: prod.title, 
                picture: prod.picture, pictures: [prod.picture]
            });
            if (prod.picture) localProdImages[String(res.id)] = prod.picture;
            if (prod.isPromo) localPromos[String(res.id)] = { isPromo: true, promoPrice: prod.promoPrice };
        });

        await Promise.all(promises);

        localStorage.setItem(CATEGORY_IMAGES_KEY, JSON.stringify(localCatImages));
        localStorage.setItem(PRODUCT_IMAGES_KEY, JSON.stringify(localProdImages));
        localStorage.setItem(PROMO_DATA_KEY, JSON.stringify(localPromos));
        localStorage.setItem(SEED_COMPLETED_KEY, 'true');

        alert("Sistema restaurado con imágenes corregidas.\nPor favor, recarga la página.");
        
    } catch (e) {
        console.error("Error seeder:", e);
    } finally {
        isSeeding = false;
    }
};

export default runSeeding;