import { TracksListItem } from './TrackListItem'
import { FlatList, FlatListProps, View, Text } from 'react-native'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/Images'

export type TrackListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const Itemdivider = () => {
	return <View style={{ ...utilsStyles.itemSaperator, marginVertical: 9, marginLeft: 60 }}></View>
}

export const TracksList = ({ tracks, ...FlatListProps }: TrackListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}
	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ItemSeparatorComponent={Itemdivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No Songs found</Text>
					<FastImage
						source={{
							uri: unknownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			ListFooterComponent={Itemdivider}
			renderItem={({ item: track }) => (
				<TracksListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...FlatListProps}
		/>
	)
}
