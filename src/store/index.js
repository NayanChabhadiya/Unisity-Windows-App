import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import orgSlice from "./ApiSlice/orgSlice";
import examSlice from "./ApiSlice/examSlice";
import noteSlice from "./ApiSlice/noteSlice";
import authSlice from "./ApiSlice/authSlice";
import eventSlice from "./ApiSlice/eventSlice";
import projectSlice from "./ApiSlice/projectSlice";
import sideBarSlice from "./ApiSlice/sidebarSlice";
import studentSlice from "./ApiSlice/studentSlice";
import facultySlice from "./ApiSlice/facultySlice";
import contactSlice from "./ApiSlice/contactSlice";
import enchargeSlice from "./ApiSlice/enchargeSlice";
import semesterSlice from "./ApiSlice/semesterSlice";
import materialSlice from "./ApiSlice/materialSlice";
import timetableSlice from "./ApiSlice/timetableSlice";
import announceSlice from "./ApiSlice/announcementSlice";
import imageUploadSlice from "./ApiSlice/imageUploadSlice";
import emailUserSlice from "./ApiSlice/emailUserSlice";
import accountSlice from "./ApiSlice/accountSlice";
import buttonSlice from "./ApiSlice/buttonSlice";

const reducers = combineReducers({
  orgs: orgSlice,
  auth: authSlice,
  notes: noteSlice,
  exams: examSlice,
  events: eventSlice,
  sidebar: sideBarSlice,
  projects: projectSlice,
  contacts: contactSlice,
  students: studentSlice,
  faculties: facultySlice,
  images: imageUploadSlice,
  encharges: enchargeSlice,
  semesters: semesterSlice,
  materials: materialSlice,
  emilUsers: emailUserSlice,
  timeTables: timetableSlice,
  announcements: announceSlice,
  accounts: accountSlice,
  buttons: buttonSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "orgs",
    "notes",
    "exams",
    "images",
    "events",
    "sidebar",
    "students",
    "projects",
    "contacts",
    "faculties",
    "encharges",
    "semesters",
    "materials",
    "timeTables",
    "emailUsers",
    "announcements",
    "accounts",
    "buttons",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
  // devTools: false,
});

export const persistor = persistStore(store);
export default store;
