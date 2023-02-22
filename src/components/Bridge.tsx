import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Balance } from "../components";
export function Bridge() {
  const [amount, setAmount] = React.useState("");

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x2bB103EC2482f030C0b39022417371a84627f578",
    abi: [
      {
        inputs: [{ internalType: "uint32", name: "amount", type: "uint32" }],
        name: "bridgeEthToArbitrum",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "EthLocked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "EthWithdrawn",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawEth",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getBridgeAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "getLockedEthAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getMessengerAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "getTokenGatewayAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
    ],
    functionName: "bridgeEthToArbitrum",
    args: [parseInt(amount)],
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        write?.();
      }}
    >
      <div className="swap-tool">
        <div className="swap-body">
          <div className="swap-form">
            <div className="swap-input-box">
              <label>Bridge From</label>
              <div className="swap-input-main">
                <div className="swap-box">
                  <div className="dropdown">
                    <button
                      className="dropdown-select extra"
                      type="button"
                      data-toggle="modal"
                      data-target="#select-token-popup"
                    >
                      ETH
                    </button>
                  </div>
                </div>
                <input
                  className="swap-input"
                  id="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  value={amount}
                />
                <span className="swap-balance">Balance : 0.00</span>
              </div>
            </div>
            <div className="swap-icon"></div>
            <div className="swap-input-box">
              <label>Bridge To</label>
              <div className="swap-input-main">
                <div className="swap-box">
                  <div className="dropdown">
                    <button
                      className="dropdown-select extra"
                      type="button"
                      data-toggle="modal"
                      data-target="#select-token-popup"
                    >
                      ARBITRUM ONE
                    </button>
                  </div>
                </div>
                <input
                  className="swap-input"
                  id="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  value={amount}
                />
                <span className="swap-balance">
                  <Balance />
                </span>
              </div>
            </div>
            <div className="swap-btn text-center">
              <button className="theme-btn">Bridge Now</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
