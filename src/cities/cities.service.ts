import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class CitiesService {
  private readonly validAdminTokenHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  isAdminTokenValid(token: string): boolean {
    const tokenHeader = token.split('.')[0];
    return tokenHeader === this.validAdminTokenHeader;
  }

  getPopularCities() {
    return [
      { name: 'Paris' },
      { name: 'London' },
      { name: 'Moscow' },
      { name: 'Warsaw' },
      { name: 'Berlin' },
      { name: 'Lisbon' },
      { name: 'Rome' },
      { name: 'Sydney' },
      { name: 'Tokyo' },
    ];
  }

  async getCityImageStream(cityName: string) {
    const imagePath = join(__dirname, '..', 'images', `${cityName}-bg.jpg`);

    if (!existsSync(imagePath)) {
      throw new Error('Image not found');
    }
    return createReadStream(imagePath);
  }
}
