import { Container } from 'unstated'

import {
	USER_UID,
	USER_EMAIL,
	USER_GENDER,
	USER_COUNTRY,
	USER_LANGUAGES,
	USER_PHOTO_URL,
	USER_SIGNED_IN,
	USER_BIRTH_DATE,
	USER_CARDS,
	USER_DISPLAY_NAME,
	USER_PHONE_NUMBER,
	USER_PROVIDER_DATA,
	USER_EMAIL_IS_VERIFIED,
} from 'constantValues'

const defaultValues = {
	[USER_UID]: '',
	[USER_EMAIL]: '',
	[USER_GENDER]: '',
	[USER_COUNTRY]: '',
	[USER_LANGUAGES]: ['English', 'French'],
	[USER_PHOTO_URL]: '',
	[USER_SIGNED_IN]: false,
	[USER_BIRTH_DATE]: new Date(2000, 0, 1),
	[USER_CARDS]: [
		{ last4Digits: 8372, expiry: '06/22', cardType: 'visa', isDefault: true },
		{
			last4Digits: 1225,
			exp: '07/21',
			cardType: 'mastercard',
			isDefault: false,
		},
	],
	[USER_DISPLAY_NAME]: '',
	[USER_PHONE_NUMBER]: '',
	[USER_PROVIDER_DATA]: [],
	[USER_EMAIL_IS_VERIFIED]: false,
}

class UserContainer extends Container {
	state = defaultValues
	resetState = () => {
		return this.setState(defaultValues)
	}
}

export default UserContainer
