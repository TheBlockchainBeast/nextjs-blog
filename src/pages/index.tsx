import Link from "next/link";
import { useAccount } from "wagmi";

import {
  Account,
  Connect,
  NetworkSwitcher,
  Bridge,
  Balance,
  Logo,
} from "../components";

function Page() {
  const { isConnected } = useAccount();

  return (
    <>
      <header className="header">
        <div className="">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="">
          <Connect />
          {isConnected && (
            <>
              {/* <Account />
              <Balance /> */}
              <NetworkSwitcher />
            </>
          )}
        </div>
      </header>
      <h1 className="extra">DecentraTools Bridge</h1>
      <Bridge />
    </>
  );
}
export default Page;
