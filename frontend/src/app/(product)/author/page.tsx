import React from "react";

const datas = [
	{
		img: "img",
		title: "fuji",
	},
	{
		img: "img",
		title: "fuji",
	},
	{
		img: "img",
		title: "fuji",
	},
	{
		img: "img",
		title: "fuji",
	},
	{
		img: "img",
		title: "fuji",
	},
];

const x = 10;
const author = () => {
	return (
		<div className="flex justify-center items-center">
			<div>
      {x}
				{datas.map((data, index) => {
					return (
						<div className="flex flex-col bg-amber-500 gap-4" key={index}>
							<div className="w-full">
								{data.title}
								{data.img}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default author;
