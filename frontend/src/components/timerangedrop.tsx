"use client";

import { Button, DropdownMenu } from "@radix-ui/themes";

import { Dispatch, SetStateAction, useState } from "react";

type Range = {
  setSelectedRange: Dispatch<SetStateAction<{ label: string; value: string }>>;
  selectedRange: { label: string; value: string };
};

export default function TimeRangeDrop({
  setSelectedRange,
  selectedRange,
}: Range) {
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

  // const [selectedRange, setSelectedRange] = useState(
  // {
  //   label: "Short Term",
  //   value: "short_term",
  // }
  // );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="soft"
          color="indigo"
          style={{
            // backgroundColor: "var(--gray-3)",
            width: "150px",
          }}
          mt={{ initial: "4", sm: "0" }}
          size="2"
          className="bg-transparent"
        >
          {" "}
          {selectedRange?.label}
          <span style={{ marginLeft: "0.05rem" }}>▼</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft" color="indigo">
        {timeRanges.map((timeRange) => (
          <DropdownMenu.Item
            key={timeRange.value}
            onSelect={() =>
              setSelectedRange({
                label: timeRange.label,
                value: timeRange.value,
              })
            }
            className="bg-transparent"
          >
            {timeRange?.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
