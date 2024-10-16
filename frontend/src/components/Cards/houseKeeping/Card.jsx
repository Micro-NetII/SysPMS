"use client";

import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { MdTableRows } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import FormModals from "@/components/modal/hotelSetup/cardModal/formModals";
import axios from "axios"; // Don't forget to import axios

const Cartao = ({
  title,
  description,
  counter1,
  counter2,
  counter3,
  counter4,
  counter5,
  counter6,
  icon,
  listType,
  formTypeCard,
  extraicon,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [housekeepingRooms, setHousekeepingRooms] = useState([]);

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  const handleCardClick = () => {
    router.push(pathname + "/" + ("listType", listType));
  };

  const formatDateTime = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/housekeeping/housekeeping");
        const data = res.data.housekeepingRecords; // Adjust to match the API response structure
        setHousekeepingRooms(data);
      } catch (error) {
        console.error("Erro: ", error.message);
      }
    };
    getData();
  }, []);

  return (
    <div
      className="w-full h-full"
      data-listType={listType}
      style={{ cursor: "pointer" }}
    >
      <Card className="w-full h-full">
        <CardHeader className="flex gap-3">
          <div className="flex w-full justify-between">
            <div className="flex flex-col border-slate-100">
              <div className="text-emerald-800 text-[60px] ml-20 font-bold">
                {counter1}
              </div>
              <div className="text-lime-500 text-[60px] ml-20 font-bold">
                {counter2}
              </div>
              <div className="text-red-600 text-[60px] ml-20 font-bold">
                {counter3}
              </div>
              <div className="text-stone-600 text-[60px] ml-20 font-bold">
                {counter4}
              </div>
              <div className="text-amber-600 text-[60px] ml-20 font-bold">
                {counter5}
              </div>
              <div className="text-orange-600 text-[60px] ml-20 font-bold">
                {counter6}
              </div>
            </div>
            <div className="flex justify-end items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="bg-primary-100"
                onPress={onOpen}
              >
                <MdTableRows size={18} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="my-4 h-6 flex">
            <div className="w-4/5">
              <div className="text-xs">{description}</div>
              <div className="flex text-xl font-bold justify-between">
                <label className="text-l font-semibold">{title}</label>
              </div>
            </div>
            <div className="text-gray-400 flex justify-center">{icon}</div>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        hideCloseButton={true}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="z-50"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                <p>More Details</p>
                <div className="flex flex-row items-center">
                  <Button
                    color="transparent"
                    variant="light"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <MdClose size={30} />
                  </Button>
                </div>
              </ModalHeader>
              <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                <Table
                  id="TableToPDF"
                  isHeaderSticky={"true"}
                  layout={"fixed"}
                  removeWrapper
                  classNames={{
                    wrapper: "min-h-[222px]",
                    base: "max-h-[420px] overflow-scroll",
                  }}
                  className="h-full overflow-auto -mt-5"
                >
                  <TableHeader>
                    <TableColumn className="bg-primary-600 text-white font-bold">
                      Room Number
                    </TableColumn>
                    <TableColumn className="bg-primary-600 text-white font-bold">
                      Updated At
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {/* Table Row for Room Number */}
                    {housekeepingRooms
                      .filter((room) => room.roomStatus == formTypeCard)
                      .map((room, index) => (
                        <TableRow key={`row-${index}`}>
                          <TableCell>{room.roomNumber}</TableCell>
                          <TableCell>
                            {formatDateTime(room.updatedAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Cartao;
