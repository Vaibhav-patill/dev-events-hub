import EventCart from "@/components/EventCart";
import Explorebtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";
import React from "react";

const Page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons,Meetups and Conferences,All in one space
      </p>

      <Explorebtn />
      <div className="mt-20 space-y-7">
        <h3>Feature Events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.title}>
              <EventCart {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
