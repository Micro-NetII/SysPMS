"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { ageConfigEdit } from "@/components/functionsForm/CRUD/cardex/ageConfig/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";
import { expansion } from "@/components/functionsForm/expansion/page";
import ModalFooterContent from "@/components/modal/modalFooterContent";
import { useTranslations } from "next-intl";

const AgeConfigForm = ({
  idAgeConfig,
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
  editor,
}) => {
  const t = useTranslations("Index"); // Fetch translations
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { handleUpdateAgeConfig, setValuesAgeConfig, valuesAgeConfig } =
    ageConfigEdit(idAgeConfig);

  const { toggleExpand, setIsExpanded, isExpanded } = expansion();

  return (
    <>
      {formTypeModal === 12 && (
        <>
          <Button
            fullWidth={true}
            size="md"
            onPress={onOpen}
            color={buttonColor}
            className="-h-3 flex justify-start -p-3"
          >
            {buttonName} {buttonIcon}
          </Button>
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
                <form onSubmit={(e) => handleUpdateAgeConfig(e)}>
                  <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                    <div className="flex flex-row justify-start gap-4">
                      {editIcon} {t("modalEditHeader")} {modalEditArrow}{" "}
                      {modalEdit}
                    </div>
                    <div className="flex flex-row items-center">
                      <Button
                        color="transparent"
                        onClick={() => {
                          onClose();
                          window.location.reload();
                        }}
                        className="-mr-5"
                        type="submit"
                      >
                        <TfiSave size={25} />
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
                  <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                    <InputFieldControlled
                      type={"text"}
                      id={"description"}
                      name={"Description"}
                      label={t("cardex.ageConfig.new.labelDescription")}
                      ariaLabel={t("cardex.ageConfig.new.labelDescription")}
                      value={valuesAgeConfig.Description}
                      onChange={(e) =>
                        setValuesAgeConfig({
                          ...valuesAgeConfig,
                          Description: e.target.value,
                        })
                      }
                    />
                  </ModalBody>
                  <ModalFooterContent editado={editado} />
                </form>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default AgeConfigForm;
