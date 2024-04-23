import React from 'react'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { colors, fontSize } from '@/constants/tokens'
import { BlurView } from 'expo-blur'
import { Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons'
import { Flotingplayer } from '@/components/FloatingPlayer'

const TabsNavigation = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: fontSize.xs,
						fontWeight: '500',
					},
					headerShown: false,
					tabBarStyle: {
						position: 'absolute',
						borderTopRightRadius: 20,
						borderTopLeftRadius: 20,
						borderTopWidth: 0,
						paddingTop: 10,
					},
					tabBarBackground: () => (
						<BlurView
							intensity={95}
							style={{
								...StyleSheet.absoluteFillObject,
								overflow: 'hidden',
								borderTopRightRadius: 20,
								borderTopLeftRadius: 20,
							}}
						/>
					),
				}}
			>
				<Tabs.Screen
					name="favorites"
					//Here the color is taken form the tabBarActiveTintColor from the <Tabs/>
					options={{
						title: 'Favorites',
						tabBarIcon: ({ color }) => <Ionicons name="heart" color={color} size={20} />,
					}}
				/>
				<Tabs.Screen
					name="playlists"
					//Here the color is taken form the tabBarActiveTintColor from tge <Tabs/>
					options={{
						title: 'Playlists',
						tabBarIcon: ({ color }) => (
							<MaterialIcons name="playlist-play" color={color} size={28} />
						),
					}}
				/>
				<Tabs.Screen
					name="(songs)"
					//Here the color is taken form the tabBarActiveTintColor from tge <Tabs/>
					options={{
						title: 'Songs',
						tabBarIcon: ({ color }) => (
							<Ionicons name="musical-notes-sharp" color={color} size={24} />
						),
					}}
				/>
				<Tabs.Screen
					name="artists"
					//Here the color is taken form the tabBarActiveTintColor from tge <Tabs/>
					options={{
						title: 'Artists',
						tabBarIcon: ({ color }) => <FontAwesome6 name="users-line" color={color} size={20} />,
					}}
				/>
			</Tabs>

			<Flotingplayer
				style={{
					position: 'absolute',
					left: 8,
					right: 8,
					bottom: 78,
				}}
			/>
		</>
	)
}
export default TabsNavigation
