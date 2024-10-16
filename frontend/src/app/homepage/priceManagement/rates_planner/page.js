"use client";
import React, { useState, useEffect } from "react";
import {
  generateDate,
  months,
  daysOfWeek,
} from "@/app/util/tipologyPlan/week/weekcalendar";
import dayjs from "dayjs";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import axios from "axios";

import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";

//imports de componentes
import PriceForm from "@/components/modal/priceManagement/ratesPlanner/page";
import InputFieldControlled from "@/components/functionsForm/inputs/typeText/page";

import ConfirmationBox from "@/components/modal/confirmationBox/page";
import CountryAutocomplete from "@/components/functionsForm/autocomplete/country/page";
import HeaderAutocomplete from "@/components/functionsForm/autocomplete/priceDescriptionHeader/page";
import { FaRegPlusSquare, FaUser } from "react-icons/fa";
import { FiMinusSquare } from "react-icons/fi";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
//import { BiSolidPencil } from "react-icons/bi";
//import { FiPlus, FiX } from "react-icons/fi";
import { FaCalendarAlt, FaRegTrashAlt, FaBed } from "react-icons/fa";

import { FaPlus, FaMinus } from "react-icons/fa";

import { MdOutlineZoomOut } from "react-icons/md";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { getMonth } from "date-fns";

import { useTranslations } from "next-intl";
import HeaderAutocompleteNoFilter from "@/components/functionsForm/autocomplete/HeaderAutocompleteNoFilter/page";

