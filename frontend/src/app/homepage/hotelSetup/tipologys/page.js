"use client"

import React from "react";
import { divider } from "@nextui-org/react";
import Link from "next/link";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Dropdown, DropdownTrigger, DropdownItem, Button, DropdownMenu, Input } from "@nextui-org/react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {typologys, actions, users } from "../../../data/data";
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import CompanyForm from "@/components/companyForm/companyForm";
import { IoMdSearch } from "react-icons/io";


export default function Typology() {
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
        <p className="text-xs px-6">Tipologys</p>
        <div className="flex flex-row">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
        className="mt-4 w-80"
          placeholder="Pesquisa"
          labelPlacement="outside"
          startContent={
            <IoMdSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
 
          }
        />
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
            </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
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
            <TableColumn className="bg-primary-600 text-background font-bold">ID</TableColumn>
            <TableColumn className="bg-primary-600 text-background font-bold">COD.</TableColumn>
            <TableColumn className="bg-primary-600 text-background font-bold">DESCRIÇÃO</TableColumn>
            <TableColumn className="bg-primary-600 text-background font-bold">ABREVIATURA</TableColumn>
            <TableColumn className="bg-primary-600 text-background font-bold">DETALHE</TableColumn>
            <TableColumn className="bg-primary-600 text-background font-bold">FUNÇÃO</TableColumn>
            <TableColumn className="bg-primary-600 text-background font-bold">ORDEM</TableColumn>
            <TableColumn className="bg-primary-600 text-background font-bold">GRUPO TIPOLOGIA</TableColumn>
            <TableColumn className="bg-primary-600 text-background font-bold px-10 flex justify-center items-center"><GoGear size={20}/></TableColumn>
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
                <TableCell>
                <Dropdown>
                <center>
                  <DropdownTrigger>
                    <Button variant="light" className="text-gray-400">
                      <BsThreeDotsVertical size={20} />
                    </Button>
                  </DropdownTrigger>
                </center>
                <DropdownMenu
                  aria-label="Static Actions"
                  closeOnSelect={false}
                  isOpen={true}
                >
                  <DropdownItem key="edit">
                    <CompanyForm
                      buttonName={"Editar"}
                      modalHeader={"teste123"}
                      formTypeModal={4}
                      className="mx-0"
                    />
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Apagar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
                </TableCell>
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
                <TableCell>
                <Dropdown>
                <center>
                  <DropdownTrigger>
                    <Button variant="light" className="text-gray-400">
                      <BsThreeDotsVertical size={20} />
                    </Button>
                  </DropdownTrigger>
                </center>
                <DropdownMenu
                  aria-label="Static Actions"
                  closeOnSelect={false}
                  isOpen={true}
                >
                  <DropdownItem key="edit">
                    <CompanyForm
                      buttonName={"Editar"}
                      modalHeader={"teste123"}
                      formTypeModal={4}
                      className="mx-0"
                    />
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Apagar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
                </TableCell>
            </TableRow>
            <TableRow key="3">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>Quarto duplo em suite no madagascar</TableCell>
                <TableCell>Livre</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>
                <Dropdown>
                <center>
                  <DropdownTrigger>
                    <Button variant="light" className="text-gray-400">
                      <BsThreeDotsVertical size={20} />
                    </Button>
                  </DropdownTrigger>
                </center>
                <DropdownMenu
                  aria-label="Static Actions"
                  closeOnSelect={false}
                  isOpen={true}
                >
                  <DropdownItem key="edit">
                    <CompanyForm
                      buttonName={"Editar"}
                      modalHeader={"teste123"}
                      formTypeModal={4}
                      className="mx-0"
                    />
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Apagar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
                </TableCell>
            </TableRow>
            <TableRow key="4">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>Quarto duplo em suite no madagascar</TableCell>
                <TableCell>Livre</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>
                <Dropdown>
                <center>
                  <DropdownTrigger>
                    <Button variant="light" className="text-gray-400">
                      <BsThreeDotsVertical size={20} />
                    </Button>
                  </DropdownTrigger>
                </center>
                <DropdownMenu
                  aria-label="Static Actions"
                  closeOnSelect={false}
                  isOpen={true}
                >
                  <DropdownItem key="edit">
                    <CompanyForm
                      buttonName={"Editar"}
                      modalHeader={"teste123"}
                      formTypeModal={4}
                      className="mx-0"
                    />
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Apagar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
                </TableCell>
            </TableRow>
            <TableRow key="5">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>Quarto duplo em suite no madagascar</TableCell>
                <TableCell>Livre</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>
                <Dropdown>
                <center>
                  <DropdownTrigger>
                    <Button variant="light" className="text-gray-400">
                      <BsThreeDotsVertical size={20} />
                    </Button>
                  </DropdownTrigger>
                </center>
                <DropdownMenu
                  aria-label="Static Actions"
                  closeOnSelect={false}
                  isOpen={true}
                >
                  <DropdownItem key="edit">
                    <CompanyForm
                      buttonName={"Editar"}
                      modalHeader={"teste123"}
                      formTypeModal={4}
                      className="mx-0"
                    />
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Apagar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
                </TableCell>
            </TableRow>
            <TableRow key="6">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>Quarto duplo em suite no madagascar</TableCell>
                <TableCell>Livre</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>
                <Dropdown>
                <center>
                  <DropdownTrigger>
                    <Button variant="light" className="text-gray-400">
                      <BsThreeDotsVertical size={20} />
                    </Button>
                  </DropdownTrigger>
                </center>
                <DropdownMenu
                  aria-label="Static Actions"
                  closeOnSelect={false}
                  isOpen={true}
                >
                  <DropdownItem key="edit">
                    <CompanyForm
                      buttonName={"Editar"}
                      modalHeader={"teste123"}
                      formTypeModal={4}
                      className="mx-0"
                    />
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Apagar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
                </TableCell>
            </TableRow>
            <TableRow key="7">
                <TableCell>1</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>Quarto Duplo</TableCell>
                <TableCell>QD</TableCell>
                <TableCell>Quarto duplo em suite no madagascar</TableCell>
                <TableCell>Livre</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>PEN</TableCell>
                <TableCell>
                <Dropdown>
                <center>
                  <DropdownTrigger>
                    <Button variant="light" className="text-gray-400">
                      <BsThreeDotsVertical size={20} />
                    </Button>
                  </DropdownTrigger>
                </center>
                <DropdownMenu
                  aria-label="Static Actions"
                  closeOnSelect={false}
                  isOpen={true}
                >
                  <DropdownItem key="edit">
                    <CompanyForm
                      buttonName={"Editar"}
                      modalHeader={"teste123"}
                      formTypeModal={4}
                      className="mx-0"
                    />
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Apagar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </main>
  )
}