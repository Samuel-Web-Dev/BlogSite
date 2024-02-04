import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Comments from "@/components/input/comments";
import ErrorAlert from "@/components/ui/error-alert";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "@/helpers/dummy-data";
import Head from "next/head";
// import { useRouter } from 'next/router'
import { Fragment } from "react";

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return <div className="center">Loading...</div>;
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={`${event.description}`} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  try {
    const eventId = context.params.eventid;
    const event = await getEventById(eventId);

    if (!event) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        selectedEvent: event,
      },
      revalidate: 30,
    };
  } catch (error) {
    console.error("Error fetching static props:", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventid: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
