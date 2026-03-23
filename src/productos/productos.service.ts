import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ProductosService {

    constructor(private readonly supabaseService: SupabaseService) {}
    
    async findAll() {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('productos')
      .select('*');

    if (error) throw new BadRequestException(error.message);
    return data;
  }
}
