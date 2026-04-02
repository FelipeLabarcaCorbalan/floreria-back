import { IsString, IsArray, ValidateNested, IsUUID, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemDto {
  @IsUUID()
  id: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CrearPedidoDto {
  @IsString()
  telefono: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}