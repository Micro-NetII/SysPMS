"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export function useUpdateAvailability() {
    const [typologyPrices, setTypologyPrices] = useState({});
    const [pricesRoom, setPricesRoom] = useState({});
    const [defaultTypologyPrices, setDefaultTypologyPrices] = useState({});
    const [availability, setAvailability] = useState({});
    const [totalOverbookings, setTotalOverbookings] = useState({});
    const [overbookings, setOverbookings] = useState({});
    const [updatedAvailability, setUpdatedAvailability] = useState({});

    const updateAvailability = async ({
        prices,
        roomPrices,
        specialPrices,
        weeks,
        currentWeekIndex,
        peopleCount,
        roomTypeState,
        reservation,
        roomCounts
    }) => {
        const priceKey = `p${peopleCount}`;

        // Filtrar preços
        const filterPrices = (arr) => arr.filter(price => price.priceDescriptionHeaderID === 76);

        const filteredPrices = filterPrices(prices);
        const filteredPricesRooms = filterPrices(roomPrices);

        let typologyPrices = {};
        let updateRoomPrices = {};
        let defaultTypologyPrices = {};
        let updatedAvailability = {};
        let dailyOverbookings = {};

        const setPrices = (filteredPrices, target, isRoomPrices = false) => {
            filteredPrices.forEach(price => {
                const key = isRoomPrices ? 'roomID' : 'typologyID';
                const id = price[key];
                let priceForPeopleCount = price[priceKey];

                if (priceForPeopleCount !== undefined && priceForPeopleCount !== null) {
                    priceForPeopleCount = parseFloat(priceForPeopleCount).toFixed(2);
                }

                if (!target[id]) {
                    target[id] = {};
                }

                weeks[currentWeekIndex].forEach(day => {
                    const dayFormat = day.date.toISOString().split("T")[0];
                    target[id][dayFormat] = priceForPeopleCount;
                });
            });
        };

        setPrices(filteredPrices, typologyPrices);
        setPrices(filteredPricesRooms, updateRoomPrices, true);

        // Mapear preços especiais
        const specialPricesMap = specialPrices.reduce((map, price) => {
            if (!map[price.priceDescriptionHeaderID]) {
                map[price.priceDescriptionHeaderID] = [];
            }
            map[price.priceDescriptionHeaderID].push(price);
            return map;
        }, {});

        const getSpecialPrice = (typologyID, roomID, dayFormat) => {
            const pricesForType = specialPricesMap[76] || [];
            let applicablePrice = null;

            for (const price of pricesForType) {
                const validFrom = price.validFrom.split("T")[0];
                const validUntil = price.validUntil.split("T")[0];

                if (
                    (price.typologyID === parseInt(typologyID) ||
                    price.roomID === parseInt(roomID)) &&
                    validFrom <= dayFormat &&
                    validUntil >= dayFormat
                ) {
                    if (
                        !applicablePrice ||
                        new Date(validUntil) > new Date(applicablePrice.validUntil)
                    ) {
                        applicablePrice = price;
                    }
                }
            }

            return applicablePrice;
        };

        const applySpecialPrices = (target, isRoomPrices = false) => {
            Object.keys(target).forEach(id => {
                weeks[currentWeekIndex].forEach(day => {
                    const dayFormat = day.date.toISOString().split("T")[0];
                    const specialPrice = getSpecialPrice(isRoomPrices ? null : id, isRoomPrices ? id : null, dayFormat);

                    if (specialPrice) {
                        target[id][dayFormat] = specialPrice[priceKey];
                    }
                });
            });
        };

        applySpecialPrices(typologyPrices);
        applySpecialPrices(updateRoomPrices, true);

        // Garantir preços de quartos
        Object.keys(updateRoomPrices).forEach(roomID => {
            weeks[currentWeekIndex].forEach(day => {
                const dayFormat = day.date.toISOString().split("T")[0];
                if (!updateRoomPrices[roomID][dayFormat]) {
                    const typologyID = roomPrices.find(
                        roomPrice => roomPrice.roomID === parseInt(roomID)
                    )?.typologyID;
                    if (typologyID) {
                        updateRoomPrices[roomID][dayFormat] =
                            defaultTypologyPrices[typologyID][dayFormat];
                    }
                }
            });
        });

        // Atualizar disponibilidade
        roomTypeState.forEach(roomType => {
            weeks[currentWeekIndex].forEach(day => {
                const dayFormat = day.date.toISOString().split("T")[0];
                const filteredReservations = reservation.filter(res =>
                    dayjs(res.checkInDate).startOf('day').isSameOrBefore(day.date) &&
                    dayjs(res.checkOutDate).endOf('day').subtract(2, 'hours').isAfter(day.date) &&
                    res.roomTypeNumber === roomType.roomTypeID
                );

                const reservedRooms = filteredReservations.length;
                const totalRooms = roomCounts[roomType.roomTypeID] || 0;
                const availableRooms = totalRooms - reservedRooms;

                if (!updatedAvailability[roomType.roomTypeID]) {
                    updatedAvailability[roomType.roomTypeID] = {};
                }
                updatedAvailability[roomType.roomTypeID][dayFormat] = availableRooms;

                if (!dailyOverbookings[dayFormat]) {
                    dailyOverbookings[dayFormat] = 0;
                }

                if (availableRooms < 0) {
                    dailyOverbookings[dayFormat] += Math.abs(availableRooms);
                }
            });
        });

        // Atualizar estados
        setTypologyPrices(typologyPrices);
        setPricesRoom(updateRoomPrices);
        setDefaultTypologyPrices(defaultTypologyPrices);
        setAvailability(updatedAvailability);
        setTotalOverbookings(dailyOverbookings);
        setOverbookings(dailyOverbookings);
    };

    useEffect(() => {
        setUpdatedAvailability(prev => {
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

    return {
        updateAvailability,
        typologyPrices,
        pricesRoom,
        defaultTypologyPrices,
        availability,
        totalOverbookings,
        overbookings,
        updatedAvailability
    };
}
