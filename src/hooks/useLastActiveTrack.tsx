import { useEffect, useState } from 'react'
import { Track, useActiveTrack } from 'react-native-track-player'

export const useLastActiveTrack = () => {
	const activeTrack = useActiveTrack()
	const [lastActiveTrack, setlastActiveTrack] = useState<Track>()

	useEffect(() => {
		if (!activeTrack) return

		setlastActiveTrack(activeTrack)
	}, [activeTrack])
	return lastActiveTrack
}
