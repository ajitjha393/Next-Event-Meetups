import { useRouter } from 'next/router'
import { getEventById } from '../../dummy-data.js'

function EventDetailPage() {
	const { query } = useRouter()

	const eventId = query.eventId

	const event = getEventById(eventId)

	if (!event) {
		return <p>No Event Found</p>
	}

	return (
		<div>
			<h1>Selected Event Detail Page!</h1>
		</div>
	)
}

export default EventDetailPage
