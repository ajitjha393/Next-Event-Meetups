import axios from 'axios'

export const fetchAllEventsFromAPI = async () => {
	const allEvents = []
	const { data: resData } = await axios.get(
		'https://react-meetup-events-default-rtdb.firebaseio.com/events.json'
	)

	for (const keys in resData) {
		allEvents.push({
			id: keys,
			...resData[keys],
		})
	}

	return allEvents
}

export const getFeaturedEvents = async () => {
	return (await fetchAllEventsFromAPI()).filter(event => event.isFeatured)
}

export const getEventById = async id => {
	return (await fetchAllEventsFromAPI()).find(event => event.id === id)
}

export const getAllEventPaths = async () => {
	return (await fetchAllEventsFromAPI()).map(event => ({
		params: {
			eventId: event.id,
		},
	}))
}

export const getFeaturedEventPaths = async () => {
	return (await getFeaturedEvents()).map(event => ({
		params: {
			eventId: event.id,
		},
	}))
}
