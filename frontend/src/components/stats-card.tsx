import { Progress } from "@/components/ui/progress-bar";

interface StatsCardProps {
	percentage: number;
	comparedToLastMonth: string;
	items: Array<{
		label: string;
		progress: number;
		percentage: string;
	}>;
}

export function StatsCard({
	percentage = 18,
	comparedToLastMonth = "From Last Month",
	items = [
		{ label: "Product A", progress: 75, percentage: "75%" },
		{ label: "Product B", progress: 63, percentage: "63%" },
		{ label: "Product C", progress: 49, percentage: "49%" },
		{ label: "Product D", progress: 32, percentage: "32%" },
		{ label: "Product E", progress: 24, percentage: "24%" },
	],
}: StatsCardProps) {
	return (
		<div className="w-full h-full bg-neutral-900 rounded-lg p-4 text-white   ">
			<div className="flex flex-col space-y-4">
				<div className="flex flex-col items-center  justify-center gap-2">
					<span className="text-3xl font-bold">+{percentage}%</span>
					<span className="text-xs font-medium text-neutral-400">
						{comparedToLastMonth}
					</span>
				</div>

				<div className="space-y-3 mt-2">
					{items.map((item, index) => (
						<div key={index} className="flex items-center gap-2">
							<span className="text-sm min-w-16">{item.label}</span>
							<Progress value={item.progress} className="h-2 flex-1" />
							<span className="text-sm min-w-10 text-right">
								{item.percentage}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
