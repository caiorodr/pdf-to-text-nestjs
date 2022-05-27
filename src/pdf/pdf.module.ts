/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PdfController } from './pdf-controller';

@Module({
    imports: [],
    controllers: [PdfController],
    providers: [],
})
export class PdfModule { }
