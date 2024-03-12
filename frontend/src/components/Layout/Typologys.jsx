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
    Autocomplete, AutocompleteItem,
    ScrollShadow
} from "@nextui-org/react"
import { FaExpand } from "react-icons/fa";


const Typology = () => {
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
            <Button className="max-w-fit" onPress={onOpen}>
                Inserir Tipologia
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
            >
                <ModalContent className="max-w-[500px] max-h-[600px]">

                    {(onClose) => (
                        <>
                            <div className="flex justify-end items-center">
                                <a onClick={toggleFullScreen} className="cursor-pointer text-black hover:text-bold py-2 px-4 flex items-center">
                                    <FaExpand className="mt-1 justify-end" />
                                    <span className="ml-1 hidden sm:block mx-5"></span>
                                </a>
                            </div>
                            <ModalHeader>Inserir Tipologia</ModalHeader>
                            <ModalBody>
                                <ScrollShadow hideScrollBar className="h-[400px]">
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
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 "
                                            >
                                                <Textarea
                                                    label="Detalhe"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs ", input: "resize-y min-h-[40px]" }}
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
                                                    label=" Grupo Tipologia"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-4 mb-4">
                                        {variants.map((variant) => (
                                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant={variant}
                                                    defaultItems={Caracteristicas}
                                                    label="Função"
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

export default Typology;
