import { supabase } from '../config/supabase.js'

export class ProductRepository {
    async getProducts() {
        const { data, error } = await supabase.from('products').select('*');

        if (error) throw error;
        return data;
    }


    async saveProduct(product) {
        
        const { id, name, price, stock, category, description, image_url, ...rest } = product;

        const dataForSupabase = {
            nombre: name,        
            precio: price,
            stock: stock,
            category: category,
            descripcion: description,
            image_url: image_url,
            metadata: rest   
        };

        const { data, error } = await supabase
            .from('productos') 
            .insert([dataForSupabase])
            .select();

        if (error) {
            console.error("Error al guardar en Supabase:", error.message);
            throw error;
        }

        return data[0];
    };
}