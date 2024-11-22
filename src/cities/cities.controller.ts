import { Controller, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { Request, Response } from 'express';

@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('popular-cities')
  getPopularCities(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token || !this.citiesService.isAdminTokenValid(token)) {
      throw new HttpException('Forbidden: Not an admin', HttpStatus.FORBIDDEN);
    }

    res.status(HttpStatus.OK).json({
      isAdmin: true,
      cities: this.citiesService.getPopularCities(),
    });
  }

  @Get(':cityName')
  async getCityImage(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token || !this.citiesService.isAdminTokenValid(token)) {
      throw new HttpException('Unauthorized: Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const cityName = req.params.cityName;
    try {
      const imageStream = await this.citiesService.getCityImageStream(cityName);
      res.setHeader('Content-Type', 'image/jpeg');
      imageStream.pipe(res);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send('Image not found');
    }
  }
}
