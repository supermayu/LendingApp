package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/username/loan/x/loan/types"
)

func (k msgServer) RequestLoan(goCtx context.Context, msg *types.MsgRequestLoan) (*types.MsgRequestLoanResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	//Create a new Loan with the following user input
	var loan = types.Loan{
		Amount:     msg.Amount,
		Fee:        msg.Fee,
		Collateral: msg.Collateral,
		Deadline:   msg.Deadline,
		State:      "requested",
		Borrower:   msg.Creator,
	}

	//TODO: collateral has to be mmore than the amount(+fee?)

	//moduleAcc := sdk.AccAddress(crypto.Addresshash([]byte(types.ModuleName)))
	//Get the borrower address
	borrower, _ := sdk.AccAddressFromBech32(msg.Creator)

	//Get the collateral as sdk.Coins
	collateral, err := sdk.ParseCoinsNormalized(loan.Collateral)
	if err != nil {
		panic(err)
	}

	//Use the module account as escrow account
	sdkError := k.bankKeeper.SendCoinsFromAccountToModule(ctx, borrower, types.ModuleName, collateral)
	if sdkError != nil {
		return nil, sdkError
	}

	//Add the loan to the keeper
	k.AppendLoan(
		ctx,
		loan,
	)

	return &types.MsgRequestLoanResponse{}, nil
}
