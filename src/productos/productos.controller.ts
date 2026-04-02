import { Controller, Get, Param, ParseUUIDPipe, Query} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dto/producto.dto';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get('destacados')
  getFeatured() {
    return this.productosService.getFeatured();
  }

  @Get('categorias')
  getCategorias() {
    return this.productosService.getCategorias();
  }

  @Get('categoria/:categoria')
  findByCategoria(@Param('categoria') categoria: string) {
    return this.productosService.findByCategoria(categoria);
  }

  // GET /productos?page=1&limit=20
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productosService.findAll(paginationDto);
  }

  // Este metodo siempre tiene que ir al ultimo
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.findOne(id);
  }
}
