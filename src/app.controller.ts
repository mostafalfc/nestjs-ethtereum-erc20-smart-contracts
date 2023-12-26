import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/contract-address')
  getContractAddress(): string {
    return this.appService.getContractAddress();
  }

  @Get('/total-supply')
  async getTotalSupply(): Promise<number> {
    return await this.appService.getTotalSupply();
  }

  @Get('/wallet-balance/:address')
  async getWalletBalance(@Param('address') address: string): Promise<number> {
    return await this.appService.getWalletBalance(address);
  }

  @Post('/transfer/:wallet/:amount')
  async transfer(
    @Param('wallet') wallet: string,
    @Param('amount') amount: number,
  ) {
    return await this.appService.transfer(wallet, amount);
  }
}
