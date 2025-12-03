import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Speech')
@Controller('speech')
export class SpeechController {
  @Get()
  @ApiOperation({ summary: 'Get speech information' })
  getInfo() {
    return { message: 'Speech endpoint - Coming soon' };
  }
}
