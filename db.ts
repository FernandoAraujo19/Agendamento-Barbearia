import type { Service, Barber, Appointment, DayHours, SiteContent } from './types';
import { 
    SERVICES as INITIAL_SERVICES, 
    BARBERS as INITIAL_BARBERS, 
    INITIAL_APPOINTMENTS,
    initialSchedule,
    initialSiteContent,
    initialAdminPassword
} from './constants';

const DB_KEY = 'barberShopDatabase';

export interface Database {
    services: Service[];
    barbers: Barber[];
    appointments: Appointment[];
    schedule: DayHours[];
    siteContent: SiteContent;
    adminPassword: string;
}

function getInitialData(): Database {
    return {
        services: INITIAL_SERVICES,
        barbers: INITIAL_BARBERS,
        appointments: INITIAL_APPOINTMENTS,
        schedule: initialSchedule,
        siteContent: initialSiteContent,
        adminPassword: initialAdminPassword,
    };
}

export function saveDatabase(db: Database) {
    try {
        const serializableDb = {
            ...db,
            appointments: db.appointments.map(app => ({
                ...app,
                date: app.date.toISOString(),
            })),
        };
        localStorage.setItem(DB_KEY, JSON.stringify(serializableDb));
    } catch (error) {
        console.error("Could not save data to local storage", error);
    }
}

export function loadDatabase(): Database {
    try {
        const data = localStorage.getItem(DB_KEY);
        if (data) {
            const parsedData = JSON.parse(data);
            // Rehydrate dates from ISO strings
            parsedData.appointments = parsedData.appointments.map((app: any) => ({
                ...app,
                date: new Date(app.date),
            }));
            return parsedData;
        }
    } catch (error) {
        console.error("Could not load data from local storage", error);
    }

    // If no data, or on error, initialize with default data and save it
    const initialData = getInitialData();
    saveDatabase(initialData);
    return initialData;
}
