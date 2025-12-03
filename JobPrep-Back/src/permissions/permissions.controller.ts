import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../shared/decorators/skip-auth.decorator';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Post()
  @SkipAuth()
  @ApiOperation({ summary: 'Create a permission' })
  @ApiCreatedResponse({ description: 'Permission created' })
  create(@Body() dto: { name: string; description?: string | null; moduleId: string }) {
    return this.service.create(dto);
  }

  @Get()
  @SkipAuth()
  @ApiOperation({ summary: 'List all permissions' })
  @ApiOkResponse({ description: 'List of permissions' })
  findAll() {
    return this.service.findAll();
  }

  @Get('by-module/:moduleId')
  @SkipAuth()
  @ApiOperation({ summary: 'List permissions by module' })
  @ApiParam({ name: 'moduleId' })
  findByModule(@Param('moduleId') moduleId: string) {
    return this.service.findByModule(moduleId);
  }
}
