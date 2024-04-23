import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useLayoutEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { SplashScreen } from 'expo-router'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'

SplashScreen.preventAutoHideAsync()

//This will be the entry point of the application
const App = () => {
	//Loading....... Part of code
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])
	useSetupTrackPlayer({
		onLoading: handleTrackPlayerLoaded,
	})
	useLogTrackPlayerState()

	return (
		<SafeAreaProvider>
			<RootNavigation />
			<StatusBar style="auto" />
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	)
}

export default App
