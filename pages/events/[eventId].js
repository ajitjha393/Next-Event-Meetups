import EventSummary from '../../components/event-detail/event-summary'
import EventContent from '../../components/event-detail/event-content'
import EventLogistics from '../../components/event-detail/event-logistics'

import ErrorAlert from '../../components/ui/error-alert'

import { getEventById, getFeaturedEventPaths } from '../../helpers/api-util'

function EventDetailPage({ selectedEvent }) {
	if (!selectedEvent) {
		return (
			<ErrorAlert>
				<p>No Event Found</p>
			</ErrorAlert>
		)
	}

	const { title, description, location, date, image } = selectedEvent

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

export async function getStaticProps(context) {
	const { params } = context

	return {
		props: {
			selectedEvent: await getEventById(params.eventId),
		},
		revalidate: 30,
	}
}

export async function getStaticPaths() {
	return {
		paths: await getFeaturedEventPaths(),
		fallback: false,
	}
}
