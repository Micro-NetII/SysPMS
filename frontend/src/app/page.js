"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout/Layout";
import {Button, ButtonGroup} from "@nextui-org/react";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  

  return (
    <>
    <div class="flex flex-row light">
      <div class="w-2/3 h-screen">
        <img
          src="https://images.ctfassets.net/q33z48p65a6w/5Z83oKWOo9YosmVpOFzBsg/b10a2e35de3e70f16c3df5bbbce715ed/Stocksy_txp333bf2f7Cb1300_Medium_2762454.jpg?w=1200&h=645&fit=thumb"
          alt="Picture of the author"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="w-1/3 h-screen px-24">
        <div class="h-screen flex justify-center align-center flex-col space-y-5">
          <center><Image src="/images/logo.png" alt="Logotipo" width={999} height={999} className="w-3/4"/></center>
          <input type="text" placeholder="E-Mail" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
          <input type="text" placeholder="Palavra-passe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
          <Button color="primary" className="w-fit px-8 uppercase"><Link href="/homepage">Entrar</Link></Button>
        </div>
      </div>
    </div>

    </>
  );  
}