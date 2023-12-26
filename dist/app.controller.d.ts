import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getContractAddress(): string;
    getTotalSupply(): Promise<number>;
    getWalletBalance(address: string): Promise<number>;
    transfer(wallet: string, amount: number): Promise<number>;
}
