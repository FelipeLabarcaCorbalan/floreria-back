import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [ProductosModule],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
