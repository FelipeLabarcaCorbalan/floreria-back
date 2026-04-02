import { Controller, Get, Param, Res, Req } from '@nestjs/common';
import * as express from 'express';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ConfigService } from '@nestjs/config';

@Controller('images')
export class ImagesController {

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly configService: ConfigService
    ){}
    @Get('*path')
    async getImageUrl(
        @Param('path') path: string,
        @Res() res: express.Response
    ) {
        if (path.includes('..') || path.includes('//')) {
            return res.status(400).json({ message: 'Invalid path' });
        }
        if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(path)) {
            return res.status(400).json({ message: 'Invalid file type' });
        }
        const normalizedPath = Array.isArray(path) ? path.join('/') : path.replace(/,/g, '/');
        const bucketName = this.configService.get<string>('IMAGE_BUCKET')!;
        const { data } = this.supabaseService.getClient()
            .storage
            .from(bucketName)
            .getPublicUrl(normalizedPath);
        
        return res.redirect(data.publicUrl);
    }
}
