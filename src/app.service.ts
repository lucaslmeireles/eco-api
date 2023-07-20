import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): { name: string; small_text: string } {
        return { name: 'ECO-API', small_text: 'Welcome to the ECO-API' };
    }
}
