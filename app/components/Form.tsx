import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { Flex, Box, Button } from "rebass"
import * as z from "zod"
export { FORM_ERROR } from "final-form"

type FormProps<S extends z.ZodType<any, any>> = {
  /** All your form fields */
  children: ReactNode
  /** Text to display in the submit button */
  submitText: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  inline?: boolean
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <Box as="form" onSubmit={handleSubmit} className="form" {...props}>
          <Flex flexDirection={props.inline ? "row" : "column"} alignItems="center">
            <Box>
              {/* Form fields supplied as children are rendered here */}
              {children}

              {submitError && (
                <div role="alert" style={{ color: "red" }}>
                  {submitError}
                </div>
              )}
            </Box>
            <Box>
              <Button type="submit" disabled={submitting}>
                {submitText}
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    />
  )
}

export default Form
