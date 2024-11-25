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
    ];
  }

  getCityImageStream(cityName: string) {
    // Using process.cwd() to get the project root, then navigate to src/images
    const imagePath = join(process.cwd(), 'src', 'images', `${cityName.toLowerCase()}-bg.jpg`);
    console.log('Looking for image at:', imagePath);
    
    if (!existsSync(imagePath)) {
      console.log('Image not found at path:', imagePath);
      return null;
    }
    console.log('Image found at path:', imagePath);
    return createReadStream(imagePath);
  }
}
