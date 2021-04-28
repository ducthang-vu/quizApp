import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


export interface RadioOption<T> {
    value: T;
    label: string;
}

export interface RadioFormGroupInterface<T> {
    legend: string;
    options: RadioOption<T>[];
    value: T;
    onChange: (value: T) => any;
}

const useStyles = makeStyles({
    formControl: {
        margin: '15px 0',
        color: 'white',
        justifyContent: 'center'
    },
    legend: {
        fontSize: '115%',
        color: 'white',
        marginBottom: '10px'
    },
    radioGroup: {
        justifyContent: 'center'
    },
    formControlLabel: {
        color: 'white',
    }
});


export default function RadioFormGroup<T>({ legend, options, value, onChange }: RadioFormGroupInterface<T>) {
    const classes = useStyles();
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value as unknown as T);
    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.legend}>{legend}</FormLabel>
            <RadioGroup row aria-label="position" name="position" value={value} onChange={handleOnChange} className={classes.radioGroup}>
                {
                    options.map((option: RadioOption<T>, index: number) => (
                        <FormControlLabel
                            key={index}
                            value={option.value}
                            className={classes.formControlLabel}
                            control={<Radio color="primary"/>}
                            label={option.label}
                            labelPlacement="top"
                        />
                    ))
                }
            </RadioGroup>
        </FormControl>
    );
}
