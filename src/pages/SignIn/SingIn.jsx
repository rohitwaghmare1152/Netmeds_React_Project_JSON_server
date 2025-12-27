import React, { useState, useRef, useEffect } from "react";
import {
	Card,
	CardText,
	CardTitle,
	Form,
	InputGroup,
	Input,
	InputGroupText,
	Button,
	CardBody,
} from "reactstrap";

function SingIn() {
	const [step, setStep] = useState(1);
	const [number, setNumber] = useState("");
	const [captcha, setCaptcha] = useState();
	const [inputCaptcha, setInputCaptcha] = useState("");
	const [count, setCount] = useState(60);
	const [captchaStatus, setCaptchaStatus] = useState(false);

	const handleNumberChange = (e) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) {
			setNumber(value);
		}
	};

	const handleClick = (e) => {
		e.preventDefault();
		setStep(2);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputCaptcha == captcha) {
			setCaptchaStatus(false);
		} else {
			setCaptchaStatus(true);
		}
	};

	const changeNumber = () => {
		setStep(1);
		setNumber("");
	};

	const handleCaptcha = (e) => {
		if (/^\d*$/.test(e.target.value)) {
			setInputCaptcha(e.target.value);
		}
	};

	const generateCaptcha = () => Math.floor(100000 + Math.random() * 900000);

	useEffect(() => {
		setCaptcha(generateCaptcha());
		if (step !== 2) return;
		setCount(60);

		const timer = setInterval(() => {
			setCount((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
			if (count < 0) {
				clearInterval(timer);
			}
		}, 1000);
	}, [step]);

	return (
		<div className="container mx-auto grid grid-cols-2 place-items-center gap-4">
			<div className="mx-auto">
				<img src="public/images/login/login-banner.png" alt="login" />
			</div>
			<div>
				<Card className="w-96 px-3 !rounded-3xl">
					<CardBody>
						<Form className="my-3" onSubmit={handleSubmit}>
							{step === 1 && (
								<>
									<CardTitle className="font-extrabold text-4xl">
										Sign in to Netmeds
									</CardTitle>
									<CardText tag="div">
										<span className="text-sm">
											Order medicines, beauty & wellness products, book lab
											tests, consult doctor, and much more.
										</span>
										<InputGroup>
											<InputGroupText className="border-0 !border-b-2 !rounded-none bg-transparent">
												+91
											</InputGroupText>
											<Input
												type="tel"
												name="phone"
												value={number}
												placeholder="Enter your mobile number"
												maxLength={10}
												onChange={handleNumberChange}
												className="border-0 !border-b-2 border-gray-300 !rounded-none !focus:outline-none py-2"
											/>
										</InputGroup>
										<div className="text-sm mt-5">
											By requesting an OTP to proceed, you expressly acknowledge
											that you have read and agreed to our{" "}
											<span className="text-cyan-600">Terms of Service</span>
											and
											<span className="text-cyan-600">
												Privacy & Legal Policy
											</span>
											, and you provide your explicit consent for the
											collection, storage, processing, and transfer of your
											personal data under the aforesaid policies
										</div>
										<Button
											type="button"
											onClick={handleClick}
											className="!bg-blue-500 w-full !rounded-3xl mt-3"
											disabled={number.length !== 10}
										>
											Get OTP
										</Button>
									</CardText>
								</>
							)}
							{step !== 1 && (
								<>
									<CardTitle className="font-extrabold text-4xl">
										Verify phone number
									</CardTitle>
									<CardText tag="div">
										<span className="text-sm">
											Enter the 4-digit OTP sent via an SMS to +91 {number}{" "}
											<span
												className="text-cyan-600 cursor-pointer"
												onClick={changeNumber}
											>
												Change
											</span>
										</span>
										<div className="text-3xl text-center line-through m-3">
											{captcha}
										</div>
										<Input
											type="text"
											name="inputCaptcha"
											value={inputCaptcha}
											maxLength={6}
											onChange={handleCaptcha}
											className="border-0 m-3 text-center tracking-[1.2em] !border-b-2 border-dashed border-gray-300 !rounded-none !focus:outline-none focus:ring-0 focus:border-gray-300 shadow-none py-2"
										/>
										{captchaStatus && (
											<div className="text-red-600 mb-3">
												OTP is not valid, please check code & try again.
											</div>
										)}
										<div className="mb-5">
											{count > 0 ? (
												<div>Waiting for OTP - {count} seconds left</div>
											) : (
												<div
													className="font-bold text-sm text-cyan-600 cursor-pointer"
													onClick={() => setStep((prev) => prev + 1)}
												>
													Resend OTP
												</div>
											)}
										</div>
										<Button
											type="submit"
											className="!bg-blue-500 w-full !rounded-3xl mt-3"
											disabled={inputCaptcha.length !== 6}
										>
											Verify
										</Button>
									</CardText>
								</>
							)}
						</Form>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}

export default SingIn;
