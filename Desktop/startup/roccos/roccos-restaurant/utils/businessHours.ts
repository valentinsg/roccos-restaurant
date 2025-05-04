interface TimeRange {
  start: string;
  end: string;
}

interface DaySchedule {
  isOpen: boolean;
  hours: TimeRange[];
}

interface WeekSchedule {
  [key: string]: DaySchedule;
}

const BUSINESS_HOURS: WeekSchedule = {
  0: { // Domingo
    isOpen: true,
    hours: [
      { start: '10:00', end: '15:00' },
      { start: '19:00', end: '00:30' }
    ]
  },
  1: { // Lunes
    isOpen: true,
    hours: [
      { start: '10:00', end: '15:00' },
      { start: '19:00', end: '01:00' }
    ]
  },
  2: { // Martes
    isOpen: false,
    hours: []
  },
  3: { // Miércoles
    isOpen: true,
    hours: [
      { start: '10:00', end: '15:00' },
      { start: '19:00', end: '01:00' }
    ]
  },
  4: { // Jueves
    isOpen: true,
    hours: [
      { start: '10:00', end: '15:00' },
      { start: '19:00', end: '01:00' }
    ]
  },
  5: { // Viernes
    isOpen: true,
    hours: [
      { start: '10:00', end: '15:00' },
      { start: '19:00', end: '01:00' }
    ]
  },
  6: { // Sábado
    isOpen: true,
    hours: [
      { start: '10:00', end: '15:00' },
      { start: '19:00', end: '01:00' }
    ]
  }
};

function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function getCurrentTime(): { minutes: number; day: number } {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const day = now.getDay();
  return { minutes, day };
}

function adjustForAfterMidnight(timeInMinutes: number, compareTime: number): number {
  // Si el tiempo de cierre es menor que el de apertura, significa que es después de medianoche
  if (timeInMinutes < compareTime) {
    timeInMinutes += 24 * 60; // Añadir 24 horas en minutos
  }
  return timeInMinutes;
}

export function isBusinessOpen(): { isOpen: boolean; nextOpeningInfo: string } {
  const { minutes: currentMinutes, day } = getCurrentTime();
  const schedule = BUSINESS_HOURS[day];

  // Si el día está marcado como cerrado
  if (!schedule.isOpen) {
    // Encontrar el próximo día que abre
    let nextDay = day;
    let daysUntilOpen = 0;
    do {
      nextDay = (nextDay + 1) % 7;
      daysUntilOpen++;
      if (daysUntilOpen > 7) break; // Evitar bucle infinito
    } while (!BUSINESS_HOURS[nextDay].isOpen);

    const nextDayName = getDayName(nextDay);
    const nextOpeningTime = BUSINESS_HOURS[nextDay].hours[0].start;
    return {
      isOpen: false,
      nextOpeningInfo: `Abrimos el ${nextDayName} a las ${nextOpeningTime}hs`
    };
  }

  // Verificar cada rango horario del día
  for (const range of schedule.hours) {
    let startMinutes = parseTime(range.start);
    let endMinutes = parseTime(range.end);
    
    // Ajustar para horarios después de medianoche
    const currentAdjustedMinutes = adjustForAfterMidnight(currentMinutes, startMinutes);
    endMinutes = adjustForAfterMidnight(endMinutes, startMinutes);

    if (currentAdjustedMinutes >= startMinutes && currentAdjustedMinutes < endMinutes) {
      return {
        isOpen: true,
        nextOpeningInfo: `Abierto hasta las ${range.end}hs`
      };
    }
  }

  // Si no está abierto ahora, encontrar el próximo horario de apertura
  const nextOpeningInfo = getNextOpeningInfo(day, currentMinutes);
  return {
    isOpen: false,
    nextOpeningInfo
  };
}

function getNextOpeningInfo(currentDay: number, currentMinutes: number): string {
  // Primero verificar si hay más horarios hoy
  const todaySchedule = BUSINESS_HOURS[currentDay];
  if (todaySchedule.isOpen) {
    for (const range of todaySchedule.hours) {
      const startMinutes = parseTime(range.start);
      if (startMinutes > currentMinutes) {
        return `Abrimos hoy a las ${range.start}hs`;
      }
    }
  }

  // Si no hay más horarios hoy, buscar el próximo día que abre
  let nextDay = currentDay;
  let daysChecked = 0;
  do {
    nextDay = (nextDay + 1) % 7;
    daysChecked++;
    if (BUSINESS_HOURS[nextDay].isOpen && BUSINESS_HOURS[nextDay].hours.length > 0) {
      const nextDayName = getDayName(nextDay);
      const nextOpeningTime = BUSINESS_HOURS[nextDay].hours[0].start;
      return `Abrimos el ${nextDayName} a las ${nextOpeningTime}hs`;
    }
  } while (daysChecked < 7);

  return "Horario no disponible";
}

function getDayName(day: number): string {
  const days = [
    'domingo', 'lunes', 'martes', 'miércoles',
    'jueves', 'viernes', 'sábado'
  ];
  return days[day];
}

function formatTime(time: string): string {
  return time; // Simplemente retornamos el tiempo en formato 24hs
}

export function getBusinessHours(): WeekSchedule {
  return BUSINESS_HOURS;
} 