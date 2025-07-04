import axios from "axios";
import {
  TICKETMASTER_API_KEY,
  TICKETMASTER_BASE_URL,
  TICKETMASTER_COUNTRY_CODE,
  TICKETMASTER_SIZE,
} from "../constants/apiConstants";

export const fetchEvents = async (
  keyword: string,
  city: string,
  page: number
) => {
  try {
    const response = await axios.get(`${TICKETMASTER_BASE_URL}events.json`, {
      params: {
        apikey: TICKETMASTER_API_KEY,
        keyword,
        city: [city],
        countryCode: TICKETMASTER_COUNTRY_CODE,
        page: page,
        size: TICKETMASTER_SIZE,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchEventDetails = async (
  eventId: string,
  locale: string = "ar"
): Promise<any> => {
  try {
    const response = await axios.get(
      `${TICKETMASTER_BASE_URL}events/${eventId}.json`,
      {
        params: {
          apikey: TICKETMASTER_API_KEY,
          locale,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (locale !== "en") {
      return fetchEventDetails(eventId, "en");
    }
    console.error("Error fetching event details:", error);
    throw error;
  }
};
