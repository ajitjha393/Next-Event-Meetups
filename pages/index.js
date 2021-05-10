import { Fragment } from 'react'
import { useRouter } from 'next/router'
import EventList from '../components/events/event-list'
import EventsSearch from '../components/events/events-search'

import { fetchAllEventsFromAPI } from '../helpers/api-util'

function HomePage({ featuredEvents }) {
	const router = useRouter()

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`

		router.push(fullPath)
	}

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList events={featuredEvents} />
		</Fragment>
	)
}

export async function getStaticProps() {
	const allEvents = await fetchAllEventsFromAPI()

	return {
		props: {
			featuredEvents: allEvents.filter(event => event.isFeatured),
		},
	}
}

export default HomePage
