import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as AbiFile from './abi/TokenAbi.json';
import configuration from './config/configuration';

@Injectable()
export class AppService {
  provider = new ethers.providers.JsonRpcProvider(configuration().rpc_url);

  contract = new ethers.Contract(
    configuration().contract_address,
    AbiFile,
    this.provider,
  );

  signer = new ethers.Wallet(configuration().private_key, this.provider);

  getContractAddress(): string {
    return configuration().contract_address;
  }

  async getTotalSupply(): Promise<number> {
    const total_supply_big_number = await this.contract.totalSupply();
    const total_supply = +ethers.utils.formatEther(total_supply_big_number);
    return total_supply;
  }

  async getWalletBalance(walletAddress: string): Promise<number> {
    const balance_big_number = await this.contract.balanceOf(walletAddress);
    const balance = +ethers.utils.formatEther(balance_big_number);
    return balance;
  }

  async transfer(toWallet: string, amount: number) {
    const parsed_amount = ethers.utils.parseUnits(amount.toString(), 18);
    const data = this.contract.interface.encodeFunctionData('transfer', [
      toWallet,
      parsed_amount,
    ]);
    const tx = await this.signer.sendTransaction({
      to: configuration().contract_address,
      from: this.signer.address,
      value: ethers.utils.parseUnits('0.000', 'ether'),
      data,
    });
    const receipt = await tx.wait();
    return receipt.blockNumber;
  }
}
