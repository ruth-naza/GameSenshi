import { functions } from 'utils/firebase'

import { EMAIL, PASSWORD, TERM, ON_SIGN_UP } from 'utils/signUpConstants'
import { DATA } from 'utils/commonConstants'

const handleSignUp = values => {
	const { [EMAIL]: email, [PASSWORD]: password, [TERM]: term } = values
	const defaultValues = {
		// undefined = success
		[EMAIL]: undefined,
		[PASSWORD]: undefined,
		[TERM]: undefined,
	}
	const signUpUser = functions.httpsCallable(ON_SIGN_UP)
	return signUpUser({ email, password, term }).then(res => {
		res[DATA][DATA] = { ...defaultValues, ...res[DATA][DATA] }
		return res[DATA]
	})
}

export default handleSignUp
