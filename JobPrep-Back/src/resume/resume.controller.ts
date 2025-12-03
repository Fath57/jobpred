import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Resume')
@Controller('resume')
export class ResumeController {
  @Get()
  @ApiOperation({ summary: 'Get resume information' })
  getInfo() {
    return { message: 'Resume endpoint - Coming soon' };
  }
}
