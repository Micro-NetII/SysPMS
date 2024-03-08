"use client"

import { divider } from "@nextui-org/react"
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";
import { GoGear } from "react-icons/go";


export default function TypologyGroup() {
  return (
    <main className="mx-5">
    <div className="flex flex-col my-10 py-3">
        <p className="text-xs px-6">Tipologys</p>
        <div className="flex flex-row">
        <select placeholder="All" className="w-80 px-2 outline-none bg-transparent border-b-2 border-gray-400 mx-5 h-8">
            <option className="hover:bg-gray-200">All</option>
            <option>Single Bedroom</option>
            <option>Double Bedroom</option>
        </select>
        <input type="text" placeholder="Search All" className="w-80 px-2 outline-none bg-transparent border-b-2 border-gray-400 mx-5"></input>
        </div>
    </div>
    <Table isStriped>
        <TableHeader>
            <TableColumn className="text-[var(--dark-green)] font-bold">ID</TableColumn>
            <TableColumn className="text-[var(--dark-green)] font-bold">COD.</TableColumn>
            <TableColumn className="text-[var(--dark-green)] font-bold">DESCRIÇÃO</TableColumn>
            <TableColumn className="text-[var(--dark-green)] font-bold">ABREVIATURA</TableColumn>
            <TableColumn className="text-[var(--dark-green)] font-bold">DETALHE</TableColumn>
            <TableColumn className="text-[var(--dark-green)] font-bold">FUNÇÃO</TableColumn>
            <TableColumn className="text-[var(--dark-green)] font-bold">ORDEM</TableColumn>
            <TableColumn className="text-[var(--dark-green)] font-bold">GRUPO TIPOLOGIA</TableColumn>
            <TableColumn><GoGear size={20}/></TableColumn>
        </TableHeader>
        <TableBody>
            <TableRow key="1">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>Quarto duplo em suite no madagascar</TableCell>
                <TableCell>Livre</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>PEN</TableCell>
            </TableRow>
            <TableRow key="2">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>Quarto duplo em suite no madagascar</TableCell>
                <TableCell>Livre</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>PEN</TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </main>
  )
}