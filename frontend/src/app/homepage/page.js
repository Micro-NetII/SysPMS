"use client"
import Cartao from "@/components/Cards/Card";
import { PiListPlus } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { FaPencilRuler } from "react-icons/fa";
import { redirect } from "next/navigation";



const Homepage = () => {
    return (
        <>
        <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5">
            <div className="">
                <Cartao title={"GRUPOS TIPOLOGIAS"} description={"Inserir grupos que relacionam várias tipologias de quartos"} icon={<PiListPlus size={35}/>} pathextra={"/hotelSetup/tipologyGroup"} formTypeCard={1} />
            </div>
            <div className="">
                <Cartao title={"TIPOLOGIAS"} description={"Inserir as tipologias que associam quartos da mesma categoria"} icon={<FaBoxesStacked size={35}/>} pathextra={"/hotelSetup/tipologys"} formTypeCard={1} />
            </div>
            <div className="">
                <Cartao title={"QUARTOS"} counter1={"39"} counter2={"01"} icon={<FaBed size={35}/>} pathextra={"/hotelSetup/rooms"} formTypeCard={2} />
            </div>
            <div className="">
                <Cartao title={"CARACTERÍSTICAS"} description={"Inserir lista com as várias características para cada quarto"} icon={<FaPencilRuler size={35}/>} pathextra={"/hotelSetup/characteristics"} formTypeCard={1}/>
            </div>
            <div className="">
                <Cartao title={"MANUTENÇÃO"} description={""} icon={<FaWrench size={35}/>} pathextra={"/hotelSetup/tipologys"} formTypeCard={1} />
            </div>

        </div>
        </>
    )
}
export default Homepage;