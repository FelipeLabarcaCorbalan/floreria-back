import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ItemDto } from './dto/crear-pedido.dto';
import { PedidoResponse } from './dto/pedido-response.dto';

@Injectable()
export class PedidosService {

    constructor(private readonly supabaseService: SupabaseService){};

    async crearPedido(telefono: string, items: ItemDto[]): Promise<PedidoResponse> {
        const supabase = this.supabaseService.getClient();

        const payload = items.map(item => ({
            producto_id: item.id,
            quantity: item.quantity,
        }));

        const { data, error } = await supabase
            .rpc('crear_pedido', {
                p_telefono: telefono,
                p_items: payload,
            });

        if (error) throw new Error(error.message);

        return data as PedidoResponse;
    }
}
