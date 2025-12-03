import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { PricingService } from './pricing.service';
import { CreateOptionDto, UpdateOptionDto } from './dto/option.dto';
import { CreatePackDto, UpdatePackDto } from './dto/pack.dto';
import { CreateCheckoutSessionDto, CheckoutSessionResponseDto, VerifyPaymentDto, PaymentStatusResponseDto } from './dto/checkout.dto';
import { SkipAuth } from 'src/shared/decorators/skip-auth.decorator';
import { PaginatedResult } from '../shared/types/pagination.types';
import { Option, Pack } from '@prisma/client';

@ApiTags('Pricing')
@Controller('pricing')
@SkipAuth()
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  // Options endpoints
  @Post('options')
  @ApiOperation({ summary: 'Créer une nouvelle option' })
  @ApiBody({ type: CreateOptionDto })
  @ApiResponse({ status: 201, description: 'Option créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async createOption(@Body() createOptionDto: CreateOptionDto): Promise<Option> {
    return await this.pricingService.createOption(createOptionDto);
  }

  @Get('options')
  @ApiOperation({ summary: 'Récupérer toutes les options actives' })
  @ApiResponse({ status: 200, description: 'Liste des options récupérée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAllOptions(
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
    @Query('search') search?: string,
  ): Promise<PaginatedResult<Option>> {
    return await this.pricingService.findAllOptions(
      page ? parseInt(page) : 1,
      perPage ? parseInt(perPage) : 10,
      search
    );
  }

  @Get('options/:id')
  @ApiOperation({ summary: 'Récupérer une option par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'option' })
  @ApiResponse({ status: 200, description: 'Option récupérée avec succès' })
  @ApiResponse({ status: 404, description: 'Option non trouvée' })
  async findOptionById(@Param('id') id: string) {
    return await this.pricingService.findOptionById(id);
  }

  @Patch('options/:id')
  @ApiOperation({ summary: 'Mettre à jour une option' })
  @ApiParam({ name: 'id', description: 'ID de l\'option' })
  @ApiBody({ type: UpdateOptionDto })
  @ApiResponse({ status: 200, description: 'Option mise à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Option non trouvée' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async updateOption(
    @Param('id') id: string,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return await this.pricingService.updateOption(id, updateOptionDto);
  }

  @Delete('options/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une option (désactivation)' })
  @ApiParam({ name: 'id', description: 'ID de l\'option' })
  @ApiResponse({ status: 204, description: 'Option supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Option non trouvée' })
  async deleteOption(@Param('id') id: string) {
    return await this.pricingService.deleteOption(id);
  }

  // Packs endpoints
  @Post('packs')
  @ApiOperation({ summary: 'Créer un nouveau pack' })
  @ApiBody({ type: CreatePackDto })
  @ApiResponse({ status: 201, description: 'Pack créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async createPack(@Body() createPackDto: CreatePackDto) {
    return await this.pricingService.createPack(createPackDto);
  }

  @Get('packs')
  @ApiOperation({ summary: 'Récupérer tous les packs actifs avec leurs options' })
  @ApiResponse({ status: 200, description: 'Liste des packs récupérée avec succès' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAllPacks(
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
    @Query('search') search?: string,
  ): Promise<PaginatedResult<Pack>> {
    return await this.pricingService.findAllPacks(
      page ? parseInt(page) : 1,
      perPage ? parseInt(perPage) : 10,
      search
    );
  }

  @Get('packs/:id')
  @ApiOperation({ summary: 'Récupérer un pack par son ID avec ses options' })
  @ApiParam({ name: 'id', description: 'ID du pack' })
  @ApiResponse({ status: 200, description: 'Pack récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Pack non trouvé' })
  async findPackById(@Param('id') id: string) {
    return await this.pricingService.findPackById(id);
  }

  @Patch('packs/:id')
  @ApiOperation({ summary: 'Mettre à jour un pack' })
  @ApiParam({ name: 'id', description: 'ID du pack' })
  @ApiBody({ type: UpdatePackDto })
  @ApiResponse({ status: 200, description: 'Pack mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Pack non trouvé' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async updatePack(
    @Param('id') id: string,
    @Body() updatePackDto: UpdatePackDto,
  ) {
    return await this.pricingService.updatePack(id, updatePackDto);
  }

  @Delete('packs/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un pack (désactivation)' })
  @ApiParam({ name: 'id', description: 'ID du pack' })
  @ApiResponse({ status: 204, description: 'Pack supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Pack non trouvé' })
  async deletePack(@Param('id') id: string) {
    return await this.pricingService.deletePack(id);
  }

  // Pack options management
  @Get('packs/:id/options')
  @ApiOperation({ summary: 'Récupérer les options d\'un pack' })
  @ApiParam({ name: 'id', description: 'ID du pack' })
  @ApiResponse({ status: 200, description: 'Options du pack récupérées avec succès' })
  @ApiResponse({ status: 404, description: 'Pack non trouvé' })
  async getPackOptions(@Param('id') id: string) {
    return await this.pricingService.getPackOptions(id);
  }

  @Post('packs/:packId/options/:optionId')
  @ApiOperation({ summary: 'Ajouter une option à un pack' })
  @ApiParam({ name: 'packId', description: 'ID du pack' })
  @ApiParam({ name: 'optionId', description: 'ID de l\'option' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        quantity: { type: 'number', default: 1 } 
      } 
    } 
  })
  @ApiResponse({ status: 201, description: 'Option ajoutée au pack avec succès' })
  @ApiResponse({ status: 404, description: 'Pack ou option non trouvé' })
  async addOptionToPack(
    @Param('packId') packId: string,
    @Param('optionId') optionId: string,
    @Body('quantity') quantity: number = 1,
  ) {
    return await this.pricingService.addOptionToPack(packId, optionId, quantity);
  }

  @Delete('packs/:packId/options/:optionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Retirer une option d\'un pack' })
  @ApiParam({ name: 'packId', description: 'ID du pack' })
  @ApiParam({ name: 'optionId', description: 'ID de l\'option' })
  @ApiResponse({ status: 204, description: 'Option retirée du pack avec succès' })
  @ApiResponse({ status: 404, description: 'Pack ou option non trouvé' })
  async removeOptionFromPack(
    @Param('packId') packId: string,
    @Param('optionId') optionId: string,
  ) {
    return await this.pricingService.removeOptionFromPack(packId, optionId);
  }

  // Checkout endpoints
  @Post('checkout/create-session')
  @ApiOperation({ summary: 'Créer une session de paiement Stripe' })
  @ApiBody({ type: CreateCheckoutSessionDto })
  @ApiResponse({ status: 201, description: 'Session de checkout créée avec succès', type: CheckoutSessionResponseDto })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Option ou pack non trouvé' })
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ): Promise<CheckoutSessionResponseDto> {
    return await this.pricingService.createCheckoutSession(createCheckoutSessionDto);
  }

  @Post('checkout/verify-payment')
  @ApiOperation({ summary: 'Vérifier le statut d\'un paiement' })
  @ApiBody({ type: VerifyPaymentDto })
  @ApiResponse({ status: 200, description: 'Statut du paiement récupéré avec succès', type: PaymentStatusResponseDto })
  @ApiResponse({ status: 404, description: 'Session non trouvée' })
  async verifyPayment(
    @Body() verifyPaymentDto: VerifyPaymentDto,
  ): Promise<PaymentStatusResponseDto> {
    return await this.pricingService.verifyPayment(verifyPaymentDto.sessionId);
  }
}