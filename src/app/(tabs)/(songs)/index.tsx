import { defaultStyles } from '@/styles'
import { ScrollView, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import library from '@/assets/data/library.json'
import { trackTitleFilter } from '@/helpers/filter'

const SongsScreen = () => {
	const search = useNavigationSearch({
		SearchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const filteredTrack = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TracksList tracks={filteredTrack} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
