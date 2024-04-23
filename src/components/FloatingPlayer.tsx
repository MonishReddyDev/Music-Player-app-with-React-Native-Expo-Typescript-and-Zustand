import { unknownTrackImageUri } from '@/constants/Images'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack } from 'react-native-track-player'
import { StyleSheet, View, Text, ViewProps } from 'react-native'
import { defaultStyles } from '@/styles'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls'
import { TouchableOpacity } from 'react-native'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { MovingText } from './MovingText'

export const Flotingplayer = ({ style }: ViewProps) => {
	const activeTrack = useActiveTrack()

	const lastActiveTrack = useLastActiveTrack()

	//if the active track is null we use this to display the  previous track
	//This will avoud flickering of floatingBar
	const displayedTrack = activeTrack ?? lastActiveTrack

	if (!displayedTrack) return null

	return (
		<TouchableOpacity style={[styles.container, style]}>
			<>
				<FastImage
					source={{
						uri: displayedTrack.artwork ?? unknownTrackImageUri,
					}}
					style={styles.trackArtworkImage}
				/>
				<View style={styles.trackTitleContainer}>
					<MovingText
						style={styles.trackTitle}
						text={displayedTrack.title ?? ''}
						animatedThreshold={25}
					/>
				</View>

				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 15,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		columnGap: 30,
		alignItems: 'center',
		marginRight: 16,
		paddingLeft: 16,
	},
})
