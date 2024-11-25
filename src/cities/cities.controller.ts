import {
  Controller,
  Get,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { Request, Response } from 'express';

@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('popular-cities')
  getPopularCities(@Req() req: Request, @Res() res: Response) {
    if (!req['isAdmin']) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    res.json({
      isAdmin: true,
      cities: this.citiesService.getPopularCities(),
    });

  }

  @Get(':cityName')
  getCityImage(@Req() req: Request, @Res() res: Response) {
    if (!req['isAdmin']) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const imageStream = this.citiesService.getCityImageStream(
      req.params.cityName,
    );
    if (!imageStream) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    res.set('Content-Type', 'image/jpeg');
    imageStream.pipe(res);
  }
}
