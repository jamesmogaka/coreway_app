import * as react from "react";

export const ContactPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20 bg-gray-100">
			<div className="container mx-auto px-6">
				<div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
						Contact Us
					</h1>
					<p className="text-center text-gray-600 mb-8">
						We'd love to hear from you. Please fill out the form
						below to get in touch.
					</p>
					<form>
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block text-gray-700 font-bold mb-2">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 font-bold mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="message"
								className="block text-gray-700 font-bold mb-2">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								rows={5}
								className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
								required></textarea>
						</div>
						<div className="text-center">
							<button
								type="submit"
								className="bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	</div>
);
