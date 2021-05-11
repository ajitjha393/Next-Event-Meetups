import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { fetchAllEventsFromAPI } from '../../helpers/api-util'

function AllEventsPage({ events }) {
	const router = useRouter()

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`

		router.push(fullPath)
	}

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList events={events} />
		</Fragment>
	)
}

export default AllEventsPage

export async function getStaticProps() {
	return {
		props: {
			events: await fetchAllEventsFromAPI(),
		},
		revalidate: 60,
	}
}
