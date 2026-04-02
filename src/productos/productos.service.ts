import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PaginationDto } from './dto/producto.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ProductosService {
    private readonly supabase: SupabaseClient;
    constructor(private  supabaseService: SupabaseService) {
        this.supabase  = this.supabaseService.getClient();
     }
    async getFeatured() {
        const { data, error } = await this.supabase
        .from('productos')
        .select('id, titulo, descripcion, categoria, precio, imagen_path, activo')
        .eq('is_featured', true)
        .eq('activo', true)
        .order('importancia');

        if (error) throw new Error(error.message);
        return data;
    }
    async findAll({ page = 1, limit = 20 }: PaginationDto) {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await this.supabase
            .from('productos')
            .select('*', { count: 'exact' })
            .order('titulo')
            .range(from, to);

        if (error) throw new Error(error.message);

        return {
            data,
            meta: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count! / limit),
            },
        };
    }
    async findOne(id: string) { 
        const { data, error } = await this.supabase
        .from('productos')
        .select('*')
        .eq('id', id)
        .eq('activo', true)
        .single();

        if (error || !data) throw new NotFoundException(`Producto ${id} no encontrado`);
        return data;
    }
    async findByCategoria(categoria: string) {
        const { data, error } = await this.supabase
            .from('productos')
            .select('*')
            .eq('categoria', categoria)
            .eq('activo', true)
            .order('imagen_path');

        if (error) throw new Error(error.message);
        return data;
    }
    async getCategorias(): Promise<string[]> {
        const { data, error } = await this.supabase
            .from('productos')
            .select('categoria')
            .eq('activo', true);

        if (error) throw new Error(error.message);
        const unicas = [...new Set(data.map((p) => p.categoria))];
        return unicas.sort();
    }
}
