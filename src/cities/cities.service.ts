import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class CitiesService {
  getPopularCities() {
    return [
      { name: 'Paris' },
      { name: 'London' },
      { name: 'Moscow' },
      { name: 'Warsaw' },
      { name: 'Tokyo' },
      { name: 'Sydney' },
    ];
  }

  getCityImageStream(cityName: string) {
    const imagePath = join(
      process.cwd(),
      'src',
      'images',
      `${cityName.toLowerCase()}-bg.jpg`,
    );
    return existsSync(imagePath) ? createReadStream(imagePath) : null;
  }
}
