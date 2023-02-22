import Image from "next/image";
import logo from "../assests/logo.png";
export function Logo() {
  return <Image src={logo} alt="logo" width={200} />;
}
