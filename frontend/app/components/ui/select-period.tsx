import { NativeSelect } from "@mantine/core";

export default function SelectPeriod(): JSX.Element {
    return (

        <NativeSelect
            variant="filled"
            w="150px">
            <optgroup label="Select Period">
                <option value="short">Short Term</option>
                <option value="medium">Medium Term</option>
                <option value="long"> Long Term</option>
            </optgroup>
            <hr />
            <optgroup label="Days">
                <option value="seven">Last 7 Days</option>
                <option value="thirty">Last 30 Days</option>
                <option value="ninety">Last 90 Days</option>
            </optgroup>
        </NativeSelect>

    );
}