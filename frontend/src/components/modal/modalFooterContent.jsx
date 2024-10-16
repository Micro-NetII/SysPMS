import React from "react";
import { ModalFooter } from "@nextui-org/react";

const ModalFooterContent = ({ criado, editado }) => {
  return (
    <ModalFooter className=" bottom-0 left-0 flex flex-row text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-xs">
      {criado && (
        <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
      )}

      {editado && criado !== editado && (
        <div>
          <p>
            Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}
          </p>
        </div>
      )}
    </ModalFooter>
  );
};

export default ModalFooterContent;
