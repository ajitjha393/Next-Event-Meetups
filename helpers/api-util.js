import axios from 'axios'

export const fetchAllEventsFromAPI = () => {
	return axios.get(
		'https://react-meetup-events-default-rtdb.firebaseio.com/events.json'
	)
}
