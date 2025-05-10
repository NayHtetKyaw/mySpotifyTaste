import React from "react";

const Testing = ({ text, gay }: any) => {
	return (
		<div>
			<div className="text-red-400">{text}</div>

			<div className="text-amber-400">{gay}</div>
		</div>
	);
};

export default Testing;
