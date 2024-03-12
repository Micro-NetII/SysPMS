"use client";
import React from "react";
import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Textarea,
    Divider,
    Autocomplete, AutocompleteItem,
    ScrollShadow
} from "@nextui-org/react"
import { FaExpand } from "react-icons/fa";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




const Bedrooms = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const variants = ["underlined"];
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const Tipologia = [
        { label: "Tipologia1", value: "Tipologia1", description: "" },
        { label: "Tipologia2", value: "Tipologia2", description: "" },
        { label: "Tipologia3", value: "Tipologia3", description: "" },
        { label: "Tipologia4", value: "Tipologia4", description: "" }
    ]
    const Caracteristicas = [
        { label: "Caracteristicas1", value: "Caracteristicas1", description: "" },
        { label: "Caracteristicas2", value: "Caracteristicas2", description: "" },
        { label: "Caracteristicas3", value: "Caracteristicas3", description: "" },
        { label: "Caracteristicas4", value: "Caracteristicas4", description: "" }
    ]
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    return (
        <>
            <div className="mx-5 my-5">
                <div className="flex flex-row">
                    <div className="space-y-8 flex-col w-1/2">
                        <div className="w-full flex flex-col gap-4">
                            {variants.map((variant) => (
                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Input type="Descrição" variant={variant} label="Descrição" />
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            {variants.map((variant) => (
                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Input type="Abreviatura" variant={variant} label="Abreviatura" />
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            {variants.map((variant) => (
                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 ">
                                    <Textarea
                                        label="Detalhe"
                                        disableAnimation
                                        disableAutosize
                                        className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                        variant={variant}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            {variants.map((variant) => (
                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 ">
                                    <Autocomplete
                                        variant={variant}
                                        defaultItems={Tipologia}
                                        label="Tipologia"
                                        className="w-full"
                                    >
                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>
                                </div>
                            ))}
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
                    </div>
                    <Divider className="mx-4" orientation="vertical" />

                    <div className="space-y-8 w-1/2">
                        <div className="w-full flex flex-col gap-4">
                            {variants.map((variant) => (
                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 ">
                                    <Textarea
                                        label="DEP. DE HOUSEKEEPING"
                                        disableAnimation
                                        disableAutosize
                                        className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                        variant={variant}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 max-w-full">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker />
                            </LocalizationProvider>
                            <Button size="md flex gap-4 w-full">
                                Configuração de interfaces
                            </Button>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            {variants.map((variant) => (
                                <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Autocomplete
                                        variant={variant}
                                        defaultItems={Caracteristicas}
                                        label="Caracteristicas"
                                        className="w-full"
                                    >
                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <Divider className="mx-4" orientation="vertical" />
                <div className="space-y-8 w-full">
                </div>
            </div>
            <Button className="max-w-fit" onPress={onOpen}>
                Inserir Quarto
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
            >
                <ModalContent className="max-w-[500px] max-h-[650px]">

                    {(onClose) => (
                        <>
                            <div className="flex justify-end items-center">
                                <a onClick={toggleFullScreen} className="cursor-pointer text-black hover:text-bold py-2 px-4 flex items-center">
                                    <FaExpand className="mt-1 justify-end" />
                                    <span className="ml-1 hidden sm:block mx-5"></span>
                                </a>
                            </div>
                            <ModalHeader>Inserir Quarto</ModalHeader>
                            <ModalBody>
                                <ScrollShadow hideScrollBar className="h-[450px]">
                                    <div className="w-full flex flex-col gap-5 mb-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Descrição" variant={variant} label="Descrição" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Abreviatura" variant={variant} label="Abreviatura" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200  "
                                            >
                                                <Textarea
                                                    label="Detalhe"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                    variant={variant}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant={variant}
                                                    defaultItems={Tipologia}
                                                    label="Tipologia"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between mb-4">
                                        <div className="flex flex-col w-1/2">
                                            <p className="text-sm">Ocupação Máxima</p>
                                            <p className="text-xl">1</p>
                                        </div>
                                        <div className="flex flex-col w-1/2">
                                            <p className="text-sm">Ordem</p>
                                            <p className="text-xl">1</p>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div
                                                key={variant}
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 "
                                            >
                                                <Textarea
                                                    label="DEP. DE HOUSEKEEPING"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                                    variant={variant}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 items-center max-w-full mb-4">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker />
                                        </LocalizationProvider>
                                        <Button size="md">
                                            Configuração de interfaces
                                        </Button>
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant={variant}
                                                    defaultItems={Caracteristicas}
                                                    label="Caracteristicas"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollShadow>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Bedrooms;
