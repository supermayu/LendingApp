// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgLiquidateLoan } from "./types/loan/tx";
import { MsgRequestLoan } from "./types/loan/tx";
import { MsgRepayLoan } from "./types/loan/tx";
import { MsgCancelLoan } from "./types/loan/tx";
import { MsgApproveLoan } from "./types/loan/tx";


const types = [
  ["/username.loan.loan.MsgLiquidateLoan", MsgLiquidateLoan],
  ["/username.loan.loan.MsgRequestLoan", MsgRequestLoan],
  ["/username.loan.loan.MsgRepayLoan", MsgRepayLoan],
  ["/username.loan.loan.MsgCancelLoan", MsgCancelLoan],
  ["/username.loan.loan.MsgApproveLoan", MsgApproveLoan],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgLiquidateLoan: (data: MsgLiquidateLoan): EncodeObject => ({ typeUrl: "/username.loan.loan.MsgLiquidateLoan", value: MsgLiquidateLoan.fromPartial( data ) }),
    msgRequestLoan: (data: MsgRequestLoan): EncodeObject => ({ typeUrl: "/username.loan.loan.MsgRequestLoan", value: MsgRequestLoan.fromPartial( data ) }),
    msgRepayLoan: (data: MsgRepayLoan): EncodeObject => ({ typeUrl: "/username.loan.loan.MsgRepayLoan", value: MsgRepayLoan.fromPartial( data ) }),
    msgCancelLoan: (data: MsgCancelLoan): EncodeObject => ({ typeUrl: "/username.loan.loan.MsgCancelLoan", value: MsgCancelLoan.fromPartial( data ) }),
    msgApproveLoan: (data: MsgApproveLoan): EncodeObject => ({ typeUrl: "/username.loan.loan.MsgApproveLoan", value: MsgApproveLoan.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
