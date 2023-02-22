import { useAccount, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <div className="account">
      {ensName ?? address}
      {ensName ? ` (${address})` : null}
    </div>
  );
}
