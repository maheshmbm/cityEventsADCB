import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchEventDetails, fetchEvents } from "../../apiCalls/ticketMaster";

interface EventImage {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images?: EventImage[];
  timezone?: string;
  city?: { name: string };
  country?: { name: string; countryCode: string };
  address?: { line1: string };
  location?: { longitude: string; latitude: string };
  upcomingEvents?: Record<string, number>;
  _links?: { self: { href: string } };
}

interface EventEmbedded {
  venues?: Venue[];
  attractions?: any[];
}

interface Event {
  description: any;
  id: string;
  name: string;
  type: string;
  test: boolean;
  url: string;
  locale: string;
  images: EventImage[];
  sales?: any;
  dates?: any;
  classifications?: any[];
  promoter?: any;
  promoters?: any[];
  seatmap?: any;
  ticketing?: any;
  _links?: any;
  _embedded?: EventEmbedded;
  isFavorite?: boolean;
}

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchEventsAsync = createAsyncThunk(
  "events/fetchEvents",
  async (
    params: { keyword: string; city: string; page: number },
    { getState }
  ) => {
    const response = await fetchEvents(
      params.keyword,
      params.city,
      params.page
    );
    return {
      events: response.data._embedded?.events || [],
      page: response.data.page?.number || params.page,
      totalPages: response.data.page?.totalPages || params.page,
    };
  }
);

export const fetchEventDetailsAsync = createAsyncThunk(
  "events/fetchEventDetails",
  async (eventId: string) => {
    const data = await fetchEventDetails(eventId);
    return data;
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const event = state.events.find((event) => event.id === action.payload);
      if (event) {
        event.isFavorite = !event.isFavorite;
      }
    },
    resetEvents: (state) => {
      state.events = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.events = action.payload.events.map((event: Event) => ({
            ...event,
            isFavorite: false,
          }));
        } else {
          state.events = [
            ...state.events,
            ...action.payload.events.map((event: Event) => ({
              ...event,
              isFavorite: false,
            })),
          ];
        }
        state.page = action.payload.page;
        state.hasMore = action.payload.page < action.payload.totalPages;
      })
      .addCase(fetchEventsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch events";
      })
      .addCase(fetchEventDetailsAsync.fulfilled, (state, action) => {
        const idx = state.events.findIndex((e) => e.id === action.payload.id);
        const isFavorite = idx !== -1 ? state.events[idx].isFavorite : false;
        if (idx !== -1) {
          state.events[idx] = { ...action.payload, isFavorite };
        } else {
          state.events.push({ ...action.payload, isFavorite: false });
        }
      });
  },
});

export const { toggleFavorite, resetEvents } = eventSlice.actions;

export default eventSlice.reducer;
