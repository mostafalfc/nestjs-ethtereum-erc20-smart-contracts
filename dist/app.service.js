"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const AbiFile = require("./abi/TokenAbi.json");
const configuration_1 = require("./config/configuration");
let AppService = class AppService {
    constructor() {
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider((0, configuration_1.default)().rpc_url);
        this.contract = new ethers_1.ethers.Contract((0, configuration_1.default)().contract_address, AbiFile, this.provider);
        this.signer = new ethers_1.ethers.Wallet((0, configuration_1.default)().private_key, this.provider);
    }
    getContractAddress() {
        return (0, configuration_1.default)().contract_address;
    }
    async getTotalSupply() {
        const total_supply_big_number = await this.contract.totalSupply();
        const total_supply = +ethers_1.ethers.utils.formatEther(total_supply_big_number);
        return total_supply;
    }
    async getWalletBalance(walletAddress) {
        const balance_big_number = await this.contract.balanceOf(walletAddress);
        const balance = +ethers_1.ethers.utils.formatEther(balance_big_number);
        return balance;
    }
    async transfer(toWallet, amount) {
        const parsed_amount = ethers_1.ethers.utils.parseUnits(amount.toString(), 18);
        const data = this.contract.interface.encodeFunctionData('transfer', [
            toWallet,
            parsed_amount,
        ]);
        const tx = await this.signer.sendTransaction({
            to: (0, configuration_1.default)().contract_address,
            from: this.signer.address,
            value: ethers_1.ethers.utils.parseUnits('0.000', 'ether'),
            data,
        });
        const receipt = await tx.wait();
        return receipt.blockNumber;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map