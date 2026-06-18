import { lazy, Suspense } from "react";
import PopularAds from "../PopularAds/PopularAds";
import BookingPage from "../BookingPage/BookingPage";

const DataHomePage = lazy(() => import("../DataHomePage/DataHomePage"));

export default function Home() {
  return (
    <>
      <BookingPage />
      <PopularAds />
      <Suspense fallback={<div className="h-64" />}>
        <DataHomePage />
      </Suspense>
    </>
  )
}