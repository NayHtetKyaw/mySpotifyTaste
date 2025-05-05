"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress-bar";

interface ProgressBarProps {
	progress: number;
	className?: string;
	color?: string;
}

export function ProgressBar({
	progress,
	className,
	color = "bg-emerald-500",
}: ProgressBarProps) {
	return (
		<div className={cn("w-full", className)}>
			<Progress
				value={progress}
				className="h-2 w-full rounded-full bg-neutral-700"
				indicatorClassName={cn("rounded-full", color)}
			/>
		</div>
	);
}
