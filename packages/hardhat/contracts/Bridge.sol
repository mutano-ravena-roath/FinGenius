// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract CeloEthBridge {
    address public constant celoRouterAddress = 0x5615CDAb10dc425a742d643d949a7F474C01abc4;
    address public constant celoTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address public constant ethereumTokenAddress = 0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B;

    ISwapRouter public immutable celoSwapRouter = ISwapRouter(celoRouterAddress);
    IERC20 public celoToken = IERC20(celoTokenAddress);

    uint24 public constant poolFee = 30000;

    event TokensBridgedCeloToEth(address indexed sender, uint256 amountIn, uint256 amountOut);

    event TokensBridgedEthToCelo(address indexed sender, uint256 amountIn, uint256 amountOut);

    function bridgeCeloToEth(uint256 amountIn) external returns (uint256 amountOut) {
        celoToken.approve(address(celoSwapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: celoTokenAddress,
            tokenOut: ethereumTokenAddress,
            fee: poolFee,
            recipient: address(this),
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        amountOut = celoSwapRouter.exactInputSingle(params);
        emit TokensBridgedCeloToEth(msg.sender, amountIn, amountOut);
    }

    function bridgeEthToCelo(uint256 amountIn, uint256 amountOutMinimum) external returns (uint256 amountOut) {
        IERC20(ethereumTokenAddress).approve(address(celoSwapRouter), amountIn);

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams({
            tokenIn: ethereumTokenAddress,
            tokenOut: celoTokenAddress,
            fee: poolFee,
            recipient: address(this),
            deadline: block.timestamp,
            amountOut: amountOutMinimum,
            amountInMaximum: amountIn,
            sqrtPriceLimitX96: 0
        });

        amountOut = celoSwapRouter.exactOutputSingle(params);
        emit TokensBridgedEthToCelo(msg.sender, amountIn, amountOut);
    }
}
