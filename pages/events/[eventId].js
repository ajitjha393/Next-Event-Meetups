import { useRouter } from 'next/router'
import { getEventById } from '../../dummy-data.js'

import EventSummary from '../../components/event-detail/event-summary'
import EventContent from '../../components/event-detail/event-content'
import EventLogistics from '../../components/event-detail/event-logistics'

function EventDetailPage() {
	const { query } = useRouter()

	const eventId = query.eventId

	const event = getEventById(eventId)

	if (!event) {
		return <p>No Event Found</p>
	}

	const { title, description, location, date, image } = event

	return (
		<>
			<EventSummary title={title} />
			<EventLogistics
				date={date}
				address={location}
				image={image}
				imageAlt={title}
			/>
			<EventContent>
				<p>{description}</p>
			</EventContent>
		</>
	)
}

export default EventDetailPage
