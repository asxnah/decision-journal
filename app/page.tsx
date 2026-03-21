"use client";

import Link from "next/link";

import { useDispatch } from "react-redux";
import { reset } from "@/store/slices/decisions";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/create-decision">create decision</Link>
        </li>
        <li>
          <Link href="/decision-detail">decision detail</Link>
        </li>
        <li>
          <Link href="/expectations">expectations</Link>
        </li>
        <li>
          <Link href="/reflect">reflect</Link>
        </li>
        <li>
          <Link href="/review-date">review date</Link>
        </li>
        <li>
          <Link href="/timeline">timeline</Link>
        </li>
      </ul>
    </nav>
  );
}
