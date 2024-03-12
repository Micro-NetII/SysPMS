"use client";

import React from "react";
import Link from "next/link";
import { divider } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { typologys, actions, users } from "../../../data/data";
import { GoGear } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import CompanyForm from "@/components/companyForm/companyForm";
import {
  Dropdown,
  Button,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";

export default function TypologyGroup() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <main className="mx-5">
      <div className="flex flex-row my-10 py-3 justify-between">
        <div>
          <p className="text-xs px-6">Grupo de Tipologias</p>
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
          </div>
        </div>

        <div>
          <CompanyForm
            buttonName={"Inserir"}
            modalHeader={"Inserir grupo de tipologias"}
          />
        </div>
      </div>

      <Table
        removeWrapper
        isStriped
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
        }}
      >
        <TableHeader>
          <TableColumn className="bg-primary-600 text-background font-bold">
            ID
          </TableColumn>
          <TableColumn className="bg-primary-600 text-background font-bold">
            COD.
          </TableColumn>
          <TableColumn className="bg-primary-600 text-background font-bold">
            DESCRIÇÃO
          </TableColumn>
          <TableColumn className="bg-primary-600 text-background font-bold">
            ABREVIATURA
          </TableColumn>
          <TableColumn className="bg-primary-600 text-background font-bold">
            DETALHE
          </TableColumn>
          <TableColumn className="bg-primary-600 text-background font-bold">
            ESTADO
          </TableColumn>
          <TableColumn className="bg-primary-600 text-background font-bold">
            ORDEM
          </TableColumn>
          <TableColumn className="bg-primary-600 text-background px-10 flex justify-center items-center">
            <GoGear size={20} />
          </TableColumn>
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
                      formTypeModal={1}
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
            <TableCell className="flex flex-row gap-4 justify-center">
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
                      modalHeader={"teste"}
                      formTypeModal={1}
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
                      modalHeader={"teste"}
                      formTypeModal={1}
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
                      modalHeader={"teste"}
                      formTypeModal={1}
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
                      modalHeader={"teste"}
                      formTypeModal={1}
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
                      modalHeader={"teste"}
                      formTypeModal={1}
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
                      modalHeader={"teste"}
                      formTypeModal={1}
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
  );
}
