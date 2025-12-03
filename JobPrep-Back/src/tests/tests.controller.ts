import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Tests')
@Controller('tests')
export class TestsController {
  @Get()
  @ApiOperation({ summary: 'Get tests information' })
  getInfo() {
    return { message: 'Tests endpoint - Coming soon' };
  }
}