// Configurando plugins
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export default function CalendarPage() {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [expandedColumns, setExpandedColumns] = useState([]);

  // Função para alternar a expansão de colunas
  const toggleExpandIndexes = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
      setExpandedColumns(expandedColumns.filter((c) => c !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
      setExpandedColumns([...expandedColumns, index]);
    }
  };

  const [today, setToday] = useState(dayjs());
  const [weeks, setWeeks] = useState(generateDate(today.month(), today.year()));
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [roomTypeState, setRoomTypeState] = useState([]);
  const [roomCounts, setRoomCounts] = useState({});
  const [reservation, setReservation] = useState([]);
  const [selectionInfo, setSelectionInfo] = useState({
    roomTypeID: null,
    dates: [],
  }); //seleção de uma linha
  // const [selectionRows, setSelectionRows] = useState({
  //   roomTypeID: null,
  //   dates: [],
  // }); //seleção de uma linha
  const [availability, setAvailability] = useState({});
  const [updatedAvailability, setUpdatedAvailability] = useState({});

  // const [dragStart, setDragStart] = useState(null);
  // const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [tipology, setTipology] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomID, setRoomID] = useState(null);
  const [typologyID, setTypologyID] = useState(null);
  const [firstHeaderName, setFirstHeaderName] = useState("");

  const [startDate2, setStartDate2] = useState(null);
  const [endDate2, setEndDate2] = useState(null);

  const [selectedDates, setSelectedDates] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  // const [cellsSelection, setCellsSelection] = useState([]);

  //FILTRO DE BOTOES
  // const [showButton, setShowButton] = useState(false);

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const [totalOverbookings, setTotalOverbookings] = useState({});
  const [overbookings, setOverbookings] = useState({});

  const [finalSelectedCells, setFinalSelectedCells] = useState([]);

  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const [selectedRoomType, setSelectedRoomType] = useState("");
  // const [guestName, setGuestName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [autocompleteIsDisabled, setAutocompleteIsDisabled] = useState(false);
  // const [dataFetched, setDataFetched] = useState(false);
  // const [query, setQuery] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [isGuestNameValid, setIsGuestNameValid] = useState(false);
  // const [selectedGuestId, setSelectedGuestId] = useState("");

  const [isSelecting, setIsSelecting] = useState(false);
  const [groupReservation, setRoomRevervation] = useState({}); // Estado para armazenar o número de quartos associados a cada tipo de quarto

  // const [nights, setNights] = useState([]);

  const [typologyPrices, setTypologyPrices] = useState([]);
  const [pricesRoom, setPricesRoom] = useState([]);
  const [prices, setPrices] = useState([]);
  const [roomPrices, setRoomPrices] = useState([]);
  const [specialPrices, setSpecialPrices] = useState([]);
  const [defaultTypologyPrices, setDefaultTypologyPrices] = useState({});
  const [ageConfig, setAgeConfig] = useState([]);
  const [peopleCount, setPeopleCount] = useState(1);

  const [selectedHeaderID, setSelectedHeaderID] = useState({
    ID: "",
  });

  const [selectedHeaderIDNoFilter, setSelectedHeaderIDNoFilter] = useState({
    ID: "",
  });

  const t = useTranslations("Index");

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/cardex/ageConfig");
        setAgeConfig(res.data.response);
      } catch (error) {
        console.error("Erro: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch tipologies
        const resTipologies = await axios.get(`/api/v1/hotel/tipologys`);
        console.log("Tipologies Response:", resTipologies);
        const tipologies = resTipologies.data.response;

        // Fetch room counts
        let tempRoomCounts = {};
        await Promise.all(
          tipologies.map(async (tipology) => {
            const resRooms = await axios.get(
              `/api/v1/hotel/rooms/tipologys/${tipology.roomTypeID}`
            );
            tempRoomCounts[tipology.roomTypeID] = resRooms.data.response.length;
          })
        );
        console.log("Room Counts:", tempRoomCounts);

        // Fetch typology prices
        const resTypologyPrices = await axios.get(
          `/api/v1/prices/priceDescriptionPrices`
        );
        console.log("Typology Prices Response:", resTypologyPrices);
        const typologyPrices = resTypologyPrices.data.response;

        // Fetch room prices
        const resRoomPrices = await axios.get(
          `/api/v1/prices/priceDescriptionRooms`
        );
        console.log("Room Prices Response:", resRoomPrices);
        const price = resRoomPrices.data.response;

        // Fetch special prices
        const resSpecialPrices = await axios.get(
          `/api/v1/prices/priceDescriptionSpecialPrices`
        );
        console.log("Special Prices Response:", resSpecialPrices);
        const specialPrice = resSpecialPrices.data.response;

        // Fetch price description headers
        const resPriceHeaders = await axios.get(
          `/api/v1/prices/priceDescriptionHeader`
        );
        console.log("Price Description Headers Response:", resPriceHeaders);
        const priceHeaders = resPriceHeaders.data.response;

        // Get the first priceDescriptionHeaderID from the response and set it as the selectedHeaderID
        if (priceHeaders.length > 0) {
          const firstHeaderID = priceHeaders[0].priceDescriptionHeaderID;
          const firstHeaderName = priceHeaders[0].descriptionName;
          setFirstHeaderName(firstHeaderName);
          setSelectedHeaderID({ ID: firstHeaderID.toString() }); // Update the state with the first ID
        }

        // Fetch bookings
        const resBookings = await axios.get(`/api/v1/frontOffice/reservations`);
        const bookings = resBookings.data.response;

        // Update states together to avoid multiple re-renders
        setRoomTypeState(tipologies);
        setRoomCounts(tempRoomCounts);
        setPrices(typologyPrices);
        setRoomPrices(price);
        setSpecialPrices(specialPrice);
        setReservation(bookings);

        // Call updateAvailability after loading all data
        updateAvailability(typologyPrices, price);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    // Atualizar o updatedAvailability sempre que o availability for atualizado
    setUpdatedAvailability((prev) => {
      const newUpdatedAvailability = { ...prev };
      for (const roomTypeID in availability) {
        for (const date in availability[roomTypeID]) {
          newUpdatedAvailability[roomTypeID] = {
            ...newUpdatedAvailability[roomTypeID],
            [date]: availability[roomTypeID][date],
          };
        }
      }
      return newUpdatedAvailability;
    });
  }, [availability]);

  const [specialRoomPrices, setSpecialRoomPrices] = useState({});

  const updateAvailability = () => {
    let typologyPrices = {};
    let updateRoomPrices = {};

    let defaultTypologyPrices = {}; // Definindo a variável para preços padrão das tipologias
    let updatedAvailability = {};
    let dailyOverbookings = {};

    const priceKey = `p${peopleCount}`;

    prices
      .filter(
        (price) =>
          price.priceDescriptionHeaderID === parseInt(selectedHeaderID.ID)
      )
      .forEach((price) => {
        const typologyID = price.typologyID;
        let priceForPeopleCount = parseFloat(price[priceKey]).toFixed(2);

        if (!typologyPrices[typologyID]) {
          typologyPrices[typologyID] = {};
          defaultTypologyPrices[typologyID] = {};
        }

        weeks[currentWeekIndex].forEach((day) => {
          const dayFormat = day.date.format("YYYY-MM-DD");
          typologyPrices[typologyID][dayFormat] = priceForPeopleCount;
          defaultTypologyPrices[typologyID][dayFormat] = priceForPeopleCount;
        });
      });

    // Filtrar preços padrão dos quartos
    roomPrices
      .filter(
        (price) =>
          price.priceDescriptionHeaderID === parseInt(selectedHeaderID.ID)
      )
      .forEach((price) => {
        const roomID = price.roomID;
        let priceForPeopleCountRoom = parseFloat(price[priceKey]).toFixed(2);

        if (!updateRoomPrices[roomID]) {
          updateRoomPrices[roomID] = {};
        }

        weeks[currentWeekIndex].forEach((day) => {
          const dayFormat = day.date.format("YYYY-MM-DD");
          updateRoomPrices[roomID][dayFormat] = priceForPeopleCountRoom;
        });
      });

    // Função para encontrar o preço especial mais relevante para um dia específico
    const getSpecialPrice = (typologyID, roomID, dayFormat) => {
      const pricesForType = specialPrices.filter(
        (price) =>
          price.typologyID === parseInt(typologyID) ||
          price.roomID === parseInt(roomID)
      );

      let applicablePrice = null;

      for (const price of pricesForType) {
        const validFrom = price.validFrom.split("T")[0];
        const validUntil = price.validUntil.split("T")[0];

        if (validFrom <= dayFormat && validUntil >= dayFormat) {
          if (
            !applicablePrice ||
            new Date(price.createdAt) > new Date(applicablePrice.createdAt)
          ) {
            applicablePrice = price;
          }
        }
      }

      return applicablePrice;
    };

    // Atualizar preços de tipologia com preços especiais
    Object.keys(typologyPrices).forEach((typologyID) => {
      weeks[currentWeekIndex].forEach((day) => {
        const dayFormat = day.date.format("YYYY-MM-DD");
        const specialPrice = getSpecialPrice(typologyID, null, dayFormat);

        if (specialPrice) {
          if (specialPrice.forcedUpdate === 1) {
            // Aplica o preço forçado tanto à tipologia quanto aos quartos associados
            typologyPrices[typologyID][dayFormat] = specialPrice[priceKey];

            const associatedRooms = rooms.filter(
              (room) => room.roomType === parseInt(typologyID)
            );
            associatedRooms.forEach((room) => {
              const roomID = room.roomID;
              if (!updateRoomPrices[roomID]) {
                updateRoomPrices[roomID] = {};
              }
              updateRoomPrices[roomID][dayFormat] = specialPrice[priceKey];
            });
          } else {
            // Atualiza o preço da tipologia sem sobrescrever preços de quartos
            typologyPrices[typologyID][dayFormat] = specialPrice[priceKey];
          }
        }
      });
    });

    // Atualizar preços de quartos com preços especiais
    Object.keys(updateRoomPrices).forEach((roomID) => {
      weeks[currentWeekIndex].forEach((day) => {
        const dayFormat = day.date.format("YYYY-MM-DD");
        const specialPrice = getSpecialPrice(null, roomID, dayFormat);

        // Verifica se o quarto possui uma tipologia associada
        const typologyID = roomPrices.find(
          (roomPrice) => roomPrice.roomID === parseInt(roomID)
        )?.typologyID;

        if (specialPrice) {
          // Verifica se um preço default ou especial já existe na mesma data do preço forçado
          if (specialPrice.forcedUpdate === 1) {
            // Preço especial forçado, substitui qualquer preço padrão ou anterior
            updateRoomPrices[roomID][dayFormat] = specialPrice[priceKey];
          } else {
            // Verifica se o preço especial é especial ou default
            if (
              !updateRoomPrices[roomID][dayFormat] ||
              updateRoomPrices[roomID][dayFormat] !== specialPrice[priceKey]
            ) {
              // Aplica o preço especial se não há preço default ou especial anterior, ou se o preço atual é diferente do preço especial
              updateRoomPrices[roomID][dayFormat] = specialPrice[priceKey];
            }
          }
        } else {
          // Se não há preço especial, mantém o preço default
          if (!updateRoomPrices[roomID][dayFormat]) {
            const typologyPrice =
              defaultTypologyPrices[typologyID]?.[dayFormat];
            if (typologyPrice) {
              updateRoomPrices[roomID][dayFormat] = typologyPrice;
            }
          }
        }
      });
    });

    // Aplicar herança de preços padrão se não houver preço específico para o quarto
    Object.keys(updateRoomPrices).forEach((roomID) => {
      weeks[currentWeekIndex].forEach((day) => {
        const dayFormat = day.date.format("YYYY-MM-DD");
        if (!updateRoomPrices[roomID][dayFormat]) {
          const typologyID = roomPrices.find(
            (roomPrice) => roomPrice.roomID === parseInt(roomID)
          )?.typologyID;
          if (typologyID) {
            updateRoomPrices[roomID][dayFormat] =
              defaultTypologyPrices[typologyID][dayFormat];
          }
        }
      });
    });

    // Calcular disponibilidade e overbookings com base em roomTypeState
    roomTypeState.forEach((roomType) => {
      weeks[currentWeekIndex].forEach((day) => {
        const dayFormat = day.date.format("YYYY-MM-DD");
        const filteredReservations = reservation.filter(
          (res) =>
            dayjs(res.checkInDate).startOf("day").isSameOrBefore(day.date) &&
            dayjs(res.checkOutDate)
              .endOf("day")
              .subtract(2, "hours")
              .isAfter(day.date) &&
            res.roomTypeNumber === roomType.roomTypeID
        );

        const reservedRooms = filteredReservations.length;
        const totalRooms = roomCounts[roomType.roomTypeID] || 0;
        const availableRooms = totalRooms - reservedRooms;

        if (!updatedAvailability[roomType.roomTypeID]) {
          updatedAvailability[roomType.roomTypeID] = {};
        }
        updatedAvailability[roomType.roomTypeID][dayFormat] = availableRooms;

        // Inicializar a contagem de overbookings diários se não existir
        if (!dailyOverbookings[dayFormat]) {
          dailyOverbookings[dayFormat] = 0;
        }

        // Calcular overbookings
        if (availableRooms < 0) {
          dailyOverbookings[dayFormat] += Math.abs(availableRooms);
        }
      });
    });

    // Filtrar e armazenar preços especiais para quartos específicos
    const specialRoomPrices = specialPrices
      .filter((price) => price.roomID)
      .reduce((acc, price) => {
        const roomID = price.roomID;
        const priceForPeopleCount = price[priceKey];

        if (
          !acc[roomID] ||
          new Date(price.validUntil) > new Date(acc[roomID].validUntil)
        ) {
          acc[roomID] = { ...price, [priceKey]: priceForPeopleCount };
        }

        return acc;
      }, {});

    // Atualizar os estados finais com os preços processados
    setTypologyPrices(typologyPrices);
    setPricesRoom(updateRoomPrices);
    setDefaultTypologyPrices(defaultTypologyPrices);
    setAvailability(updatedAvailability);
    setTotalOverbookings(dailyOverbookings);
    setOverbookings(dailyOverbookings);
    setSpecialRoomPrices(specialRoomPrices);
  };

  useEffect(() => {
    if (roomTypeState.length && prices.length && roomPrices.length) {
      updateAvailability();
    }
  }, [roomTypeState, prices, roomPrices, currentWeekIndex, peopleCount]);

  // Funções para navegar entre as semanas
  const goToPreviousWeek = () => {
    let newToday = today;
    let newIndex = currentWeekIndex - 1;

    if (currentWeekIndex === 0) {
      newToday = today.subtract(1, "month");
      const newWeeks = generateDate(newToday.month(), newToday.year());
      newIndex = newWeeks.length - 1; // Vá para a última semana do mês anterior
      setWeeks(newWeeks); // Atualize weeks
    }

    setToday(newToday);
    setCurrentWeekIndex(newIndex);
    updateAvailability(); // Atualize a disponibilidade quando a semana mudar
  };

  const goToNextWeek = () => {
    let newToday = today;
    let newIndex = currentWeekIndex + 1;

    if (currentWeekIndex === weeks.length - 1) {
      newToday = today.add(1, "month");
      const newWeeks = generateDate(newToday.month(), newToday.year());
      newIndex = 0; // Vá para a primeira semana do próximo mês
      setWeeks(newWeeks); // Atualize weeks
    }

    setToday(newToday);
    setCurrentWeekIndex(newIndex);
    updateAvailability(); // Atualize a disponibilidade quando a semana mudar
  };

  const goToCurrentWeek = () => {
    const currentToday = dayjs(); // Pega a data atual
    setToday(currentToday); // Atualiza o estado today para a data atual
    const newWeeks = generateDate(currentToday.month(), currentToday.year()); // Regenera as semanas para o mês atual
    setWeeks(newWeeks);

    // Calcula o índice da semana que contém o dia atual
    const startOfMonth = currentToday.startOf("month");
    const daysSinceStartOfMonth = currentToday.diff(startOfMonth, "day");
    const currentWeekIndex = Math.floor(daysSinceStartOfMonth / 7);

    // Encontre a semana que contém o dia de hoje
    const weekIndex = newWeeks.findIndex((week) =>
      week.some((day) => day.date.isSame(currentToday, "day"))
    );

    setCurrentWeekIndex(weekIndex); // Atualiza o índice da semana
    updateAvailability(); // Atualiza a disponibilidade
  };

  // // Função para lidar com a atualização do número de quartos associados a um determinado tipo de quarto
  // const handleRoomCountUpdate = (roomTypeID, count) => {
  //   setRoomRevervation((prevCounts) => ({
  //     ...prevCounts,
  //     [roomTypeID]: count,
  //   }));
  //   console.log(
  //     `Número de quartos atualizado para o tipo de quarto ${roomTypeID}: ${count}`
  //   );
  // };

  //calcula o nrm de noites
  const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleMouseDown = (
    date,
    roomTypeID,
    rowIndex,
    columnIndex,
    isRoom,
    roomIndex = null
  ) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setAutocompleteIsDisabled(true);

    // Check if there's an existing selection
    if (selectedDates.length > 0) {
      const confirmNewSelection = window.confirm(
        "Deseja continuar com a nova seleção e eliminar a anterior?"
      );

      if (!confirmNewSelection) {
        // User chose to keep the existing selection
        return;
      } else {
        // Clear the existing selection data and modal data
        setSelectedDates([]);
        setAutocompleteIsDisabled(false);
        setSelectionInfo({ roomTypeID: null, dates: [] });
        setSelectedCells([]);
        setEndDate(null);
        setEndDate2(null);
        setStartDate(null);
        setStartDate2(null);
        // Reset Pax, Child, and Extra Bed values
        setPaxValues({
          p1: "",
          p2: "",
          p3: "",
          p4: "",
          p5: "",
          p6: "",
          child1: "",
          child2: "",
          child3: "",
          child4: "",
          extraBed: "",
        });
      }
    }

    // Set up the new selection
    setSelectionInfo({ roomTypeID, dates: [formattedDate] });
    setIsDragging(true);
    setIsSelecting(true);
    setStartDate(formattedDate);
    setSelectedRow(rowIndex);
    setSelectedColumn(columnIndex);

    const newSelectedCell = {
      row: rowIndex,
      column: columnIndex,
      date,
      isRoom,
      roomIndex,
    };

    // Reset the selection with the new cell
    setSelectedCells([newSelectedCell]);

    // Não permite a seleção de múltiplas datas com ctrlPressed
    if (ctrlPressed) {
      setSelectionInfo((prev) => ({
        roomTypeID: prev.roomTypeID,
        dates: [formattedDate], // Mantém apenas a data inicial
      }));
      setStartDate2(formattedDate);
    }
  };

  const handleMouseOver = (
    date,
    rowIndex,
    columnIndex,
    isRoom,
    roomIndex = null
  ) => {
    if (isDragging && selectionInfo.roomTypeID) {
      const formattedDate = date.format("YYYY-MM-DD");
      setSelectedCells((prevCells) => [
        ...prevCells,
        { row: rowIndex, column: columnIndex, isRoom, roomIndex },
      ]);

      if (!selectionInfo.dates.includes(formattedDate)) {
        setSelectionInfo((prev) => ({
          ...prev,
          dates: [...prev.dates, formattedDate],
        }));
      }

      setSelectedRow(rowIndex);
      setSelectedColumn(columnIndex);
    }
  };

  const handleMouseUp = (date, isRoom, roomIndex, roomLabel, roomID = null) => {
    if (isDragging) {
      setIsDragging(false);
      setIsSelecting(false);
      setFinalSelectedCells(selectedCells);

      const formattedDate = date.format("YYYY-MM-DD");
      const selectedTipology = roomTypeState.find(
        (t) => t.roomTypeID === selectionInfo.roomTypeID
      );
      const tipologyName = selectedTipology ? selectedTipology.name : "";
      const tipology = selectedTipology ? selectedTipology.roomTypeID : "";
      const groupNumber = Object.values(groupReservation)[0] || "";
      const numberNights = calculateNights(startDate, formattedDate);
      const room = roomID;

      // Atualiza o estado com a seleção final
      if (ctrlPressed) {
        setEndDate2(formattedDate);
        setSelectedDates((prevDates) => [
          ...prevDates,
          {
            start: startDate,
            end: formattedDate,
            tipologyName,
            tipology,
            groupNumber,
            numberNights,
            isRoom,
            roomIndex,
            roomLabel,
            room,
          },
          {
            start: startDate2,
            end: formattedDate,
            tipologyName,
            tipology,
            groupNumber,
            numberNights,
            isRoom,
            roomIndex,
            roomLabel,
            room,
          },
        ]);
      } else {
        setEndDate(formattedDate);
        setSelectedDates((prevDates) => [
          ...prevDates,
          {
            start: startDate,
            end: formattedDate,
            tipologyName,
            tipology,
            groupNumber,
            numberNights,
            isRoom,
            roomIndex,
            roomLabel,
            room,
          },
        ]);
      }

      // Limpa a seleção após a exibição do modal
      setSelectionInfo({ roomTypeID: null, dates: [] });
      setRoomID(room);
      setTypologyID(tipology);
      setSelectedCells([]);
      setShowModal(true);
    }
  };

  // useEffect(() => {
  //   if (!isDragging && startDate && endDate) {
  //     console.log("Data de início:", startDate);
  //     console.log("Data de fim:", endDate);
  //     console.log("Tipologia:", tipology);
  //   }
  // }, [isDragging, startDate, endDate, tipology]);

  const setCurrentWeekToCurrentDate = () => {
    const currentToday = dayjs(); // Pega a data atual
    const newWeeks = generateDate(currentToday.month(), currentToday.year()); // Regenera as semanas para o mês atual
    setWeeks(newWeeks);
    setToday(currentToday);

    // Calcula o índice da semana atual dentro do mês
    const startOfMonth = currentToday.startOf("month");
    const daysSinceStartOfMonth = currentToday.diff(startOfMonth, "day");
    const newCurrentWeekIndex = Math.floor(daysSinceStartOfMonth / 7);

    setCurrentWeekIndex(newCurrentWeekIndex); // Atualiza o índice da semana
  };

  // Função para lidar com o pressionamento da tecla Ctrl
  const handleKeyDown = (event) => {
    if (event.key === "Control") {
      setCtrlPressed(true);
    }
  };

  // Função para lidar com a liberação da tecla Ctrl
  const handleKeyUp = (event) => {
    if (event.key === "Control") {
      setCtrlPressed(false);
    }
  };

  // Adicionando event listeners quando o componente é montado
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Removendo event listeners quando o componente é desmontado
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Função para lidar com a seleção da linha
  const handleRowSelection = (rowIndex) => {
    const filteredCells = selectedCells.filter((cell) => cell.row === rowIndex);
    setSelectedCells(filteredCells);
  };

  const removeEvent = (index) => {
    const updatedSelectedDates = [...selectedDates];
    updatedSelectedDates.splice(index, 1);
    setSelectedDates(updatedSelectedDates);
  };

  const updateDateRange = (index, field, value) => {
    const updatedDates = [...selectedDates];
    updatedDates[index][field] = value;
    setSelectedDates(updatedDates);
  };

  const handleYearChange = (action) => {
    let newYear;
    if (action === "increment") {
      newYear = selectedYear + 1;
    } else if (action === "decrement") {
      newYear = selectedYear - 1;
    }

    setSelectedYear(newYear);

    // Atualiza a data para o primeiro dia do novo ano e mês atual
    const newToday = dayjs().year(newYear).month(selectedMonth).date(1);
    setToday(newToday);

    // Regenera as semanas para o novo ano e mês
    const newWeeks = generateDate(newToday.month(), newToday.year());
    setWeeks(newWeeks);

    // Atualiza o índice da semana para a primeira semana do novo mês e ano
    setCurrentWeekIndex(0);

    updateAvailability(); // Atualiza a disponibilidade
  };

  const handleMonthChange = (month) => {
    const newMonth = parseInt(month, 10);
    setSelectedMonth(newMonth);

    // Atualiza a data para o primeiro dia do novo mês e ano atual
    const newToday = dayjs().year(selectedYear).month(newMonth).date(1);
    setToday(newToday);

    // Regenera as semanas para o novo mês e ano
    const newWeeks = generateDate(newToday.month(), newToday.year());
    setWeeks(newWeeks);

    // Atualiza o índice da semana para a primeira semana do novo mês e ano
    setCurrentWeekIndex(0);

    updateAvailability(); // Atualiza a disponibilidade
  };

  // useEffect para atualizar os dados quando o mês ou o ano é alterado
  useEffect(() => {
    const newToday = dayjs().year(selectedYear).month(selectedMonth).date(1);
    setToday(newToday);

    const newWeeks = generateDate(newToday.month(), newToday.year());
    setWeeks(newWeeks);

    // Atualiza o índice da semana para a primeira semana do novo mês e ano
    setCurrentWeekIndex(0);

    updateAvailability(); // Atualiza a disponibilidade
  }, [selectedYear, selectedMonth]); // Executa o efeito quando selectedYear ou selectedMonth mudar

  const handleZoomOutClick = () => {
    window.location.href = "/homepage/frontOffice/tipology_Plan/zoom_out";
  };

  // Aumento de pessoas
  const increasePeople = () => {
    if (peopleCount < 6) {
      setPeopleCount((prevCount) => {
        const newCount = prevCount + 1;
        console.log("P", newCount);
        return newCount;
      });
    }
  };

  // Diminuição de pessoas
  const decreasePeople = () => {
    if (peopleCount > 1) {
      setPeopleCount((prevCount) => {
        const newCount = prevCount - 1;
        console.log("P", newCount);
        return newCount;
      });
    }
  };

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const res = await axios.get("/api/v1/hotel/rooms");
        const filteredData = res.data.response.filter(
          (room) => room.label !== ""
        );
        setRooms(filteredData);
      } catch (error) {
        console.error("Error fetching rooms data:", error);
      }
    };
    fetchRoomsData();
  }, []);

  const [forcedUpdate, setForcedUpdate] = useState(0);
  useEffect(() => {
    console.log(forcedUpdate);
  }, [forcedUpdate]); // O console.log será chamado sempre que 'forcedUpdate' mudar

  const handleConfirm = () => {
    setForcedUpdate(1);
  };

  const handleCancel = () => {
    setForcedUpdate(0);
  };

  const autocompleteHandleClick = () => {
    if (selectedDates.length > 0) {
      const confirmNewSelection = window.confirm(
        "Deseja continuar com a nova seleção e eliminar a anterior?"
      );

      if (!confirmNewSelection) {
        // User chose to keep the existing selection
        return;
      } else {
        // Clear the existing selection data and modal data
        setSelectedDates([]);
        setAutocompleteIsDisabled(false);
        setSelectionInfo({ roomTypeID: null, dates: [] });
        setSelectedCells([]);
        setEndDate(null);
        setEndDate2(null);
        setStartDate(null);
        setStartDate2(null);

        // Reset Pax, Child, and Extra Bed values
        setPaxValues({
          p1: "",
          p2: "",
          p3: "",
          p4: "",
          p5: "",
          p6: "",
          child1: "",
          child2: "",
          child3: "",
          child4: "",
          extraBed: "",
        });
      }
    }
  };

  const handleHeaderChange = (header) => {
    // Check if there are selected dates
    if (selectedDates.length > 0) {
      const confirmNewSelection = window.confirm(
        "Deseja continuar com a nova seleção e eliminar a anterior?"
      );

      if (!confirmNewSelection) {
        // User chose to keep the existing selection
        return;
      } else {
        // Clear the existing selection data and modal data
        setSelectedDates([]);
        setAutocompleteIsDisabled(false);
        setSelectionInfo({ roomTypeID: null, dates: [] });
        setSelectedCells([]);
        setEndDate(null);
        setEndDate2(null);
        setStartDate(null);
        setStartDate2(null);

        // Reset Pax, Child, and Extra Bed values
        setPaxValues({
          p1: "",
          p2: "",
          p3: "",
          p4: "",
          p5: "",
          p6: "",
          child1: "",
          child2: "",
          child3: "",
          child4: "",
          extraBed: "",
        });
      }
    }

    // After handling selection (or if no dates are selected), update the header
    console.log("Selected header:", header);
    setSelectedHeaderID({
      ...selectedHeaderID,
      ID: header,
    });
  };

  const handleHeaderChangeNoFilter = (header) => {
    console.log("Selected header no filter:", header);
    setSelectedHeaderIDNoFilter({
      ...selectedHeaderIDNoFilter,
      ID: header,
    });
  };

  useEffect(() => {
    updateAvailability();
  }, [
    selectedHeaderID,
    prices,
    roomPrices,
    specialPrices,
    peopleCount,
    currentWeekIndex,
  ]);

  // Log the updated state whenever `selectedHeaderID.ID` changes
  useEffect(() => {
    console.log("Selected header (updated):", selectedHeaderID.ID);
  }, [selectedHeaderID.ID]);

  //preços de 1 a 6
  const [paxValues, setPaxValues] = useState({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
    p6: "",
    child1: "",
    child2: "",
    child3: "",
    child4: "",
    extraBed: "",
  });

  const handleInputChange = (e, fieldName) => {
    setPaxValues({
      ...paxValues,
      [fieldName]: e.target.value,
    });
  };

  const sendPaxValuesToAPI = async () => {
    try {
      // Cria uma cópia do estado paxValues para ajustes
      const adjustedRatesPlanner = { ...paxValues };

      // Atribui validFrom e validUntil a partir de startDate e endDate
      adjustedRatesPlanner.validFrom = startDate;
      adjustedRatesPlanner.validUntil = endDate;

      // Atribui roomID e tipologyID a partir das props correspondentes
      adjustedRatesPlanner.roomID = roomID;
      adjustedRatesPlanner.tipologyID = typologyID;

      // Se roomID estiver preenchido, tipologyID deve ficar em branco
      if (adjustedRatesPlanner.roomID) {
        adjustedRatesPlanner.tipologyID = "";
      }

      adjustedRatesPlanner.forcedUpdate = forcedUpdate;

      adjustedRatesPlanner.selectedHeaderID = selectedHeaderID.ID;
      adjustedRatesPlanner.selectedHeaderIDNoFilter =
        selectedHeaderIDNoFilter.ID;

      // Validação dos campos p1 a p6
      if (
        !adjustedRatesPlanner.p1 ||
        !adjustedRatesPlanner.p2 ||
        !adjustedRatesPlanner.p3 ||
        !adjustedRatesPlanner.p4 ||
        !adjustedRatesPlanner.p5 ||
        !adjustedRatesPlanner.p6
      ) {
        alert("Preencha os campos corretamente");
        return;
      }

      // Se algum dos campos child estiver vazio, atribui um valor padrão 0
      Object.keys(adjustedRatesPlanner).forEach((key) => {
        if (key.startsWith("child") && !adjustedRatesPlanner[key]) {
          adjustedRatesPlanner[key] = 0;
        }
      });

      // Adiciona um check para o campo extraBed
      if (!adjustedRatesPlanner.extraBed) {
        adjustedRatesPlanner.extraBed = 0;
      }

      // Envia os dados para a API com o estado ajustado
      const response = await axios.put(
        `/api/v1/prices/priceDescriptionSpecialPrices`,
        {
          validFrom: adjustedRatesPlanner.validFrom,
          validUntil: adjustedRatesPlanner.validUntil,
          roomID: adjustedRatesPlanner.roomID,
          tipologyID: adjustedRatesPlanner.tipologyID,
          p1: adjustedRatesPlanner.p1,
          p2: adjustedRatesPlanner.p2,
          p3: adjustedRatesPlanner.p3,
          p4: adjustedRatesPlanner.p4,
          p5: adjustedRatesPlanner.p5,
          p6: adjustedRatesPlanner.p6,
          childPrice1: adjustedRatesPlanner.child1,
          childPrice2: adjustedRatesPlanner.child2,
          childPrice3: adjustedRatesPlanner.child3,
          childPrice4: adjustedRatesPlanner.child4,
          extraBedPrice: adjustedRatesPlanner.extraBed,
          forcedUpdate: adjustedRatesPlanner.forcedUpdate,
          selectedHeaderIDNoFilter:
            adjustedRatesPlanner.selectedHeaderIDNoFilter !== ""
              ? parseInt(adjustedRatesPlanner.selectedHeaderIDNoFilter)
              : parseInt(adjustedRatesPlanner.selectedHeaderID),
        }
      );

      if (!response.status === 200) {
        throw new Error("Erro ao enviar os dados para a API");
      }

      const data = response.data;
      console.log("Dados enviados com sucesso:", data);
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  const clearData = () => {
    // Aqui você pode limpar os estados ou dados temporários
    setPaxValues({}); // Exemplo de reset dos valores de pax
    setSelectedDates([]); // Reset das datas selecionadas
    // Adicione outras ações de limpeza aqui
  };
  return (
    <div className="w-full">
      {showModal && (
        <>
          <div className="fixed top-0 right-0 bg-lightBlue h-screen w-[22%] z-10">
            <div
              className="mt-20"
              style={{ maxHeight: "calc(100% - 8rem)", overflowY: "auto" }}
            >
              <p className="text-xs text-gray-500 px-4">
                {t("priceManagement.priceTable.priceDescriptionHeader")}
              </p>
              <div className="bg-white border border-gray-300 text-sm px-4 py-1 rounded-lg mt-4 mx-2">
                <HeaderAutocompleteNoFilter
                  style={"mx-2"}
                  label={t("priceManagement.priceTable.priceDescriptionHeader")}
                  onChange={(value) => handleHeaderChangeNoFilter(value)}
                  placeholder={selectedHeaderID.ID}
                />
              </div>
              {selectedDates.map((dateRange, index) => (
                <div
                  className={`bg-white border border-gray-300 text-sm px-4 py-1 rounded-lg mt-4 mx-2 ${
                    index === selectedDates.length - 1 ? "mb-10" : ""
                  }`}
                  key={index}
                >
                  <div className="flex flex-row items-center justify-between border-b-3 border-gray py-2">
                    <div className="flex flex-row items-center gap-4">
                      <FaBed className="" size={25} color="gray" />
                      <p className="text-ml">
                        {" "}
                        {dateRange.roomLabel && `#${dateRange.roomLabel}`}{" "}
                        {dateRange.roomLabel && " | "} {dateRange.tipologyName}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      <ConfirmationBox
                        buttonIcon={
                          <AiFillThunderbolt
                            className="cursor-pointer"
                            size={15}
                            color="blue"
                          />
                        }
                        buttonColor={"transparent"}
                        modalContent={
                          "Tem a certeza de que deseja aplicar o preço desta tipologia a todos os quartos relacionados?"
                        }
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                      />
                      {/*<FaRegTrashAlt
                        className="cursor-pointer"
                        size={15}
                        color={"gray"}
                        onClick={() => removeEvent(index)}
                      />*/}
                    </div>
                  </div>
                  <div className="flex flex-row justify-around py-1">
                    <div className="flex flex-col gap-2">
                      <label>
                        {t("frontOffice.frontDesk.bookings.filters.from")}
                      </label>
                      <input
                        className="outline-none"
                        type="date"
                        name="validFrom"
                        value={dateRange.start}
                        onChange={(e) =>
                          updateDateRange(index, "start", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label>
                        {t("frontOffice.frontDesk.bookings.filters.to")}
                      </label>
                      <input
                        className="outline-none"
                        type="date"
                        name="validUntil"
                        value={dateRange.end}
                        onChange={(e) =>
                          updateDateRange(index, "end", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  {/* Dividindo os inputs em duas linhas de três colunas */}
                  <div className="grid grid-cols-3 gap-4 mt-4 bg-gray-100 rounded-lg px-4 py-2">
                    {["p1", "p2", "p3", "p4", "p5", "p6"].map((pax, idx) => (
                      <div className="flex flex-col" key={idx}>
                        <InputFieldControlled
                          type={"text"}
                          id={pax}
                          name={pax}
                          label={`Pax.${pax.charAt(1)}`}
                          style={"w-full outline-none h-10"}
                          value={paxValues[pax]}
                          onChange={(e) => handleInputChange(e, pax)}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Dividindo os inputs em duas linhas de três colunas */}
                  <div className="grid grid-cols-4 gap-4 mt-4 bg-gray-100 rounded-lg px-4 py-2">
                    {["child1", "child2", "child3", "child4"].map(
                      (pax, idx) => (
                        <div className="flex flex-col" key={idx}>
                          {/* Verificação se existe descrição definida */}
                          {ageConfig[idx]?.ageConfigFieldDescription ? (
                            <Tooltip
                              content={ageConfig[idx].ageConfigFieldDescription}
                              offset={-0.5}
                            >
                              <div>
                                <InputFieldControlled
                                  type={"text"}
                                  id={pax}
                                  name={pax}
                                  label={`Child ${pax.charAt(5)}`}
                                  style={"w-full outline-none h-10"}
                                  value={paxValues[pax]}
                                  onChange={(e) => handleInputChange(e, pax)}
                                />
                              </div>
                            </Tooltip>
                          ) : (
                            <div>
                              <InputFieldControlled
                                type={"text"}
                                id={pax}
                                name={pax}
                                label={`Child ${pax.charAt(5)}`}
                                style={"w-full outline-none h-10"}
                                value={paxValues[pax]}
                                onChange={(e) => handleInputChange(e, pax)}
                              />
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-4 bg-gray-100 rounded-lg px-4 py-2">
                    <InputFieldControlled
                      type={"text"}
                      id={"extraBed"}
                      name={"extraBed"}
                      label={`Extra Bed`}
                      style={"w-20 outline-none h-10"}
                      value={paxValues.extraBed}
                      onChange={(e) => handleInputChange(e, "extraBed")}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 w-full flex justify-center gap-10 p-4 bg-lightBlue">
              <PriceForm
                formTypeModal={0}
                buttonName={t("priceManagement.priceTable.details")}
                //buttonIcon={<FiPlus size={15} />}
                // editIcon={<FaCalendarAlt size={25} color="white" />}
                buttonColor={"primary"}
                modalHeader={t(
                  "frontOffice.ratesPlanner.modal.ratesPlannerHeader"
                )}
                startDate={`${startDate}`}
                room={`${roomID}`}
                header={selectedHeaderID.ID}
                endDate={`${endDate}`}
                tipology={`${typologyID}`}
                selectedDates={selectedDates}
                selectedRoomType={selectedRoomType}
                paxValues={paxValues}
              />
              <button onClick={sendPaxValuesToAPI}>
                {t("priceManagement.priceTable.save")}
              </button>
              <button
                className="text-sm"
                onClick={() => {
                  const userConfirmed = window.confirm(
                    "Quer mesmo cancelar as alterações introduzidas?"
                  );

                  if (userConfirmed) {
                    // Limpa os dados necessários
                    clearData(); // Função que você deve definir para limpar os dados
                    window.location.reload(); // Dá refresh na página
                  } else {
                    // Não faz nada, permanece tudo igual
                  }
                }}
              >
                {t("frontOffice.plans.modals.back")}
              </button>
            </div>
          </div>
        </>
      )}

      <div className={`bg-primary-600 ${showModal ? "py-4" : "py-2"}`}>
        <div className="flex justify-between items-center">
          <div className="flex gap-20 items-center">
            <p className="text-ml text-white px-4">
              <b>{t("priceManagement.priceTable.title")}</b>
            </p>
            <HeaderAutocomplete
              style={"flex space-x-4"}
              label={t("priceManagement.priceTable.priceDescriptionHeader")}
              onChange={(value) => handleHeaderChange(value)}
              placeholder={firstHeaderName}
              isDisabled={autocompleteIsDisabled}
              click={autocompleteHandleClick}
            />
            {/*<CountryAutocomplete
              label={t("priceManagement.priceTable.filters")}
            />*/}
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              {/* Aumentar ou diminuir as pessoas */}
              <span className="text-white" onClick={decreasePeople}>
                <FiMinusSquare size={17} />
              </span>

              <div className="flex flex-row gap-1.5 items-center">
                <span className="text-white">
                  <FaUser size={17} />
                </span>
                <span className="text-white"> {peopleCount}</span>
              </div>

              <span className="text-white" onClick={increasePeople}>
                <FaRegPlusSquare size={17} />
              </span>
            </div>
            <MdOutlineZoomOut
              size={20}
              color="white"
              className="cursor-pointer"
              onClick={handleZoomOutClick}
            />
            {!showModal && (
              <Popover placement="bottom" showArrow offset={10}>
                <PopoverTrigger>
                  <Button color="transparent" className="">
                    <FaCalendarAlt
                      color="white"
                      size={15}
                      className="cursor-pointer"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px]">
                  {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                      <p
                        className="text-small font-bold text-foreground"
                        {...titleProps}
                      >
                        {t("frontOffice.plans.modals.filter")}
                      </p>
                      <div className="mt-2 flex flex-col justify-around">
                        <div className="flex items-center justify-between">
                          <span className="text-center font-bold">
                            {selectedYear}
                          </span>
                          <div className="flex flex-row gap-4">
                            <button
                              onClick={() => handleYearChange("decrement")}
                              className="p-2"
                            >
                              <IoIosArrowUp size={10} />
                            </button>
                            <button
                              onClick={() => handleYearChange("increment")}
                              className="p-2"
                            >
                              <IoIosArrowDown size={10} />
                            </button>
                          </div>
                        </div>
                        {/**EXIBIÇÃO DOS MESES EM 3 COLUNAS E 4 LINHAS */}
                        <div className="mt-4 grid grid-cols-4 gap-2">
                          {months.map((month, index) => (
                            <button
                              key={index}
                              onClick={() => handleMonthChange(index)}
                              className={`p-2 text-center rounded-full w-12 h-12 hover:bg-primary`}
                            >
                              {month}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            )}
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer text-white"
              onClick={goToPreviousWeek}
            />
            <p className="cursor-pointer text-white" onClick={goToCurrentWeek}>
              {t("frontOffice.plans.datatable.today")}
            </p>
            <GrFormNext
              className="w-5 h-5 cursor-pointer text-white"
              onClick={goToNextWeek}
            />
          </div>
        </div>
      </div>
      <table className="w-[100%] bg-tableCol">
        <thead>
          <tr>
            {/*CABEÇALHO DA TABELA C/ FORMATAÇÃO DE DATA */}
            <th className="w-[15%] bg-tableCol text-left px-4">
              {t("priceManagement.priceTable.type/Rooms")}
            </th>
            {weeks[currentWeekIndex].map((day, index) => (
              <td
                key={index}
                className={`w-[5%] h-14 border-tableCol border-l-3 border-r-3 border-b-2 ${
                  day.date.day() === 0 || day.date.day() === 6
                    ? "bg-tableColWeekend"
                    : "bg-lightBlueCol"
                } select-none
              ${
                day.date.isSame(today, "day") ? "bg-primary bg-opacity-30" : ""
              } select-none`}
              >
                <div className="flex flex-col justify-center text-center">
                  <span className="text-xs text-gray-400">
                    {daysOfWeek[day.date.day()]}
                  </span>
                  <span className="text-sm font-bold">
                    {day.date.format("DD")}
                  </span>
                  <span className="text-xs text-gray-400">
                    {months[day.date.month()]}
                  </span>
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {roomTypeState.map((roomType, rowIndex) => {
            const hasRooms = rooms.some(
              (room) => room.roomType === roomType.roomTypeID
            );
            const roomsAssociated = rooms.filter(
              (room) => room.roomType === roomType.roomTypeID
            ).length;

            return (
              <React.Fragment key={roomType.roomTypeID}>
                <tr
                  onClick={() => hasRooms && toggleExpandIndexes(rowIndex)}
                  className={`${
                    !hasRooms ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <td
                    className="text-xs w-full h-8 flex space-x-1 items-center px-4 border-b-2 bg-white relative"
                    title={
                      !hasRooms ? "No rooms associated with this typology" : ""
                    }
                  >
                    {expandedIndexes.includes(rowIndex) && hasRooms ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                    <span>{`${roomType.name} (${roomsAssociated})`}</span>
                  </td>

                  {weeks[currentWeekIndex].map((day, index) => {
                    const formattedDate = day.date.format("YYYY-MM-DD");
                    let typologyPrice =
                      typologyPrices[roomType.roomTypeID]?.[formattedDate] ||
                      "-";

                    if (
                      typeof typologyPrice === "string" &&
                      typologyPrice !== "-"
                    ) {
                      typologyPrice = parseFloat(typologyPrice).toFixed(2);
                    }

                    const isSelected = selectedCells.some(
                      (cell) =>
                        cell.row === rowIndex &&
                        cell.column === index &&
                        !cell.isRoom
                    );

                    return (
                      <td
                        key={index}
                        className={`text-right text-xs border-l-3 border-r-3 border-b-2 rounded-lg
              ${
                day.date.day() === 0 || day.date.day() === 6
                  ? "bg-lightBlueCol"
                  : day.date.isSame(today, "day")
                  ? "bg-primary bg-opacity-30"
                  : "bg-white"
              }
              ${isSelected ? "border-3 border-blue-600 rounded-lg" : ""}
              select-none`}
                        onMouseDown={() => {
                          if (hasRooms) {
                            setIsSelecting(true);
                            handleMouseDown(
                              day.date,
                              roomType.roomTypeID,
                              rowIndex,
                              index,
                              false
                            );
                          }
                        }}
                        onMouseOver={() => {
                          if (isSelecting && hasRooms) {
                            handleMouseOver(day.date, rowIndex, index, false);
                          }
                        }}
                        onMouseUp={() => {
                          setIsSelecting(false);
                          handleMouseUp(day.date, false);
                        }}
                      >
                        {typologyPrice}
                      </td>
                    );
                  })}
                </tr>

                {expandedIndexes.includes(rowIndex) &&
                  hasRooms &&
                  (rooms.filter((room) => room.roomType === roomType.roomTypeID)
                    .length > 0 ? (
                    rooms
                      .filter((room) => room.roomType === roomType.roomTypeID)
                      .map((room, roomIndex) => (
                        <tr key={roomIndex}>
                          <td className="text-xs w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white">
                            {room.label}
                          </td>
                          {weeks[currentWeekIndex].map((day, index) => {
                            const formattedDate = day.date.format("YYYY-MM-DD");

                            // Obtenha o preço padrão da tipologia
                            const typologyPrice =
                              defaultTypologyPrices[roomType.roomTypeID]?.[
                                formattedDate
                              ];

                            // Obtenha o preço do quarto, se existir
                            let roomPrice =
                              pricesRoom[room.roomID]?.[formattedDate];

                            // Verifica se o preço do quarto está herdado
                            const isInherited =
                              roomPrice === undefined || roomPrice === null;

                            // Se o preço do quarto não existir, use o preço da tipologia
                            if (isInherited) {
                              roomPrice = typologyPrice;
                            }

                            // Verifique se há um preço especial para o quarto para o dia em questão
                            const specialPrice =
                              specialRoomPrices[room.roomID]?.[formattedDate];

                            // Se houver um preço especial e for relevante para exibir, use-o
                            if (specialPrice) {
                              roomPrice = specialPrice;
                            }

                            // Se o preço for uma string e não for "-", formate-o
                            if (
                              typeof roomPrice === "string" &&
                              roomPrice !== "-"
                            ) {
                              roomPrice = parseFloat(roomPrice).toFixed(2);
                            }

                            // Verificação para a célula selecionada
                            const isCellSelected = selectedCells.some(
                              (cell) =>
                                cell.row === rowIndex &&
                                cell.column === index &&
                                cell.isRoom &&
                                cell.roomIndex === roomIndex
                            );

                            return (
                              <td
                                key={index}
                                className={`text-right text-xs border-l-3 border-r-3 border-b-2 rounded-lg
        ${
          day.date.day() === 0 || day.date.day() === 6
            ? "bg-lightBlueCol"
            : day.date.isSame(today, "day")
            ? "bg-primary bg-opacity-30"
            : "bg-white"
        }
        ${isCellSelected ? "border-3 border-blue-600 rounded-lg" : ""}
        select-none`}
                                onMouseDown={() => {
                                  setIsSelecting(true);
                                  handleMouseDown(
                                    day.date,
                                    roomType.roomTypeID,
                                    rowIndex,
                                    index,
                                    true,
                                    roomIndex,
                                    room.label,
                                    room.roomID
                                  );
                                }}
                                onMouseOver={() => {
                                  if (isSelecting) {
                                    handleMouseOver(
                                      day.date,
                                      rowIndex,
                                      index,
                                      true,
                                      roomIndex,
                                      room.label,
                                      room.roomID
                                    );
                                  }
                                }}
                                onMouseUp={() => {
                                  setIsSelecting(false);
                                  handleMouseUp(
                                    day.date,
                                    true,
                                    roomIndex,
                                    room.label,
                                    room.roomID
                                  );
                                }}
                              >
                                {/* Apenas aplica a cor cinzenta se o preço for herdado */}
                                {isInherited ? (
                                  <span style={{ color: "gray" }}>
                                    {roomPrice}
                                  </span>
                                ) : (
                                  <span>{roomPrice}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={weeks[currentWeekIndex].length + 1}
                        className="flex flex-row gap-8"
                      >
                        <div className="w-2" />
                        <p className="w-28">
                          No rooms associated with this typology
                        </p>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}

          <tr>
            {/*
            CALCULA A % DE QUARTOS JÁ OCUPADOS
            O% - TODOS OS QUARTOS LIVRES | 100% - TODOS OS QUARTOS OCUPADOS
            */}
            <td className="text-xs w-full h-8 flex justify-between items-center px-4 border-b-2 bg-white">
              <span>{t("frontOffice.typologyPlan.datatable.occupation")}</span>
            </td>
            {weeks[currentWeekIndex].map((day, index) => {
              const totalAvailableRooms = roomTypeState.reduce(
                (acc, roomType) => {
                  return (
                    acc +
                    (availability[roomType.roomTypeID]?.[
                      day.date.format("YYYY-MM-DD")
                    ] || 0)
                  );
                },
                0
              );
              const totalOccupiedRooms = roomTypeState.reduce(
                (acc, roomType) => {
                  const availableRooms =
                    availability[roomType.roomTypeID]?.[
                      day.date.format("YYYY-MM-DD")
                    ] || 0;
                  const occupiedRooms =
                    (roomCounts[roomType.roomTypeID] || 0) - availableRooms;
                  return acc + occupiedRooms;
                },
                0
              );
              const totalRooms = roomTypeState.reduce(
                (acc, roomType) => acc + (roomCounts[roomType.roomTypeID] || 0),
                0
              );
              const dailyOccupancyPercentage =
                totalRooms > 0
                  ? Math.round((totalOccupiedRooms / totalRooms) * 100)
                  : 0;

              return (
                /*
                PINTA A CELULA DE ACORDO COM A %
                VERDE 0 A 49
                AMARELO 50 A 69
                VERMELHO 70 A 100
                */
                <td
                  key={index}
                  className={`text-center text-sm border-l-3 border-r-3 border-b-2 rounded-lg 
                  ${
                    dailyOccupancyPercentage <= 49
                      ? "bg-green bg-opacity-30"
                      : ""
                  } 
                  ${
                    dailyOccupancyPercentage >= 50 &&
                    dailyOccupancyPercentage <= 69
                      ? "bg-yellow-100"
                      : ""
                  } 
                  ${dailyOccupancyPercentage >= 70 ? "bg-red-200" : ""} 
                  border-tableCol select-none`}
                >
                  {dailyOccupancyPercentage}%
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
