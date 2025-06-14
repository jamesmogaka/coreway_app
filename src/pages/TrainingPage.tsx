import * as react from "react";

export const TrainingPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6">
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
					Parenting Training Classes
				</h1>
				<p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
					Enroll in our training classes to master the VDC Toolkit.
					Our expert-led sessions provide in-depth guidance on
					applying the principles of value-driven parenting to nurture
					your child's growth and character.
				</p>
				<div className="bg-gray-50 p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold text-gray-800 mb-6">
						Upcoming Classes
					</h2>
					<div className="space-y-6">
						<div className="md:flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
							<div>
								<h3 className="text-xl font-bold text-blue-600">
									Introduction to the VDC Toolkit
								</h3>
								<p className="text-gray-600">
									<strong>Date:</strong> July 15, 2024 |{" "}
									<strong>Time:</strong> 10:00 AM - 12:00 PM
								</p>
								<p className="text-gray-600">
									An overview of the core principles and how
									to get started.
								</p>
							</div>
							<button className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
								Enroll Now
							</button>
						</div>
						<div className="md:flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
							<div>
								<h3 className="text-xl font-bold text-blue-600">
									Understanding Your Child's Predisposition
								</h3>
								<p className="text-gray-600">
									<strong>Date:</strong> July 22, 2024 |{" "}
									<strong>Time:</strong> 10:00 AM - 12:00 PM
								</p>
								<p className="text-gray-600">
									A deep dive into the four color types and
									personalized parenting strategies.
								</p>
							</div>
							<button className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
								Enroll Now
							</button>
						</div>
						<div className="md:flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
							<div>
								<h3 className="text-xl font-bold text-blue-600">
									Advanced Habit Formation
								</h3>
								<p className="text-gray-600">
									<strong>Date:</strong> July 29, 2024 |{" "}
									<strong>Time:</strong> 10:00 AM - 12:00 PM
								</p>
								<p className="text-gray-600">
									Learn to apply the Habit Loop and Feedback
									Loop principles effectively.
								</p>
							</div>
							<button className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
								Enroll Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
);
