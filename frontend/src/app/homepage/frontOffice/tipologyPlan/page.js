'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import moment from 'moment';
import interactionPlugin from '@fullcalendar/interaction';

export default function TipologyAgenda() {
  const [roomTypeState, setRoomTypeState] = useState([]);
  const [roomCounts, setRoomCounts] = useState({});
  const [reservation, setReservation] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const resTipologies = await axios.get(`/api/v1/hotel/tipologys`);
        setRoomTypeState(resTipologies.data.response);

        let tempRoomCounts = {};
        await Promise.all(resTipologies.data.response.map(async (tipology) => {
          const resRooms = await axios.get(`/api/v1/hotel/rooms/tipologys/${tipology.roomTypeID}`);
          tempRoomCounts[tipology.roomTypeID] = resRooms.data.response.length; // Corrigido aqui
        }));

        setRoomCounts(tempRoomCounts);

        const resBookings = await axios.get(`/api/v1/frontOffice/reservations`);
        setReservation(resBookings.data.response);
        console.log("bookings: ", resBookings.data.response);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    getData();
  }, []);

  const getEvents = () => {
    const events = [];
    let currentDate = moment().subtract(1, 'years').startOf('day');
    const endDate = moment().add(1, 'years').endOf('day');

    while (currentDate <= endDate) {
      roomTypeState.forEach(roomType => {
        const roomCount = roomCounts[roomType.roomTypeID] || 0;
        const filteredReservations = reservation.filter(reservation =>
          moment(reservation.checkInDate).startOf('day').isSameOrBefore(currentDate, 'day') &&
          moment(reservation.checkOutDate).endOf('day').subtract(2, 'hours').isAfter(currentDate, 'day') &&
          reservation.roomTypeNumber === roomType.roomTypeID
        );

        let reservedRooms = filteredReservations.length;
        if (filteredReservations.some(reservation => moment(reservation.checkOutDate).startOf('day').isSame(currentDate, 'day'))) {
          reservedRooms--;
        }
        const availableRooms = roomCount - reservedRooms;
        const event = {
          title: `${availableRooms}`,
          start: currentDate.format('YYYY-MM-DD'),
          end: currentDate.format('YYYY-MM-DD'),
          resourceId: roomType.roomTypeID,
          extendedProps: {
            roomCount: availableRooms
          }
        };

        events.push(event);
      });

      currentDate.add(1, 'day');
    }

    return events;
  }

  const handleDateSelect = (info) => {
    console.log("Date selected:", info.startStr);
    setSelectedDate(info.startStr);
  };

  return (
    <FullCalendar
      plugins={[resourceTimelinePlugin, interactionPlugin]}
      selectable={true}
      resourceSelectable={true}
      resourceAreaSelectable={true}
      resourceAreaWidth="15%"
      resourceAreaHeaderContent={() => 'Tipologias'}
      initialView="resourceTimelineWeek"
      resources={roomTypeState.map(roomType => ({
        id: roomType.roomTypeID,
        title: roomType.name,
        extendedProps: {
          number: roomCounts[roomType.roomTypeID] || 0
        }
      }))}
      events={getEvents()}
      resourceLabelContent={(args) => {
        // args contém informações sobre o recurso
        return (
          <>
            <span>{args.resource.title}</span>
            <span className="float-right">{args.resource.extendedProps.number}</span>
          </>
        );
      }}
      slotLabelInterval={{ days: 1 }} // Define o intervalo de etiquetas para cada dia
      slotDuration={{ days: 1 }} // Define a duração de cada slot como um dia inteiro
      slotLabelFormat={[ // Formatação para mostrar a data no formato dia.mes.ano
        { weekday: 'long' },
        { day: '2-digit', month: '2-digit', year: 'numeric', omitCommas: true } // omitCommas remove as vírgulas padrão
      ]}
      headerToolbar={{
        left: 'prev,next',
        //center: 'title',
        right: 'resourceTimelineWeek,resourceTimelineMonth'
      }}
      select={handleDateSelect}
    />
  );
}



