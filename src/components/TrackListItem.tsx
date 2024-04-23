import { unknownArtictImageUri, unknownTrackImageUri } from '@/constants/Images'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import React from 'react'
import LoaderKit from 'react-native-loader-kit'
import { TouchableHighlight, View, StyleSheet, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Entypo, Ionicons } from '@expo/vector-icons'

export type TracksListItemProps = {
	track: Track
	onTrackSelect: (track: Track) => void
}

export const TracksListItem = ({
	track,
	onTrackSelect: handleTrackSelect,
}: TracksListItemProps) => {
	//ActiveTrack === CurrentTrack and the track is in active State
	const isActiveTrack = useActiveTrack()?.url == track.url

	const { playing } = useIsPlaying()

	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={styles.trackItemContainer}>
				<>
					<View>
						<FastImage
							source={{
								uri: track.artwork ?? unknownTrackImageUri,
								priority: FastImage.priority.normal,
							}}
							style={{
								...styles.trackArtworkImage,
								opacity: isActiveTrack ? 0.6 : 1,
							}}
						/>

						{isActiveTrack &&
							(playing ? (
								<LoaderKit
									name="LineScaleParty"
									style={styles.trackPlayingIconIndicator}
									color={colors.icon}
								/>
							) : (
								<Ionicons
									name="play"
									style={styles.trackPausedIndicator}
									size={24}
									color={colors.icon}
								/>
							))}
					</View>
					<View style={styles.ItemContainer}>
						<View style={{ width: '100%' }}>
							<Text
								numberOfLines={1}
								style={{
									...styles.trackTitleText,
									color: isActiveTrack ? colors.primary : colors.text,
								}}
							>
								{track.title}
							</Text>
							{track.artist && (
								<Text numberOfLines={1} style={styles.trackArtistText}>
									{track.artist}
								</Text>
							)}
						</View>
						<Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
					</View>
				</>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 18,
		left: 16,
		width: 16,
		height: 16,
	},
	trackPausedIndicator: {
		position: 'absolute',
		top: 14,
		left: 14,
	},
	ItemContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	trackArtworkImage: {
		borderRadius: 8,
		height: 50,
		width: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
})
