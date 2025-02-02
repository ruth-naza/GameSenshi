import React from 'react'

// routing
import { withLastLocation } from 'react-router-last-location'
import { onSignedInRouting } from 'routes'

// api
import { handleSignInWithEmailAndPassword } from 'api'

// validation
import {
	signInEmailValidation,
	signInPasswordValidation,
} from 'utils/validation'

// reactstrap components
import {
	Input,
	InputGroupText,
	InputGroup,
	InputGroupAddon,
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardImg,
	CardTitle,
	Form,
	Col,
	Row,
} from 'reactstrap'
import Loader from 'react-loader-spinner'

// form validation
import { Form as FinalForm } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import createDecorator from 'final-form-focus'

// constants
import {
	EMAIL,
	PASSWORD,
	SIGN_IN_MODAL_EMAIL,
	SIGN_IN_MODAL_CALLBACK,
} from 'constantValues'

// core components
import SocialAuthButtonGroup from 'components/Buttons/SocialAuthButtonGroup'
import InputField from 'components/Inputs/InputField'

// state management
import { signInModalStore, Subscribe } from 'state'

const focusOnError = createDecorator()

class SignInForm extends React.Component {
	state = { willUnmount: { value: false } }

	submitButton //submit button reference

	onSubmit = async (values, history, lastLocation) => {
		const { [EMAIL]: email, [PASSWORD]: password } = values
		const signInFailed = await handleSignInWithEmailAndPassword(email, password)
		if (signInFailed) {
			return { [FORM_ERROR]: signInFailed }
		}
		onSignedInRouting(history, lastLocation)

		signInModalStore.state[SIGN_IN_MODAL_CALLBACK]()
		// if undefined mean no error
		// but this not much point since it will redirect and unmount soon
		return
	}
	componentWillUnmount() {
		// eslint-disable-next-line react/no-direct-mutation-state
		this.state.willUnmount.value = true // still not able to solve memory leak problem on submit, need more research
	}

	render() {
		const {
			state: { willUnmount },
			props: { history, lastLocation, passwordOnly },
			onSubmit,
		} = this
		return (
			<Subscribe to={[signInModalStore]}>
				{signInModalStore => {
					const {
						toggle,
						state: { [SIGN_IN_MODAL_EMAIL]: email },
					} = signInModalStore
					return (
						<Card className='card-login'>
							<Form action='' className='form' method=''>
								<CardHeader>
									<CardImg
										alt='...'
										src={require('assets/img/square-purple-1.png')}
									/>
									<CardTitle tag='h4'>Login</CardTitle>
									{passwordOnly && (
										<button
											aria-label='Close'
											className='close'
											data-dismiss='modal'
											type='button'
											onClick={toggle}>
											<i className='tim-icons icon-simple-remove' />
										</button>
									)}
								</CardHeader>
								<CardBody>
									<div className='text-muted text-center ml-auto mr-auto'>
										<h3 className='mb-0'>
											{passwordOnly
												? 'Sign In With Existing Account'
												: 'Sign in with'}
										</h3>
									</div>
								</CardBody>
								<FinalForm
									initialValues={{
										[EMAIL]: passwordOnly ? email : '',
										[PASSWORD]: '',
									}}
									decorators={[focusOnError]}
									onSubmit={values => {
										return onSubmit(values, history, lastLocation)
									}}>
									{({ submitError, handleSubmit, submitting }) => (
										<>
											<CardBody>
												{passwordOnly ? (
													<InputGroup>
														<InputGroupAddon addonType='prepend'>
															<InputGroupText
																style={{
																	backgroundColor: '#1d253b',
																	cursor: 'not-allowed',
																}}>
																<i className='tim-icons icon-email-85 ' />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															disabled
															placeholder={passwordOnly ? email : 'Email'}
															type='text'
														/>
													</InputGroup>
												) : (
													<>
														<SocialAuthButtonGroup />
														<Row>
															<Col />
															<Col className='text-center text-muted mb-4 mt-3 col-auto'>
																<small>Or Classically</small>
															</Col>
															<Col />
														</Row>
														<InputField
															type={EMAIL}
															name={EMAIL}
															hideSuccess
															placeholder='Email'
															icon='tim-icons icon-email-85'
															validation={value => signInEmailValidation(value)}
															willUnmount={willUnmount}
														/>
													</>
												)}
												<InputField
													type={PASSWORD}
													name={PASSWORD}
													hideSuccess
													placeholder='Password'
													icon='tim-icons icon-lock-circle'
													validation={value => signInPasswordValidation(value)}
													onKeyPress={e => {
														e.key === 'Enter' && this.submitButton.onClick()
													}}
													willUnmount={willUnmount}
												/>
											</CardBody>
											<CardFooter className='text-center'>
												{submitError && !submitting && `Error: ${submitError}`}
												<Button
													ref={ref => {
														this.submitButton = ref
													}}
													block
													className='btn-round'
													color='primary'
													href='#pablo'
													size='lg'
													disabled={submitting}
													onClick={handleSubmit}>
													{submitting ? (
														<>
															<Loader
																type='Watch'
																color='#00BFFF'
																height='19px'
																width='19px'
															/>
															&nbsp;&nbsp;Signing In
														</>
													) : (
														'Get Started'
													)}
												</Button>
											</CardFooter>
										</>
									)}
								</FinalForm>
								<div className='pull-left ml-3 mb-3'>
									<h6>
										<a
											className='link footer-link'
											style={{ color: '#ba54f5', fontSize: 12 }}
											href='#pablo'
											onClick={() => {
												history.push('/signUp')
											}}>
											Create Account
										</a>
									</h6>
								</div>
								<div className='pull-right mr-3 mb-3'>
									<h6>
										<a
											className='link footer-link'
											style={{ color: '#ba54f5', fontSize: 12 }}
											href='#pablo'
											onClick={e => e.preventDefault()}>
											Forgot Password?
										</a>
									</h6>
								</div>
							</Form>
						</Card>
					)
				}}
			</Subscribe>
		)
	}
}

export default withLastLocation(SignInForm)
