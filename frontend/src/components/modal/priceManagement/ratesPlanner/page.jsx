"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Tabs,
  Tab,
} from "@nextui-org/react";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";

import { expansion } from "@/components/functionsForm/expansion/page";

import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import ratesPlannerInsert from "@/components/functionsForm/CRUD/priceManagent/ratesPlanner/page";
import ConfirmationBox from "@/components/modal/confirmationBox/page";

import { useTranslations } from "next-intl";
import HeaderAutocompleteNoFilter from "@/components/functionsForm/autocomplete/HeaderAutocompleteNoFilter/page";

const priceForm = ({
  buttonName,
  buttonIcon,
  style,
  modalHeader,
  editIcon,
  modalEditArrow,
  modalEdit,
  formTypeModal,
  buttonColor,
  startDate,
  endDate,
  room,
  tipology,
  selectedDates, // Recebendo selectedDates como prop
  disabled,
  header,
  paxValues,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { toggleExpand, setIsExpanded, isExpanded } = expansion();

  const {
    handleSubmitRatesPlanner,
    handleInputRatesPlanner,
    handleCancel,
    handleConfirm,
    handleHeaderChangeNoFilter,
  } = ratesPlannerInsert(startDate, endDate, room, tipology, header);

  const t = useTranslations("Index");

  return (
    <>
      {formTypeModal === 0 && ( //reservations insert
        <>
          <Button
            onPress={onOpen}
            color={buttonColor}
            className={`w-fit ${style}`}
            isDisabled={disabled}
          >
            {buttonName} {buttonIcon}
          </Button>
          <Modal
            classNames={{
              base: "max-h-screen",
              wrapper: isExpanded
                ? "w-full h-screen"
                : "lg:pl-72 h-screen w-full",
              body: "h-full",
            }}
            size="full"
            className="bg-neutral-100"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmitRatesPlanner}>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                      <div className="flex flex-row justify-start gap-4">
                        {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                      </div>
                      <div className="flex flex-row items-center mr-5">
                        <Button
                          color="transparent"
                          onPress={onClose}
                          className="-mr-5"
                          type="submit"
                        >
                          <TfiSave size={25} />
                        </Button>
                        <Button
                          color="transparent"
                          className="-mr-5"
                          onClick={toggleExpand}
                        >
                          <LiaExpandSolid size={30} />
                        </Button>
                        <Button
                          color="transparent"
                          variant="light"
                          onClick={() => {
                            onClose();
                            window.location.reload();
                          }}
                        >
                          <MdClose size={30} />
                        </Button>
                      </div>
                    </ModalHeader>
                    <ModalBody
                      className="flex flex-col mx-5 my-5 space-y-8 overflow-y-auto"
                      style={{ maxHeight: "80vh" }}
                    >
                      {selectedDates.map((dateRange, index) => (
                        <div key={index} className="flex flex-row gap-4">
                          <HeaderAutocompleteNoFilter
                            style={"mx-2"}
                            label={t(
                              "priceManagement.priceTable.priceDescriptionHeader"
                            )}
                            onChange={(value) =>
                              handleHeaderChangeNoFilter(value)
                            }
                            placeholder={header}
                          />
                          <InputFieldControlled
                            type={"date"}
                            id={"validFrom"}
                            name={"validFrom"}
                            label={"From:"}
                            style={"w-30 outline-none h-10"}
                            value={dateRange.start}
                            onChange={handleInputRatesPlanner}
                          />
                          <InputFieldControlled
                            type={"date"}
                            id={"validUntil"}
                            name={"validUntil"}
                            label={"To:"}
                            style={"w-30 outline-none h-10"}
                            value={dateRange.end}
                            onChange={handleInputRatesPlanner}
                          />
                          <InputFieldControlled
                            type={"text"}
                            id={"roomID"}
                            disabled={true}
                            name={"room"}
                            label={"Room ID"}
                            style={"w-30 outline-none h-10"}
                            value={dateRange.room ? dateRange.room : ""}
                            onChange={handleInputRatesPlanner}
                          />
                          <InputFieldControlled
                            type={"text"}
                            id={"tipology"}
                            disabled={true}
                            name={"tipology"}
                            label={"Typology ID"}
                            style={"w-30 outline-none h-10"}
                            value={dateRange.tipology}
                            onChange={handleInputRatesPlanner}
                          />
                        </div>
                      ))}

                      <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4">
                          <InputFieldControlled
                            type={"text"}
                            id={"p1"}
                            name={"p1"}
                            label={"Pax.1"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />

                          <InputFieldControlled
                            type={"text"}
                            id={"p2"}
                            name={"p2"}
                            label={"Pax.2"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />

                          <InputFieldControlled
                            type={"text"}
                            id={"p3"}
                            name={"p3"}
                            label={"Pax.3"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />
                        </div>

                        <div className="flex flex-row gap-4">
                          <InputFieldControlled
                            type={"text"}
                            id={"p4"}
                            name={"p4"}
                            label={"Pax.4"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />

                          <InputFieldControlled
                            type={"text"}
                            id={"p5"}
                            name={"p5"}
                            label={"Pax.5"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />

                          <InputFieldControlled
                            type={"text"}
                            id={"p6"}
                            name={"p6"}
                            label={"Pax.6"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />
                        </div>
                        <div className="flex flex-row gap-4">
                          <InputFieldControlled
                            type={"text"}
                            id={"child1"}
                            name={"child1"}
                            label={"Child 1"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />
                          <InputFieldControlled
                            type={"text"}
                            id={"child2"}
                            name={"child2"}
                            label={"Child 2"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />
                          <InputFieldControlled
                            type={"text"}
                            id={"child3"}
                            name={"child3"}
                            label={"Child 3"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />
                          <InputFieldControlled
                            type={"text"}
                            id={"child4"}
                            name={"child4"}
                            label={"Child 4"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />
                        </div>
                        <div className="flex flex-row gap-4">
                          <InputFieldControlled
                            type={"text"}
                            id={"extraBed"}
                            name={"extraBed"}
                            label={"Extra Bed"}
                            style={"w-30 outline-none h-10"}
                            onChange={handleInputRatesPlanner}
                          />
                          <ConfirmationBox
                            buttonIcon={
                              <AiFillThunderbolt
                                className="cursor-pointer"
                                size={15}
                                color="blue"
                              />
                            }
                            buttonColor={"transparent"}
                            modalContent={
                              "Tem a certeza de que deseja aplicar o preço desta tipologia a todos os quartos relacionados?"
                            }
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                          />
                        </div>
                      </div>
                    </ModalBody>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default priceForm;
