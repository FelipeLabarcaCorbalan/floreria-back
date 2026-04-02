import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CrearPedidoDto } from './dto/crear-pedido.dto';
import { PedidoResponse } from './dto/pedido-response.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) { }
  @Post('crear-pedido')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() producto: CrearPedidoDto):Promise<PedidoResponse> {
    return await this.pedidosService.crearPedido(producto.telefono, producto.items);
  }
}
