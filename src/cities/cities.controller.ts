import { Controller, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { Request, Response } from 'express';

@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('popular-cities')
  getPopularCities(@Req() req: Request, @Res() res: Response) {
    if (!req['isAdmin']) {
      throw new HttpException('Forbidden: Not an admin', HttpStatus.FORBIDDEN);
    }

    res.status(HttpStatus.OK).json({
      isAdmin: true,
      cities: this.citiesService.getPopularCities(),
    });
  }

  @Get(':cityName')
  async getCityImage(@Req() req: Request, @Res() res: Response) {
    if (!req['isAdmin']) {
      throw new HttpException('Unauthorized: Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const cityName = req.params.cityName;
    console.log('Requested city image:', cityName);
    
    const imageStream = this.citiesService.getCityImageStream(cityName);

    if (!imageStream) {
      console.log('Image not found for city:', cityName);
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }

    res.set({
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=3600'
    });

    imageStream.on('error', (error) => {
      console.error('Error streaming image:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error streaming image');
    });

    imageStream.pipe(res);
  }
}
