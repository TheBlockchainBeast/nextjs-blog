import { BigNumber } from "ethers";
import * as React from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { Balance } from "../components";
export function Bridge() {
  const [amount, setAmount] = React.useState("");
  const { config } = usePrepareContractWrite({
    address: "0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f",
    abi: [
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "depositEth",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "depositEth",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "depositEth",
    args: [parseInt(amount)],
  });
  const { write } = useContractWrite(config);

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
            {/* <div className="swap-input-box">
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
            </div> */}
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
                      ETH
                    </button>
                  </div>
                </div>
                <input
                  className="swap-input"
                  id="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.01"
                  value={amount}
                />
                <span className="swap-balance">
                  <Balance />
                </span>
              </div>
            </div>
            <div className="swap-btn text-center">
              <button disabled={!write} className="theme-btn">
                Bridge Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
