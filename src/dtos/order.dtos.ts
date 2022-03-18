import { IsNotEmpty, IsNumber, IsPositive, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly customerId: number;

  @IsDate()
  @IsNotEmpty()
  readonly orderDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly orderTotal: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
