import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import { Fragment } from 'react'
import ResultsTitle from '../../components/events/results-title'

function FilteredEventsPage() {
	const router = useRouter()
	const filterData = router.query.slug
	console.log(filterData)
	if (!filterData) {
		return <p className="center">Loading</p>
	}

	const numYear = +filterData[0]
	const numMonth = +filterData[1]

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12
	) {
		return <p>Invalid Filter. Please adjust your values</p>
	}

	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth,
	})

	if (!filteredEvents || filteredEvents.length === 0) {
		return <p>No events found for the chosen filter</p>
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
