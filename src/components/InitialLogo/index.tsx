import styles from "./styles.module.scss";
import Image from 'next/image';
import logo from '../../../public/images/logo.png';

export function InitialLogo() {
  // eslint-disable-next-line @next/next/no-img-element
  return <Image src={logo} alt="logo" width={400} height={300}/>;
}
