import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { getFeaturedEvents } from '../dummy-data'
import EventList from '../components/events/event-list'
import EventsSearch from '../components/events/events-search'

function HomePage() {
	const router = useRouter()
	const featuredEvents = getFeaturedEvents()

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

export default HomePage
