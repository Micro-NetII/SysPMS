import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ConfirmationBox({
    buttonName,
    buttonIcon,
    buttonColor,
    style,
    disabled,
    onConfirm,
    onCancel,
    modalContent
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color={buttonColor} className={`w-fit ${style}`} isDisabled={disabled}>
                <>
                    {buttonName} {buttonIcon}
                </>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Confirmar Ação</ModalHeader>
                            <ModalBody>
                                <p>
                                    {modalContent}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => {
                                    onCancel();
                                    onClose();
                                }}>
                                    Não
                                </Button>
                                <Button color="primary" onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}>
                                    Sim
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
