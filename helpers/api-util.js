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
