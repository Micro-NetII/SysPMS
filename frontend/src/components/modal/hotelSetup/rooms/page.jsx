"use client"
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from 'axios';
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import roomsInsert, { roomsEdit } from "@/components/functionsForm/CRUD/hotel/rooms/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";

import CaracteristicsAutocomplete from "@/components/functionsForm/autocomplete/caracteristic/page";
import TipologyAutocomplete from "@/components/functionsForm/autocomplete/tipology/page";


const roomForm = ({
    idRoom,
    idRoomType,
    buttonName,
    buttonIcon,
    modalHeader,
    editIcon,
    modalEditArrow,
    modalEdit,
    formTypeModal,
    buttonColor,
    criado,
    editado,
    editor
}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { handleInputRoom, handleSubmitRoom, handleCaracteristicSelect, handleTipologySelect } = roomsInsert();
    const { handleUpdateRoom, setValuesRoom, valuesRoom } = roomsEdit(idRoom, idRoomType);

    const { toggleExpand, setIsExpanded, isExpanded } = expansion();

    return (
        <>

            {formTypeModal === 11 && ( //rooms insert
                <>
                    <Button onPress={onOpen} color={buttonColor} className="w-fit">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        classNames={{
                            base: "max-h-screen",
                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                            body: "h-full",
                        }}
                        size="full"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} scrollBehavior="inside">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmitRoom}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            {modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Description"}
                                                label={"Descrição"}
                                                ariaLabel={"Descrição"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoom} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Label"}
                                                label={"Abreviatura"}
                                                ariaLabel={"Abreviatura"}
                                                style={"w-full outline-none h-10"}
                                                onChange={handleInputRoom} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"roomType"}
                                                name={"RoomType"}
                                                label={"Tipo de Quarto"}
                                                ariaLabel={"Tipo de Quarto"}
                                                style={"w-full outline-none h-10"} />

                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <TipologyAutocomplete
                                                        label={"Tipologias"}
                                                        style={""}
                                                        onChange={(value) => handleTipologySelect(value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row justify-between">
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ocupação Máxima</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ordem</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                            </div>

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"depHousekeeping"}
                                                name={"depHousekeeping"}
                                                label={"DEP. DE HOUSEKEEPING"}
                                                style={"w-full outline-none h-10"}

                                                ariaLabel={"Departamento de limpeza"} />

                                            <div className="flex gap-4 items-center max-w-xs">
                                                <Button size="md">
                                                    Configuração de interfaces
                                                </Button>
                                            </div>

                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <CaracteristicsAutocomplete
                                                        label={"Caracteristica"}
                                                        style={""}
                                                        onChange={(value) => handleCaracteristicSelect(value)}
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

            {formTypeModal === 12 && ( //rooms edit
                <>
                    <Button fullWidth={true} size="md" onPress={onOpen} color={buttonColor} className="-h-3 flex justify-start -p-3">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        classNames={{
                            base: "max-h-screen",
                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                            body: "h-full",
                        }}
                        size="full"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={(e) => handleUpdateRoom(e)}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            <div className="flex flex-row justify-start gap-4">
                                                {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                            </div>
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                            <InputFieldControlled
                                                type={"text"}
                                                id={"description"}
                                                name={"Description"}
                                                label={"Descrição"}
                                                ariaLabel={"Descrição"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesRoom.Description}
                                                onChange={e => setValuesRoom({ ...valuesRoom, Description: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"abreviature"}
                                                name={"Label"}
                                                label={"Abreviatura"}
                                                ariaLabel={"Abreviatura"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesRoom.Label}
                                                onChange={e => setValuesRoom({ ...valuesRoom, Label: e.target.value })} />

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"roomType"}
                                                name={"RoomType"}
                                                label={"Tipo de Quarto"}
                                                ariaLabel={"Tipo de Quarto"}
                                                style={"w-full outline-none h-10"}
                                                value={valuesRoom.RoomType}
                                                onChange={e => setValuesRoom({ ...valuesRoom, RoomType: e.target.value })} />

                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <TipologyAutocomplete
                                                        label={"Tipologias"}
                                                        style={""}
                                                        onChange={(value) => handleTipologySelect(value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row justify-between">
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ocupação Máxima</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                                <div className="flex flex-col w-1/2">
                                                    <p className="text-sm">Ordem</p>
                                                    <p className="text-xl">1</p>
                                                </div>
                                            </div>

                                            <InputFieldControlled
                                                type={"text"}
                                                id={"depHousekeeping"}
                                                name={"depHousekeeping"}
                                                label={"DEP. DE HOUSEKEEPING"}
                                                style={"w-full outline-none h-10"}
                                                ariaLabel={"Departamento de limpeza"} />

                                            <div className="flex gap-4 items-center max-w-xs">
                                                <Button size="md">
                                                    Configuração de interfaces
                                                </Button>
                                            </div>

                                            <div className="w-full flex flex-col gap-4">

                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <CaracteristicsAutocomplete
                                                        label={"Caracteristica"}
                                                        style={""}
                                                        onChange={(value) => handleCaracteristicSelect(value)}
                                                    />
                                                </div>
                                            </div>
                                        </ModalBody>
                                    </form>
                                    <ModalFooterContent criado={criado} editado={editado} />
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

        </>
    );
};

export default roomForm;