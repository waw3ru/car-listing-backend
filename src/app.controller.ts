import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ZodValidationPipe } from './common/pipes';
import {
  type CreateCarMakeValidationType,
  type CreateCarModelValidationType,
  type PaginationQueryValidationType,
  type UpdateCarModelValidationType,
  type UpdateCarMakeValidationType,
  createCarMakeValidation,
  createCarModelValidation,
  paginationQueryValidation,
  updateCarModelValidation,
  updateCarMakeValidation,
} from './common/validations';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('q')
  query(
    @Query(new ZodValidationPipe(paginationQueryValidation))
    $q: PaginationQueryValidationType,
  ) {
    return this.appService.query($q);
  }

  @Get('car-makes')
  getCarMakes() {
    return this.appService.getCarMakes();
  }

  @Get('car-models/:makeId')
  getCarModels(@Param('makeId') makeId: string) {
    return this.appService.getCarModels(makeId);
  }

  @UseGuards(AuthGuard('basic'))
  @Post('car-makes')
  createCarMake(
    @Body(new ZodValidationPipe(createCarMakeValidation))
    data: CreateCarMakeValidationType,
  ) {
    return this.appService.createCarMake(data);
  }

  @UseGuards(AuthGuard('basic'))
  @Post('car-models')
  createCarModel(
    @Body(new ZodValidationPipe(createCarModelValidation))
    data: CreateCarModelValidationType,
  ) {
    return this.appService.createCarModel(data);
  }

  @UseGuards(AuthGuard('basic'))
  @Put('car-makes')
  updateCarMake(
    @Body(new ZodValidationPipe(updateCarMakeValidation))
    data: UpdateCarMakeValidationType,
  ) {
    return this.appService.createCarMake(data);
  }

  @UseGuards(AuthGuard('basic'))
  @Put('car-models')
  updateCarModel(
    @Body(new ZodValidationPipe(updateCarModelValidation))
    data: UpdateCarModelValidationType,
  ) {
    return this.appService.createCarModel(data);
  }

  @Get()
  healthcheck() {
    return this.appService.healthcheck();
  }
}
