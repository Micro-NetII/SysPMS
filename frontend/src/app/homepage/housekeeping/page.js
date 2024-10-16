"use client";
import React, { useEffect, useState } from "react";
// import your Cartao component
import Cartao from "@/components/Cards/houseKeeping/Card";
// import icons
import { PiListPlus, PiListDashesBold } from "react-icons/pi";
import { FaBoxesStacked } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import axios from "axios";

const Card = () => {
  const t = useTranslations("Index");
  const [housekeepingCounter, setHousekeepingCounter] = useState([]);
  const [housekeepingRooms, setHousekeepingRooms] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/counters/housekeepingCounters");
        setHousekeepingCounter(res.data.response);
      } catch (error) {
        console.error("Erro: ", error.message);
      }
    };
    getData();
  }, []);

  // Find specific status values
  const counter1 =
    housekeepingCounter.find((status) => status.housekeepingStatusID === 1)
      ?.roomsOnStatus || "0";

  const counter2 =
    housekeepingCounter.find((status) => status.housekeepingStatusID === 2)
      ?.roomsOnStatus || "0";

  const counter3 =
    housekeepingCounter.find((status) => status.housekeepingStatusID === 3)
      ?.roomsOnStatus || "0";

  const counter4 =
    housekeepingCounter.find((status) => status.housekeepingStatusID === 4)
      ?.roomsOnStatus || "0";

  const counter5 =
    housekeepingCounter.find((status) => status.housekeepingStatusID === 5)
      ?.roomsOnStatus || "0";

  const counter6 =
    housekeepingCounter.find((status) => status.housekeepingStatusID === 6)
      ?.roomsOnStatus || "0";

  return (
    <>
      <div className="border grid grid-cols-4 gap-4 justify-between py-5 px-5 uppercase">
        <div>
          <Cartao
            counter1={counter1}
            title={t("housekeeping.housekeeping.housekeepingCardOutOfService")}
            description={""}
            listType={"#"}
            icon={<PiListPlus size={35} />}
            formTypeCard={1}
          />
        </div>
        <div>
          <Cartao
            counter2={counter2}
            title={t("housekeeping.housekeeping.housekeepingCardDirty")}
            description={""}
            listType={"#"}
            icon={<PiListPlus size={35} />}
            formTypeCard={2}
          />
        </div>
        <div>
          <Cartao
            counter3={counter3}
            title={t("housekeeping.housekeeping.housekeepingCardTouched")}
            description={""}
            listType={"#"}
            icon={<FaBoxesStacked size={35} />}
            formTypeCard={3}
          />
        </div>
        <div className="w-20px">
          <Cartao
            counter4={counter4}
            title={t("housekeeping.housekeeping.housekeepingCardCleaning")}
            description={""}
            icon={<PiListDashesBold size={35} />}
            listType={"#"}
            formTypeCard={4}
          />
        </div>
        <div className="w-20px">
          <Cartao
            counter5={counter5}
            title={t("housekeeping.housekeeping.housekeepingCardChecked")}
            description={""}
            icon={<PiListDashesBold size={35} />}
            listType={"#"}
            formTypeCard={5}
          />
        </div>
        <div className="w-20px">
          <Cartao
            counter6={counter6}
            title={t("housekeeping.housekeeping.housekeepingCardClean")}
            description={""}
            icon={<PiListDashesBold size={35} />}
            listType={"#"}
            formTypeCard={6}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
