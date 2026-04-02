import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { SupabaseService } from './supabase/supabase.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ImagesController } from './images/images.controller';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
        ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,ProductosModule, PedidosModule,ImagesModule],
  controllers: [AppController, ImagesController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
