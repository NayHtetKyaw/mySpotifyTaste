"use client";

import {
    Button,
    DropdownMenu,
} from "@radix-ui/themes";

import { useState } from "react";

export default function TimeRangeDrop() {
    
    const timeRanges = [
        {
            label: "Short Term",
            value: "short_term",
        },
        {
            label: "Medium Term",
            value: "medium_term",
        },
        {
            label: "Long Term",
            value: "long_term",
        },
    ];

    const [selectedRange, setSelectedRange] = useState({
        label: "Short Term",
        value: "short_term",
    });

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button
                    variant="soft"
                    color="green"
                    style={{
                        backgroundColor: "var(--gray-3)",
                        width: "150px",
                    }}
                    mt={{ initial: "4", sm: "0" }}
                    size="2"
                > {selectedRange.label}
                    <span style={{ marginLeft: "0.05rem" }}>▼</span>
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft" color="green">
                {timeRanges.map((timeRange) => (
                    <DropdownMenu.Item
                        key={timeRange.value}
                        onSelect={() =>
                            setSelectedRange({
                                label: timeRange.label,
                                value: timeRange.value,
                            })
                        }
                    >
                        {timeRange.label}
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}