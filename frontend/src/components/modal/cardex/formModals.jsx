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

const formModals = ({ idSalutation, idNacionality, idProfession,
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

    //inserção na tabela reservation status
    const [salutation, setSalutation] = useState({
        Abreviature: '',
        Description: '',
        Title: '',
        Ordenation: '',
        Gender: '',
    })

    const handleInputSalutation = (event) => {
        setSalutation({ ...salutation, [event.target.name]: event.target.value })
    }
    function handleSubmitSalutation(event) {
        event.preventDefault()
        if (!salutation.Abreviature || !salutation.Description || !salutation.Title || !salutation.Ordenation || !salutation.Gender) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/cardex/salutation', {
            data: {
                abreviature: salutation.Abreviature,
                description: salutation.Description,
                title: salutation.Title,
                ordenation: salutation.Ordenation,
                gender: salutation.Gender,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    //edição na tabela reservation status
    const [valuesSalutation, setValuesSalutation] = useState({
        id: idSalutation,
        Abreviature: '',
        Description: '',
        Title: '',
        Ordenation: '',
        Gender: '',
    })

    useEffect(() => {
        axios.get('/api/v1/cardex/salutation/' + idSalutation)
            .then(res => {
                setValuesSalutation({ ...valuesSalutation, Abreviature: res.data.response.suffix, Description: res.data.response.salutationCode, Title: res.data.response.salutation, Ordenation: res.data.response.type, Gender: res.data.response.inet, })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateSalutation(e) {
        e.preventDefault()
        axios.patch('/api/v1/cardex/salutation/' + idSalutation, {
            data: {
                abreviature: valuesSalutation.Abreviature,
                description: valuesSalutation.Description,
                title: valuesSalutation.Title,
                ordenation: valuesSalutation.Ordenation,
                gender: valuesSalutation.Gender,
            }
        })
            .catch(err => console.log(err))
    }

    //inserção na tabela nationality
    const [nacionality, setNacionality] = useState({
        Nation: '',
        Statnr: '',
        Ordenation: '',
        Group: '',
        Isocode: '',
        Fo: '',
        Nationality: '',
    })

    const handleInputNacionality = (event) => {
        setNacionality({ ...nacionality, [event.target.name]: event.target.value })
    }
    function handleSubmitNacionality(event) {
        event.preventDefault()
        if (!nacionality.Nation.trim() || !nacionality.Statnr.trim() || !nacionality.Ordenation.trim() || !nacionality.Group.trim() || !nacionality.Isocode.trim() || !nacionality.Fo.trim() || !nacionality.Nationality.trim()) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/cardex/nationalities', {
            data: {
                nation: nacionality.Nation,
                statnr: nacionality.Statnr,
                ordenation: nacionality.Ordenation,
                group: nacionality.Group,
                isocode: nacionality.Isocode,
                fo: nacionality.Fo,
                nationality: nacionality.Nationality,
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    //edição na tabela nationality
    const [valuesNacionality, setValuesNationality] = useState({
        id: idNacionality,
        Nation: '',
        Statnr: '',
        Ordenation: '',
        Group: '',
        Isocode: '',
        Fo: '',
        Nationality: '',
    })

    useEffect(() => {
        axios.get('/api/v1/cardex/nationalities/' + idNacionality)
            .then(res => {
                setValuesNationality({ ...valuesNacionality, Nation: res.data.response.land, Statnr: res.data.response.statNr, Ordenation: res.data.response.brkopftyp, Group: res.data.response.gruppe, Isocode: res.data.response.isocode, Fo: res.data.response.showFO, Nationality: res.data.response.nation })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateNationality(e) {
        e.preventDefault()
        axios.patch('/api/v1/cardex/nationalities/' + idNacionality, {
            data: {
                nation: valuesNacionality.Nation,
                statnr: valuesNacionality.Statnr,
                ordenation: valuesNacionality.Ordenation,
                group: valuesNacionality.Group,
                isocode: valuesNacionality.Isocode,
                fo: valuesNacionality.Fo,
                nationality: valuesNacionality.Nationality,
            }
        })
            .catch(err => console.log(err))
    }

    //inserção na tabela nationality
    const [profession, setProfession] = useState({
        Group: '',
        Abreviature: '',
        Description: ''
    })

    const handleInputProfession = (event) => {
        setProfession({ ...profession, [event.target.name]: event.target.value })
    }
    function handleSubmitProfession(event) {
        event.preventDefault()
        if (!profession.Group || !profession.Abreviature || !profession.Description) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/v1/cardex/profession', {
            data: {
                group: profession.Group,
                abreviature: profession.Abreviature,
                description: profession.Description
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    //edição na tabela profession
    const [valuesProfession, setValuesProffesion] = useState({
        id: idNacionality,
        Group: '',
        Abreviature: '',
        Description: '',
    })

    useEffect(() => {
        axios.get('/api/v1/cardex/profession/' + idProfession)
            .then(res => {
                setValuesProffesion({ ...valuesProfession, Group: res.data.response.gruppe, Abreviature: res.data.response.abreviature, Description: res.data.response.description })
            })
            .catch(err => console.log(err))
    }, [])

    function handleUpdateProfession(e) {
        e.preventDefault()
        axios.patch('/api/v1/cardex/profession/' + idProfession, {
            data: {
                group: valuesProfession.Group,
                abreviature: valuesProfession.Abreviature,
                description: valuesProfession.Description
            }
        })
            .catch(err => console.log(err))
    }

    //expansão de ecra form
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>

            {formTypeModal === 10 && ( //salutation status modal
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

            {formTypeModal === 11 && ( //salutation status insert
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
                                    <>
                                        <form onSubmit={handleSubmitSalutation}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <div className="flex flex-row items-center justify-center">
                                                    <input type="text" name="Abreviature" onChange={handleInputSalutation} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-10 px-4"></input>
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="Description"
                                                    onChange={handleInputSalutation}
                                                    placeholder="Descrição"
                                                    className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4" />
                                                <input type="text" name="Treat" onChange={handleInputSalutation} placeholder="Tratamento" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Gender" onChange={handleInputSalutation} placeholder="Trat.Pessoal" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Title" onChange={handleInputSalutation} placeholder="Titulo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Ordenation" onChange={handleInputSalutation} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="NameSuff" onChange={handleInputSalutation} placeholder="Nome-Suffix" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <div className="flex flex-row justify-left items-center">
                                                    <label className="mr-10">Tipo</label>
                                                    <div className="flex flex-row justify-center items-center mr-10">
                                                        <label className="mr-2">Nome</label>
                                                        <input type="radio" name="Gender" value="name"></input>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center mr-10">
                                                        <label className="mr-2">Primmeiro Nome</label>
                                                        <input type="radio" name="FistName" value="name"></input>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center">
                                                        <label className="mr-2">Sem ext.</label>
                                                        <input type="radio" name="NoExt" value="name"></input>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 12 && ( //salutation edit
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
                                    <>
                                        <form onSubmit={(e) => handleUpdateSalutation(e)}>
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
                                                <div className="flex flex-row items-center justify-center">
                                                    <input type="text" value={valuesSalutation.Abreviature}
                                                        onChange={e => setValuesSalutation({ ...valuesSalutation, Abreviature: e.target.value })} placeholder="Abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-10 px-4"></input>
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={valuesSalutation.Description}
                                                    onChange={e => setValuesSalutation({ ...valuesSalutation, Description: e.target.value })}
                                                    placeholder="Descrição"
                                                    className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4" />
                                                <input type="text" placeholder="Tratamento" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" value={valuesSalutation.Gender}
                                                    onChange={e => setValuesSalutation({ ...valuesSalutation, Gender: e.target.value })} placeholder="Trat.Pessoal" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" value={valuesSalutation.Title}
                                                    onChange={e => setValuesSalutation({ ...valuesSalutation, Title: e.target.value })} placeholder="Titulo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" value={valuesSalutation.Ordenation}
                                                    onChange={e => setValuesSalutation({ ...valuesSalutation, Ordenation: e.target.value })} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" placeholder="Nome-Suffix" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <div className="flex flex-row justify-left items-center">
                                                    <label className="mr-10">Tipo</label>
                                                    <div className="flex flex-row justify-center items-center mr-10">
                                                        <label className="mr-2">Nome</label>
                                                        <input type="radio" value="name"></input>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center mr-10">
                                                        <label className="mr-2">Primmeiro Nome</label>
                                                        <input type="radio" value="name"></input>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center">
                                                        <label className="mr-2">Sem ext.</label>
                                                        <input type="radio" value="name"></input>
                                                    </div>
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
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 20 && ( //salutation status modal
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

            {formTypeModal === 21 && ( //salutation status insert
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
                                    <>
                                        <form onSubmit={handleSubmitNacionality}>
                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                <div className='flex flex-row items-center mr-5'>
                                                    <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                    <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                                <div className="flex flex-row items-center justify-center">
                                                    <input type="text" name="Fo" onChange={handleInputNacionality} placeholder="Detalhes" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-10 px-4"></input>
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="Nation"
                                                    onChange={handleInputNacionality}
                                                    placeholder="País"
                                                    className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4" />
                                                <input type="text" name="Nationality" onChange={handleInputNacionality} placeholder="Nacionalidade" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Statnr" onChange={handleInputNacionality} placeholder="Número de Estatísticas" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Group" onChange={handleInputNacionality} placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Ordenation" onChange={handleInputNacionality} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" name="Isocode" onChange={handleInputNacionality} placeholder="Código ISO" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                            </ModalBody>
                                        </form>
                                    </>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 22 && ( //salutation edit
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
                                    <>
                                        <form onSubmit={(e) => handleUpdateNationality(e)}>
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
                                                <div className="flex flex-row items-center justify-center">
                                                    <input type="text" value={valuesNacionality.Fo}
                                                        onChange={e => setValuesNationality({ ...valuesNacionality, Fo: e.target.value })} placeholder="Detalhes" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-10 px-4"></input>
                                                    <AiOutlineGlobal className="ml-auto text-xl" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={valuesNacionality.Nation}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Nation: e.target.value })}
                                                    placeholder="País"
                                                    className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4" />
                                                <input type="text" value={valuesNacionality.Nationality}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Nationality: e.target.value })} placeholder="Nacionalidade" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" value={valuesNacionality.Statnr}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Statnr: e.target.value })} placeholder="Número de Estatísticas" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" value={valuesNacionality.Group}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Group: e.target.value })} placeholder="Grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" value={valuesNacionality.Ordenation}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Ordenation: e.target.value })} placeholder="Ordenação" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
                                                <input type="text" value={valuesNacionality.Isocode}
                                                    onChange={e => setValuesNationality({ ...valuesNacionality, Isocode: e.target.value })} placeholder="Código ISO" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-8 px-4"></input>
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
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 30 && ( //profession modal
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

            {formTypeModal === 31 && ( //profession insert
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
                                    <form onSubmit={handleSubmitProfession}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} className="-mr-5" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" className="-mr-5" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <Input type="text" name="Group" onChange={handleInputProfession} variant="underlined" label="Grupo" />
                                            <Input type="text" name="Abreviature" onChange={handleInputProfession} variant="underlined" label="Abreviatura" />
                                            <Input type="textarea" name="Description" onChange={handleInputProfession} variant="underlined" label="Descrição" />
                                        </ModalBody>
                                    </form>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

            {formTypeModal === 32 && ( //profession edit
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
                                    <form onSubmit={(e) => handleUpdateProfession(e)}>
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
                                            <input type="text" value={valuesProfession.Group} onChange={e => setValuesProffesion({ ...valuesProfession, Group: e.target.value })} placeholder="Grupo" aria-label="grupo" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <input type="text" value={valuesProfession.Abreviature} onChange={e => setValuesProffesion({ ...valuesProfession, Abreviature: e.target.value })} placeholder="Abreviatura" aria-label="abreviatura" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-14 px-4"></input>
                                            <input type="text" value={valuesProfession.Description} onChange={e => setValuesProffesion({ ...valuesProfession, Description: e.target.value })} placeholder="Descrição" aria-label="descrição" className="w-full bg-transparent outline-none border-b-2 border-gray-500 h-24 px-4"></input>
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