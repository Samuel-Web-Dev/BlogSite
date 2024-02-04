import EventList from "@/components/events/event-list";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import { getFeaturedEvents } from "@/helpers/dummy-data";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>Featured Events</title>
        <meta
          name="description"
          content="Find a lot of events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
  };
}

export default HomePage;
