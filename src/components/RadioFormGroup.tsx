import React from 'react';
import styles from '../style/RadioFormGroup.module.scss';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';


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

export default function RadioFormGroup<T>({ legend, options, value, onChange }: RadioFormGroupInterface<T>) {
    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value as unknown as T)
    return (
        <FormControl component="fieldset" className={styles.formControl}>
            <FormLabel component="legend" className={styles.legend}>{ legend }</FormLabel>
            <RadioGroup row aria-label="position" name="position"  value={value} onChange={handleOnChange}>
                {
                    options.map((option: RadioOption<T>, index: number) => (
                        <FormControlLabel
                            key={index}
                            value={option.value}
                            control={<Radio color="primary"/>}
                            label={option.label}
                            labelPlacement="top"
                        />
                    ))
                }
            </RadioGroup>
        </FormControl>
)}
