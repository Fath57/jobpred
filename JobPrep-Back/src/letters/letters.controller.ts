import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Letters')
@Controller('letters')
export class LettersController {
  @Get()
  @ApiOperation({ summary: 'Get letters information' })
  getInfo() {
    return { message: 'Letters endpoint - Coming soon' };
  }
}
