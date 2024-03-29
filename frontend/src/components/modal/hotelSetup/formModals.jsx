"use client"
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Autocomplete, Divider, AutocompleteItem, ScrollShadow } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { usePathname } from "next/navigation";
//imports de icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { RxExit } from "react-icons/rx";
import { MdClose } from "react-icons/md";


/*
os modals encontram-se identificados por numeros de 2 digitos, sendo o ultimo digito um indicador de modal ou full screen:
0 - mmodal
1 - full screen (inserir)
2 - full screen (editar)
(REMOVER AO CONCLUIR O PROJETO)
*/

const formModals = ({ idCarateristics, idRoomtype, idMaintenance, idTypesgroups,
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
    editor }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();


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

    //inserção na tabela carateristicas
    const [caracteristica, setCaracteristica] = useState({
        Description: '',
        Abreviature: '',
        Details: ''
    })

    const handleInput = (event) => {
        setCaracteristica({ ...caracteristica, [event.target.name]: event.target.value })
    }
    function handleSubmit(event) {
        event.preventDefault()
        if (!caracteristica.Description || !caracteristica.Abreviature || !caracteristica.Details) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/hotel/caracteristicas', {
            data: {
                description: caracteristica.Description,
                abreviature: caracteristica.Abreviature,
                details: caracteristica.Details
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    //edição na tabela carateristicas
    const [values, setValues] = useState({
        id: idCarateristics,
        Description: '',
        Abreviature: '',
        Details: ''
    })

    useEffect(() => {
        axios.get("/api/v1/hotel/caracteristicas/" + idCarateristics)
            .then(res => {
                setValues({ ...values, Description: res.data.response.description, Abreviature: res.data.response.abreviature, Details: res.data.response.details })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdate(e) {
        e.preventDefault()
        axios.patch(`/api/v1/hotel/caracteristicas/` + idCarateristics, {
            data: {
                description: values.Description,
                abreviature: values.Abreviature,
                details: values.Details
            }
        })
            .catch(err => console.log(err))
    }


    //inserção na tabela roomtypes
    const [roomTypeState, setRoomTypeState] = useState({
        Name: '',
        Desc: '',
        RoomFeaturesDesc: ''
    })

    const handleInputRoomtype = (event) => {
        setRoomTypeState({ ...roomTypeState, [event.target.name]: event.target.value })
    }
    function handleSubmitRoomtype(event) {
        event.preventDefault()
        if (!roomTypeState.Name || !roomTypeState.Desc || !roomTypeState.RoomFeaturesDesc ) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/hotel/tipologys', {
            data: {
                name: roomTypeState.Name,
                desc: roomTypeState.Desc,
                roomFeaturesDesc: roomTypeState.RoomFeaturesDesc
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    //edição na tabela roomtypes
    const [valuesRoomtype, setValuesRoomtype] = useState({
        id: idRoomtype,
        Desc: '',
        Name: '',
        RoomFeaturesDesc: '',
        GroupID: '',
        RoomTypePlan: ''
    })

    useEffect(() => {
        axios.get("/api/v1/hotel/tipologys/" + idRoomtype)
            .then(res => {
                setValuesRoomtype({ ...valuesRoomtype, Desc: res.data.response.desc, Name: res.data.response.name, RoomFeaturesDesc: res.data.response.roomFeaturesDesc, GroupID: res.data.response.groupID, RoomTypePlan: res.data.response.roomTypePlan })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateRoomtype(e) {
        e.preventDefault()
        axios.patch(`/api/v1/hotel/tipologys/` + idRoomtype, {
            data: {
                desc: valuesRoomtype.Desc,
                name: valuesRoomtype.Name,
                roomFeaturesDesc: valuesRoomtype.RoomFeaturesDesc,
                groupID: valuesRoomtype.GroupID,
                roomTypePlan: valuesRoomtype.RoomTypePlan
            }
        })
            .catch(err => console.log(err))
    }

    //inserção na tabela maintenance
    const [maintenance, setMaintenance] = useState({
        Abreviature: '',
        Details: '',
        Description: ''
    })

    const handleInputMaintenance = (event) => {
        setMaintenance({ ...maintenance, [event.target.name]: event.target.value })
    }
    function handleSubmitMaintenance(event) {
        event.preventDefault()
        if (!maintenance.Abreviature || !maintenance.Details || !maintenance.Description ) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/hotel/maintenance', {
            data: {
                abreviature: maintenance.Abreviature,
                details: maintenance.Details,
                description: maintenance.Description,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    //edição na tabela maintenance
    const [valuesMaintenance, setValuesMaintenance] = useState({
        id: idMaintenance,
        Abreviature: '',
        Details: '',
        Description: ''
    })

    useEffect(() => {
        axios.get("/api/v1/hotel/maintenance/" + idMaintenance)
            .then(res => {
                setValuesMaintenance({ ...valuesMaintenance, Abreviature: res.data.response.abreviature, Details: res.data.response.details, Description: res.data.response.description})
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateMaintenance(e) {
        e.preventDefault()
        axios.patch(`/api/v1/hotel/maintenance/` + idMaintenance, {
            data: {
                abreviature: valuesMaintenance.Abreviature,
                details: valuesMaintenance.Details,
                description: valuesMaintenance.Description
            }
        })
            .catch(err => console.log(err))
    }


    //inserção na tabela tipology group
    const [roomtypesgroups, setRoomtypesgroups] = useState({
        Label: '',
    })

    const handleInputTypesgroups = (event) => {
        setRoomtypesgroups({ ...roomtypesgroups, [event.target.name]: event.target.value })
    }
    function handleSubmitTypesgroups(event) {
        event.preventDefault()
        if (!roomtypesgroups.Label ) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/hotel/tipologyGroup', {
            data: {
                label: roomtypesgroups.Label,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    //edição na tabela tipology group
    const [valuesTypesgroups, setValuesTypesGroups] = useState({
        id: idTypesgroups,
        Label: '',
    })

    useEffect(() => {
        axios.get("/api/v1/hotel/tipologyGroup/" + idTypesgroups)
            .then(res => {
                setValuesTypesGroups({ ...valuesTypesgroups, Label: res.data.response.label})
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateTypesgroups(e) {
        e.preventDefault()
        axios.patch(`/api/v1/hotel/tipologyGroup/` + idTypesgroups, {
            data: {
                label: valuesTypesgroups.Label,
            }
        })
            .catch(err => console.log(err))
    }


    //expanção do ecra no form
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <>

            {formTypeModal === 10 && ( //tipology group modal
                <>
                    <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} className="z-50">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <ModalHeader className="flex flex-col gap-1 uppercase">{modalHeader}</ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <input type="text" placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <textarea type="textarea" placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
                                            <div>
                                                <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ativo (estado).</label>
                                            </div>
                                            <input type="text" placeholder="Ordem" className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">------------</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Fechar
                                            </Button>
                                            <Button color="primary" onPress={onClose}>
                                                Teste
                                            </Button>
                                        </ModalFooter>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
            {formTypeModal === 11 && ( //tipology group insert
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                    <form onSubmit={handleSubmitTypesgroups}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <input type="text" name="Label" onChange={handleInputTypesgroups} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <textarea type="textarea" placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
                                            <div>
                                                <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ativo (estado).</label>
                                            </div>
                                            <input type="text" placeholder="Ordem" className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                                <option value="0">------------</option>
                                                <option value="1">Teste de opções</option>
                                                <option value="2">Teste de opções</option>
                                            </select>
                                        </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //tipology group edit
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
                                <form onSubmit={(e) => handleUpdateTypesgroups(e)}>
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
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        <input type="text" placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                        <input type="text" value={valuesTypesgroups.Label} onChange={e => setValuesTypesGroups({ ...valuesTypesgroups, Label: e.target.value })} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                        <textarea type="textarea" placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
                                        <div>
                                            <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ativo (estado).</label>
                                        </div>
                                        <input type="text" placeholder="Ordem" className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                        <select className="w-1/2 bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4">
                                            <option value="0">------------</option>
                                            <option value="1">Teste de opções</option>
                                            <option value="2">Teste de opções</option>
                                        </select>
                                    </ModalBody>
                                    </form>
                                    <ModalFooter className="absolute bottom-0 left-0 flex flex-col text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-sm">
                                        <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
                                        {criado !== editado && (
                                            <div>
                                                <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                                            </div>
                                        )}
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 20 && ( //rooms modal
                <>
                    <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
                        {buttonName}
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="">{modalHeader}</ModalHeader>
                                    <ModalBody>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Descrição" variant="underlined" label="Descrição" />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Abreviatura" variant="underlined" label="Abreviatura" />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                            >
                                                <Textarea
                                                    label="Detalhe"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                    variant="underlined"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">

                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant="underlined"
                                                    defaultItems={Tipologia}
                                                    label="Tipologia"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
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
                                        <div className="w-full flex flex-col gap-4">

                                            <div

                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                            >
                                                <Textarea
                                                    label="DEP. DE HOUSEKEEPING"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                                    variant="underlined"
                                                />
                                            </div>

                                        </div>
                                        <div className="flex gap-4 items-center max-w-xs">
                                            <Button size="md">
                                                Configuração de interfaces
                                            </Button>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">

                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant="underlined"
                                                    defaultItems={Caracteristicas}
                                                    label="Caracteristicas"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>

                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Submeter
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 21 && ( //rooms insert
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Descrição" variant="underlined" label="Descrição" />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="Abreviatura" variant="underlined" label="Abreviatura" />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                            >
                                                <Textarea
                                                    label="Detalhe"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                    variant="underlined"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant="underlined"
                                                    defaultItems={Tipologia}
                                                    label="Tipologia"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
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
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                            >
                                                <Textarea
                                                    label="DEP. DE HOUSEKEEPING"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                                    variant="underlined"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center max-w-xs">
                                            <Button size="md">
                                                Configuração de interfaces
                                            </Button>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant="underlined"
                                                    defaultItems={Caracteristicas}
                                                    label="Caracteristicas"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>
                                        </div>
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 22 && ( //rooms edit
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
                                    <ModalBody>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="text" variant="underlined" label="Descrição" />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                            >
                                                <Input type="text" variant="underlined" label="Abreviatura" />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                            >
                                                <Textarea
                                                    label="Detalhe"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[40px]" }}
                                                    variant="underlined"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete

                                                    defaultItems={Tipologia}
                                                    label="Tipologia"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
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
                                        <div className="w-full flex flex-col gap-4">
                                            <div
                                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                            >
                                                <Textarea
                                                    label="DEP. DE HOUSEKEEPING"
                                                    disableAnimation
                                                    disableAutosize
                                                    className={{ base: "max-w-xs", input: "resize-y min-h-[10px]" }}
                                                    variant="underlined"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center max-w-xs">
                                            <Button size="md">
                                                Configuração de interfaces
                                            </Button>
                                        </div>
                                        <div className="w-full flex flex-col gap-4">

                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    variant="underlined"
                                                    defaultItems={Caracteristicas}
                                                    label="Caracteristicas"
                                                    className="w-full"
                                                >
                                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                </Autocomplete>
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter className="absolute bottom-0 left-0 flex flex-col text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-sm">
                                        <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
                                        {criado !== editado && (
                                            <div>
                                                <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                                            </div>
                                        )}
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}


            {formTypeModal === 30 && ( //characteristics modal
                <>
                    <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <>
                                        <ModalHeader className="flex flex-col gap-1 uppercase">{modalHeader}</ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" placeholder="Descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <input type="text" placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <textarea type="textarea" placeholder="Detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Fechar
                                            </Button>
                                            <Button color="primary" onPress={onClose}>
                                                Teste
                                            </Button>
                                        </ModalFooter>
                                    </>
                                </>

                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 31 && ( //characteristics insert
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <Input type="text" name="Abreviature" onChange={handleInput} variant="underlined" label="Abreviatura" />
                                            <Input type="text" name="Description" onChange={handleInput} variant="underlined" label="Descrição" />
                                            <Input type="textarea" name="Details" onChange={handleInput} variant="underlined" label="Detalhe" />
                                        </ModalBody>
                                    </form>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 32 && ( //characteristics edit
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
                                    <form onSubmit={(e) => handleUpdate(e)}>
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
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <input type="text" value={values.Description} onChange={e => setValues({ ...values, Description: e.target.value })} placeholder="Descrição" aria-label="descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <input type="text" value={values.Abreviature} onChange={e => setValues({ ...values, Abreviature: e.target.value })} placeholder="Abreviatura" aria-label="abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <textarea type="textarea" value={values.Details} onChange={e => setValues({ ...values, Details: e.target.value })} placeholder="Detalhe" aria-label="detalhe" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></textarea>
                                        </ModalBody>
                                    </form>
                                    <ModalFooter className="absolute bottom-0 left-0 flex flex-col text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-sm">
                                        <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
                                        {criado !== editado && (
                                            <div>
                                                <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                                            </div>
                                        )}
                                    </ModalFooter>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 40 && ( //tipology modal
                <>
                    <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
                        {buttonName}
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 uppercase">{modalHeader}</ModalHeader>
                                    <ModalBody>
                                        <ScrollShadow hideScrollBar className="h-[400px]">
                                            <div className="w-full flex flex-col gap-5 mb-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" variant="underlined" label="Descrição" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" variant="underlined" label="Abreviatura" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 "
                                                >
                                                    <Textarea
                                                        label="Detalhe"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs ", input: "resize-y min-h-[40px]" }}
                                                        variant="underlined"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Tipologia}
                                                        label=" Grupo Tipologia"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Caracteristicas}
                                                        label="Função"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                        </ScrollShadow>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Submeter
                                        </Button>
                                    </ModalFooter>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 41 && ( //tipology insert
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                <form onSubmit={handleSubmitRoomtype}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody>
                                        <ScrollShadow hideScrollBar className="h-[400px]">
                                            <div className="w-full flex flex-col gap-5 mb-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" variant="underlined" name="Desc" onChange={handleInputRoomtype} label="Descrição" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" variant="underlined" name="Name" onChange={handleInputRoomtype} label="Abreviatura" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 "
                                                >
                                                    <Textarea
                                                        label="Detalhe"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs ", input: "resize-y min-h-[40px]" }}
                                                        variant="underlined"
                                                        name="RoomFeaturesDesc" onChange={handleInputRoomtype}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Tipologia}
                                                        label=" Grupo Tipologia"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Caracteristicas}
                                                        label="Função"
                                                        className="w-full"
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                        </ScrollShadow>
                                    </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 42 && ( //tipology edit
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
                                <form onSubmit={(e) => handleUpdateRoomtype(e)}>
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
                                    <ModalBody>
                                        <ScrollShadow hideScrollBar className="h-[400px]">
                                            <div className="w-full flex flex-col gap-5 mb-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" value={valuesRoomtype.Desc} onChange={e => setValuesRoomtype({ ...valuesRoomtype, Desc: e.target.value })} variant="underlined" label="Descrição" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" value={valuesRoomtype.Name} onChange={e => setValuesRoomtype({ ...valuesRoomtype, Name: e.target.value })} variant="underlined" label="Abreviatura" />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-200 "
                                                >
                                                    <Textarea
                                                        label="Detalhe"
                                                        disableAnimation
                                                        disableAutosize
                                                        className={{ base: "max-w-xs ", input: "resize-y min-h-[40px]" }}
                                                        variant="underlined"
                                                        value={valuesRoomtype.RoomFeaturesDesc} onChange={e => setValuesRoomtype({ ...valuesRoomtype, RoomFeaturesDesc: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Tipologia}
                                                        label=" Grupo Tipologia"
                                                        className="w-full"
                                                        value={valuesRoomtype.GroupID} onChange={e => setValuesRoomtype({ ...valuesRoomtype, GroupID: e.target.value })}
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4 mb-4">
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                    <Autocomplete
                                                        variant="underlined"
                                                        defaultItems={Caracteristicas}
                                                        label="Função"
                                                        className="w-full"
                                                        value={valuesRoomtype.RoomTypePlan} onChange={e => setValuesRoomtype({ ...valuesRoomtype, RoomTypePlan: e.target.value })}
                                                    >
                                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                        </ScrollShadow>
                                    </ModalBody>
                                    </form>
                                    <ModalFooter className="absolute bottom-0 left-0 flex flex-col text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-sm">
                                        <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
                                        {criado !== editado && (
                                            <div>
                                                <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                                            </div>
                                        )}
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 50 && ( //Maintenance modal
                <>
                    <Button onPress={onOpen} color="bg-primary-100" className="w-fit">
                        {buttonName}
                    </Button>

                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 uppercase">
                                        {modalHeader}
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        <div className="flex flex-row items-center">
                                            <input
                                                type="text"
                                                placeholder="Descrição"
                                                className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                                            />
                                            <AiOutlineGlobal className="ml-auto text-xl" />{" "}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Abreviatura"
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                                        />
                                        <textarea
                                            type="textarea"
                                            placeholder="Detalhe"
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"
                                        ></textarea>
                                        <div>
                                            <input
                                                id="link-checkbox"
                                                type="checkbox"
                                                value=""
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            ></input>
                                            <label
                                                for="link-checkbox"
                                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Estado
                                            </label>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Submeter
                                        </Button>
                                    </ModalFooter>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}


            {formTypeModal === 51 && ( //Maintenance insert
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                <form onSubmit={handleSubmitMaintenance}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        <div className="flex flex-row items-center">
                                            <input
                                                type="text"
                                                placeholder="Descrição"
                                                className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                                                name="Description" onChange={handleInputMaintenance}
                                            />
                                            <AiOutlineGlobal className="ml-auto text-xl" />{" "}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Abreviatura"
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                                            name="Abreviature" onChange={handleInputMaintenance}
                                        />
                                        <textarea
                                            type="textarea"
                                            placeholder="Detalhe"
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"
                                            name="Details" onChange={handleInputMaintenance}
                                        ></textarea>
                                        <div>
                                            <input
                                                id="link-checkbox"
                                                type="checkbox"
                                                value=""
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            ></input>
                                            <label
                                                for="link-checkbox"
                                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Estado
                                            </label>
                                        </div>
                                    </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}


            {formTypeModal === 52 && ( //Maintenance edit
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
                                <form onSubmit={(e) => handleUpdateMaintenance(e)}>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                            <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        <div className="flex flex-row items-center">
                                            <input
                                                type="text"
                                                placeholder="Descrição"
                                                className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                                                value={valuesMaintenance.Description} onChange={e => setValuesMaintenance({ ...valuesMaintenance, Description: e.target.value })}
                                            />
                                            <AiOutlineGlobal className="ml-auto text-xl" />{" "}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Abreviatura"
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"
                                            value={valuesMaintenance.Abreviature} onChange={e => setValuesMaintenance({ ...valuesMaintenance, Abreviature: e.target.value })}
                                        />
                                        <textarea
                                            type="textarea"
                                            placeholder="Detalhe"
                                            className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"
                                            value={valuesMaintenance.Details} onChange={e => setValuesMaintenance({ ...valuesMaintenance, Details: e.target.value })}
                                        ></textarea>
                                        <div>
                                            <input
                                                id="link-checkbox"
                                                type="checkbox"
                                                value=""
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            ></input>
                                            <label
                                                for="link-checkbox"
                                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Estado
                                            </label>
                                        </div>
                                    </ModalBody>
                                    </form>
                                    <ModalFooter className="absolute bottom-0 left-0 flex flex-col text-right bg-tableFooter border border-tableFooterBorder w-full text-gray-600 text-sm">
                                        <p>Criado em {`${new Date(criado).toLocaleDateString()} : Teste`}</p>
                                        {criado !== editado && (
                                            <div>
                                                <p>Editado em {`${new Date(editado).toLocaleDateString()} : Teste`}</p>
                                            </div>
                                        )}
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

        </>
    );
};

export default formModals;