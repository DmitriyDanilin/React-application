import React from "react"
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form"
import { FieldValidatorType } from "../../../Utilits/Validators/validators"
import s from "./FormControls.module.css"

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}


export const FormControl: React.FC<FormControlPropsType>  = ({ meta :{touched, error}, children }) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {children} 
            </div>
            {hasError ? <span>{error}</span> : ""}
        </div>
    )
}


export const TextArea: React.FC<WrappedFieldProps> = (props) => {
   // const { child, input, meta, ...restProps } = props
   const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}><textarea className={s.text} {...input} {...restProps} /></FormControl>
    )
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    //const { child, input, meta, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}><input className={s.text} {...input} {...restProps} /></FormControl>
    )
}

export function  CreateField<T extends string>(placeholder: string | undefined, //"T extends string" we can show our generic restriction on type of generic
    name: T, validators: Array<FieldValidatorType>, 
    component: React.FC<WrappedFieldProps> | string, type = "") {
        return <div> 
            <Field  
         placeholder={placeholder} 
         validate={validators} 
         name={name} 
         component={component}
         type={type}/>
         </div>
} 