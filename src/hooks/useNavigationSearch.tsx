import { colors } from '@/constants/tokens'
import { useNavigation } from 'expo-router'
import { useLayoutEffect, useState } from 'react'
import { SearchBarProps } from 'react-native-screens'

const defaultSearchOptions: SearchBarProps = {
	tintColor: colors.primary,
	hideWhenScrolling: false,
}

export const useNavigationSearch = ({
	SearchBarOptions,
}: {
	SearchBarOptions?: SearchBarProps
}) => {
	const [search, setSearch] = useState('')

	const navigation = useNavigation()

	const handleOnChangeText: SearchBarProps['onChangeText'] = ({ nativeEvent: { text } }) => {
		setSearch(text)
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				...defaultSearchOptions,
				...SearchBarOptions,
				onChangeText: handleOnChangeText,
			},
		})
	}, [navigation, SearchBarOptions])
	return search
}
