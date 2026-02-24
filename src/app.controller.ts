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
  type CreateCarValidationType,
  type UpdateCarValidationType,
  createCarMakeValidation,
  createCarModelValidation,
  paginationQueryValidation,
  updateCarModelValidation,
  updateCarMakeValidation,
  updateCarValidation,
  createCarValidation,
} from './common/validations';
import { AuthGuard } from '@nestjs/passport';
import {
  CarInsertType,
  CarMakeInsertType,
  CarModelInsertType,
} from './database/schema.types';

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
    return this.appService.createCarMake(data as unknown as CarMakeInsertType);
  }

  @UseGuards(AuthGuard('basic'))
  @Post('car-models')
  createCarModel(
    @Body(new ZodValidationPipe(createCarModelValidation))
    data: CreateCarModelValidationType,
  ) {
    return this.appService.createCarModel(
      data as unknown as CarModelInsertType,
    );
  }

  @UseGuards(AuthGuard('basic'))
  @Put('car-makes')
  updateCarMake(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCarMakeValidation))
    data: UpdateCarMakeValidationType,
  ) {
    return this.appService.updateCarMake(
      id,
      data as unknown as CarMakeInsertType,
    );
  }

  @UseGuards(AuthGuard('basic'))
  @Put('car-models')
  updateCarModel(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCarModelValidation))
    data: UpdateCarModelValidationType,
  ) {
    return this.appService.updateCarModel(
      id,
      data as unknown as CarModelInsertType,
    );
  }

  @UseGuards(AuthGuard('basic'))
  @Post('car')
  createCar(
    @Body(new ZodValidationPipe(createCarValidation))
    data: CreateCarValidationType,
  ) {
    return this.appService.createCar(data as unknown as CarInsertType);
  }

  @UseGuards(AuthGuard('basic'))
  @Put('car/:id')
  updateCar(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCarValidation))
    data: UpdateCarValidationType,
  ) {
    return this.appService.updateCar(id, data as unknown as CarInsertType);
  }

  @Get()
  healthcheck() {
    return this.appService.healthcheck();
  }
}
