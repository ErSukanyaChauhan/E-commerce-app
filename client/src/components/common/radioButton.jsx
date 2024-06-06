import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({ heading, fieldsData, radioGroupName }) {
    // fieldsData = [
    //     { label: "Buyer", value: "buyer" },
    //     { label: "Seller", value: "seller" }
    // ]
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{heading}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name={radioGroupName}
            >
                {fieldsData.map((eachObj) => (
                    <FormControlLabel value={eachObj.value} control={<Radio />} label={eachObj.label} />

                ))}

            </RadioGroup>
        </FormControl>
    );
}
