"use client";
import React, { useEffect, useState } from "react";
//import de axios para BD
import axios from "axios";
import {
  //imports de tabelas
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
  //imports de dropdown menu
  Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  //imports de inputs
  Input
} from "@nextui-org/react";
 
//imports de icons
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
 
//imports de componentes
import ReservationMotiveForm from "@/components/modal/bookings/reservationMotive/page";
import PaginationTable from "@/components/table/paginationTable/paginationTable";
 
 
export default function Characteristics() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchValue, setSearchValue] = React.useState("");
  const [reservMotive, setReservMotive] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/bookings/reservationMotive");
      setReservMotive(res.data.response);
    };
    getData();
  }, []);
 
  const filteredItems = React.useMemo(() => {
    if (!reservMotive || !Array.isArray(reservMotive)) {
      return [];
    }
  
    return reservMotive.filter((reservation) =>
      (reservation.description && reservation.description.toLowerCase().includes(searchValue.toLowerCase())) ||
      (reservation.refID && reservation.refID.toString().toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [reservMotive, searchValue]);
  
 
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
 
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
 
  const renderCell = React.useCallback((reservMotive, columnKey) => {
    const cellValue = reservMotive[columnKey];
  }, []);
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };
 
  const handleDelete = async (idReservMotive) => {
    try {
      const response = await axios.delete(`/api/v1/bookings/reservationMotive/` + idReservMotive);
      alert("Motivo de reserva removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover motivo de reserva:", error.message);
    }
  };
 
    return (
      <main>
        <div className="flex flex-col mt-3 py-3">
          <p className="text-xs px-6">Motivo de Reserva</p>
          <div className="flex flex-row justify-between items-center mx-5">
            <div className="flex flex-row">
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <Input
                  className="mt-4 w-80"
                  placeholder="Procurar..."
                  labelPlacement="outside"
                  startContent={
                    <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
            <ReservationMotiveForm
              buttonName={"Novo"}
              buttonIcon={<FiPlus size={15} />}
              buttonColor={"primary"}
              modalHeader={"Inserir Motivos de Reserva"}
              modalIcons={"bg-red"}
              formTypeModal={11}
            ></ReservationMotiveForm>
          </div>
        </div>
        <div className="mx-5 h-[65vh] min-h-full">
          <PaginationTable
            page={page}
            pages={pages}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            items={items}
            setPage={setPage}
            dataCSVButton={
              items.map((item) => ({
                ID: item.refID,
                Abreviatura: item.shortName,
                Descrição: item.name,
                Ordenação: item.className,
              }))
            }
          >
            <Table
            id="TableToPDF"
      isHeaderSticky={"true"}
        layout={"fixed"}
        isCompact={"true"}
        removeWrapper
        classNames={{
          wrapper: "min-h-[222px]",
        }}
        className="h-full overflow-auto"
      >
        <TableHeader>
          <TableColumn className="bg-primary-600 text-white font-bold w-[40px] uppercase">
            ID
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold w-64 px-40 uppercase">
            Abreviatura
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold flex-3/4 uppercase">
            Descrição
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white font-bold px-20 uppercase">
            Ordenação
          </TableColumn>
          <TableColumn className="bg-primary-600 text-white flex justify-end items-center pr-7">
            <GoGear size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((reservMotive, index) => (
            <TableRow key={index}>
              <TableCell className="text-right underline text-blue-600"><ReservationMotiveForm
                        buttonName={reservMotive.refID}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Motivos de Reservas"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${reservMotive.refID}`}
                        formTypeModal={12}
                        idReservMotive={reservMotive.refID}
                        criado={reservMotive.createdAt}
                        editado={reservMotive.updatedAt}
                        editor={"teste"}
                      /></TableCell>
              <TableCell className="px-40">{reservMotive.shortName}</TableCell>
              <TableCell>{reservMotive.name}</TableCell>
              <TableCell className="px-20">{reservMotive.className}</TableCell>
              <TableCell className="flex justify-end">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="flex flex-row justify-end"
                    >
                      <BsThreeDotsVertical size={20} className="text-gray-400" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                    <DropdownItem key="edit">
                      <ReservationMotiveForm
                        buttonName={"Editar"}
                        editIcon={<FiEdit3 size={25}/>}
                        buttonColor={"transparent"}
                        modalHeader={"Editar Motivos de Reservas"}
                        modalEditArrow={<BsArrowRight size={25}/>}
                        modalEdit={`ID: ${reservMotive.refID}`}
                        formTypeModal={12}
                        idReservMotive={reservMotive.refID}
                        criado={reservMotive.createdAt}
                        editado={reservMotive.updatedAt}
                        editor={"teste"}
                      ></ReservationMotiveForm>
                    </DropdownItem>
                    <DropdownItem key="delete" onClick={() => handleDelete(reservMotive.refID)}>Remover</DropdownItem>
                    <DropdownItem key="view">Ver</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </PaginationTable>
        </div>
      </main>
    );
}

