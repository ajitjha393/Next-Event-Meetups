import { getFilteredEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import { Fragment, useState, useEffect } from 'react'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import useSWR from 'swr'
import { useRouter } from 'next/router'

function FilteredEventsPage({ hasError, filteredEvents, dateParams }) {
	const [loadedEvents, setLoadedEvents] = useState(null)
	const { query } = useRouter()
	const filterData = query.slug

	const { data, error } = useSWR(
		'https://react-meetup-events-default-rtdb.firebaseio.com/events.json'
	)

	useEffect(() => {
		if (data) {
			const events = []

			for (const keys in data) {
				events.push({
					id: keys,
					...data[keys],
				})
			}

			setLoadedEvents(events)
		}
	}, [data])

	if (!loadedEvents) {
		return <p className="center">Loading...</p>
	}

	const numYear = +filterData[0]
	const numMonth = +filterData[1]

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid Filter. Please adjust your values</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All events</Button>
				</div>
			</Fragment>
		)
	}

	const filteredEvents = loadedEvents.filter(event => {
		const eventDate = new Date(event.date)
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		)
	})

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found for the chosen filter</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All events</Button>
				</div>
			</Fragment>
		)
	}

	const date = new Date(numYear, numMonth - 1)
	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList events={filteredEvents} />
		</Fragment>
	)
}

export default FilteredEventsPage
