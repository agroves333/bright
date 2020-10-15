import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { Box } from "rebass"
import { Label, Input } from "@rebass/forms"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <Box {...outerProps} py={1}>
        <Label htmlFor={name}>{label}</Label>
        <Input {...input} disabled={submitting} {...props} ref={ref} />
        {touched && normalizedError && (
          <Box role="alert" style={{ color: "red" }}>
            {normalizedError}
          </Box>
        )}
      </Box>
    )
  }
)

export default LabeledTextField
