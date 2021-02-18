import React from 'react';
import { ErrorMessage, useField } from 'formik';

export default function FormField({ label, style, ...props }) {
    const [field] = useField(props);
 
    return (
        <div>
            
            <input
                {...field} {...props}
                autoComplete="off">
            </input>
            <label className={style}>
                <ErrorMessage name={field.name}  />
            </label>

        </div>
    );
}
