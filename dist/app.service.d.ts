import { ethers } from 'ethers';
export declare class AppService {
    provider: ethers.providers.JsonRpcProvider;
    contract: ethers.Contract;
    signer: ethers.Wallet;
    getContractAddress(): string;
    getTotalSupply(): Promise<number>;
    getWalletBalance(walletAddress: string): Promise<number>;
    transfer(toWallet: string, amount: number): Promise<number>;
}
