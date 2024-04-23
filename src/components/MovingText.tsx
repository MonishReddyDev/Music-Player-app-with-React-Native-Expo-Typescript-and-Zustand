import { useEffect } from 'react'
import Animated, {
	Easing,
	StyleProps,
	useAnimatedStyle,
	useSharedValue,
	cancelAnimation,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

export type MovingTextProps = {
	text: string
	animatedThreshold: number // Corrected prop name
	style?: StyleProps
}

export const MovingText = ({ text, animatedThreshold, style }: MovingTextProps) => {
	const translateX = useSharedValue(0)
	const shouldAnimate = text.length >= animatedThreshold

	const textWidth = text.length * 3

	useEffect(() => {
		if (!shouldAnimate) return

		translateX.value = withDelay(
			1000,
			withRepeat(
				withTiming(-textWidth, {
					duration: 5000,
					easing: Easing.linear,
				}),
				-1,
				true,
			),
		)

		return () => {
			cancelAnimation(translateX) // Proper cleanup of animation
		}
	}, [translateX, text, animatedThreshold, shouldAnimate, textWidth])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		}
	})

	return (
		<Animated.Text
			numberOfLines={1}
			style={[style, animatedStyle, shouldAnimate && { width: 9999, paddingLeft: 16 }]}
		>
			{text}
		</Animated.Text>
	)
}
