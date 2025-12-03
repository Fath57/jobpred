import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../shared/decorators/skip-auth.decorator';

@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly service: ModulesService) {}

  @Post()
  @SkipAuth()
  @ApiOperation({ summary: 'Create a module' })
  @ApiCreatedResponse({ description: 'Module created' })
  create(@Body() dto: { name: string; description?: string | null }) {
    return this.service.create(dto);
  }

  @Get()
  @SkipAuth()
  @ApiOperation({ summary: 'List modules' })
  @ApiOkResponse({ description: 'List of modules' })
  findAll() {
    return this.service.findAll();
  }

  @Get('with-permissions')
  @SkipAuth()
  @ApiOperation({ summary: 'List modules with their permissions' })
  @ApiOkResponse({ description: 'List of modules with permissions' })
  findWithPermissions() {
    return this.service.findWithPermissions();
  }
}
