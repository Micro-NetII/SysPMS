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

import { expansion } from "@/components/functionsForm/expansion/page";

import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import ratesPlannerInsert from "@/components/functionsForm/CRUD/priceManagent/ratesPlanner/page";

import { useTranslations } from "next-intl";

const preModal = ({
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
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { toggleExpand, setIsExpanded, isExpanded } = expansion();

  const { handleSubmitRatesPlanner, handleInputRatesPlanner } =
    ratesPlannerInsert(startDate, endDate, room, tipology);

  const t = useTranslations("Index");

  return (
    <>
      {formTypeModal === 0 && ( //reservations insert
        <>
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
                      <div className="fixed top-0 right-0 bg-lightBlue h-screen w-[22%] z-10">
                        <div
                          className="mt-20"
                          style={{
                            maxHeight: "calc(100% - 8rem)",
                            overflowY: "auto",
                          }}
                        >
                          <p className="text-xs text-gray-500 px-4">
                            {t("frontOffice.plans.modals.reservationDetails")}
                          </p>
                          {selectedDates.map((dateRange, index) => (
                            <div
                              className={`bg-white border border-gray-300 text-sm px-4 py-1 rounded-lg mt-4 mx-2 ${
                                index === selectedDates.length - 1
                                  ? "mb-10"
                                  : ""
                              }`}
                              key={index}
                            >
                              <div className="flex flex-row items-center justify-between border-b-3 border-gray py-2">
                                <div className="flex flex-row items-center gap-4">
                                  <FaBed className="" size={25} color="gray" />
                                  <p className="text-ml">
                                    {dateRange.roomLabel}
                                  </p>
                                </div>
                                <div>
                                  <FaRegTrashAlt
                                    className="cursor-pointer"
                                    size={15}
                                    color={"gray"}
                                    onClick={() => removeEvent(index)}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-row justify-around py-1">
                                <div className="flex flex-col gap-2">
                                  <label>
                                    {t(
                                      "frontOffice.frontDesk.bookings.filters.from"
                                    )}
                                  </label>
                                  <input
                                    className="outline-none"
                                    type="date"
                                    value={dateRange.start}
                                    onChange={(e) =>
                                      updateDateRange(
                                        index,
                                        "start",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <label>
                                    {t(
                                      "frontOffice.frontDesk.bookings.filters.to"
                                    )}
                                  </label>
                                  <input
                                    className="outline-none"
                                    type="date"
                                    value={dateRange.end}
                                    onChange={(e) =>
                                      updateDateRange(
                                        index,
                                        "end",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              {["p1", "p2", "p4", "p5", "p6"].map(
                                (pax, idx) => (
                                  <div className="flex flex-col mt-4" key={idx}>
                                    <InputFieldControlled
                                      type={"text"}
                                      id={pax}
                                      name={pax}
                                      label={`Pax.${pax.charAt(1)}`}
                                      style={"w-30 outline-none h-10"}
                                      value={paxValues[pax]}
                                      onChange={(e) =>
                                        handleInputChange(e, pax)
                                      }
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="absolute bottom-0 w-full flex justify-center gap-40 p-4 bg-lightBlue">
                          <PriceForm
                            formTypeModal={0}
                            buttonName={t("frontOffice.plans.modals.reserve")}
                            //buttonIcon={<FiPlus size={15} />}
                            // editIcon={<FaCalendarAlt size={25} color="white" />}
                            buttonColor={"primary"}
                            modalHeader={t(
                              "frontOffice.ratesPlanner.modal.ratesPlannerHeader"
                            )}
                            startDate={`${startDate}`}
                            room={`${roomID}`}
                            endDate={`${endDate}`}
                            tipology={`${typologyID}`}
                            selectedDates={selectedDates}
                            selectedRoomType={selectedRoomType}
                            paxValues={paxValues}
                          />
                          <button
                            className="text-sm"
                            onClick={handleToggleModal}
                          >
                            {t("frontOffice.plans.modals.cancel")}
                          </button>
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

export default preModal;
