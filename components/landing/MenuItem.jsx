/* eslint-disable react/display-name */
import Link from "next/link";
// import { forwardRef } from "react";

const MenuItem =  ({ link, name,className }) => {
  return <>
    <Link href={link} className={className}>
      {name}
    </Link>
  </>;
}

export default MenuItem;
