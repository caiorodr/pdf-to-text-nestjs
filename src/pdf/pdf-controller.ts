import { Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as pdf from 'pdf-parse';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editiFileName } from '../editFileRandon';
import { extname } from "path";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('PDF')
@Controller('api/v1/pdf-to-text')
export class PdfController {
  constructor() { }

  @Post('file')
  @ApiOperation({ summary: 'Converte PDF em TEXT' })
  @ApiResponse({
    status: 201,
    description: 'Convertido com sucesso',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './uploads',
        filename: editiFileName,
      })
    })
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File, @Res() res: Response,
  ) {

    const fileExtName = extname(file.originalname);

    if (fileExtName == '.pdf') {

      let dataBuffer = fs.readFileSync(`${file.destination}/${file.filename}`);
      let BufferText: any = {};
      pdf(dataBuffer).then(function (data: any) {

        BufferText =
        {
          pdfText: data.text.split('\n')
        }

        fs.unlink(`${file.destination}/${file.filename}`, (err) => {
          if (err) throw err;
        });

        res.setHeader('Content-Type', 'aplication/json');
        res.end(JSON.stringify(BufferText));
      });

    } else {

      fs.unlink(`${file.destination}/${file.filename}`, (err) => {
        if (err) throw err;
      });

      res.setHeader('Content-Type', 'aplication/json');
      res.end(JSON.stringify({ error: "O tipo do arquivo deve ser .pdf" }));
    }

  }
}
