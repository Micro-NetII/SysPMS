"use client"

import React from "react";
import Link from "next/link";
import { divider } from "@nextui-org/react"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {typologys, actions, users } from "../../../data/data";
import { GoGear } from "react-icons/go";


export default function Characteristics() {
    const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <main className="mx-5">
    <div className="flex flex-col my-10 py-3">
        <p className="text-xs px-6">Characteristics</p>
        <div className="flex flex-row">
         <Autocomplete 
      variant="underlined"
        label="Selecione a opção" 
        className="max-w-xs" 
      >
        {typologys.map((typology) => (
          <AutocompleteItem key={typology.value} value={typology.value}>
            {typology.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <input type="text" placeholder="Search All" className="w-80 px-2 outline-none bg-transparent border-b-2 border-gray-400 mx-5"></input>
    </div>
        </div>
    </div>
    <Table removeWrapper isStriped
     bottomContent={
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="var(--dark-green)"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    }
    classNames={{
      wrapper: "min-h-[222px]",
    }}>
        <TableHeader>
            <TableColumn className="bg-[var(--dark-green)] text-[var(--white)] font-bold">ID</TableColumn>
            <TableColumn className="bg-[var(--dark-green)] text-[var(--white)] font-bold">DESCRIÇÃO</TableColumn>
            <TableColumn className="bg-[var(--dark-green)] text-[var(--white)] font-bold">ABREVIATURA</TableColumn>
            <TableColumn className="bg-[var(--dark-green)] text-[var(--white)] font-bold">DETALHE</TableColumn>
            <TableColumn className="bg-[var(--dark-green)] text-[var(--white)] flex justify-center items-center"><GoGear size={20}/></TableColumn>
        </TableHeader>
        <TableBody>
            <TableRow key="1">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>
                <Select 
                    label="°°°" 
                    className="max-w-xs" 
                >
                    {actions.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                        {action.label}
                    </SelectItem>
                    ))}
                </Select>
                </TableCell>
            </TableRow>
            <TableRow key="2">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>
                <Select 
                    label="°°°" 
                    className="max-w-xs" 
                >
                    {actions.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                        {action.label}
                    </SelectItem>
                    ))}
                </Select>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </main>
  )
}
