import type React from "react";
import * as react from "react";
import { ToolkitPageProps, ValueData, kit1Data, kit2Data } from "./components";

export const ToolkitPage: react.FC<ToolkitPageProps> = ({ onValueClick }) => {
	const ValueList: react.FC<{ data: ValueData }> = ({ data }) => (
		<div className="space-y-2 value-item-list">
			{Object.entries(data).map(([name, valueData]) => (
				<div key={name} onClick={() => onValueClick(name, valueData)}>
					{name}
				</div>
			))}
		</div>
	);

	return (
		<div className="fade-in">
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
						The VDC Train-up Toolkit
					</h1>
					<p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
						The VDC Train-up Toolkit comprises two distinct
						age-specific kits, each meticulously tailored to cater
						to specific developmental stages. This ensures that
						character education is relevant, engaging, and impactful
						throughout a child’s growth.
					</p>
					<div className="grid lg:grid-cols-2 gap-12">
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold text-blue-600 mb-4">
								Kit 1: Early Development (4-9 Years)
							</h2>
							<p className="text-gray-600 mb-6">
								This kit focuses on 12 core values that form the
								basis of moral and ethical growth during early
								childhood. Click on a value to learn more.
							</p>
							<ValueList data={kit1Data} />
						</div>
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold text-green-600 mb-4">
								Kit 2: Transitional Core Values (10-18 Years)
							</h2>
							<p className="text-gray-600 mb-6">
								This kit focuses on 12 essential values that
								support the complex transition from childhood
								into young adulthood. Click on a value to learn
								more.
							</p>
							<ValueList data={kit2Data} />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
