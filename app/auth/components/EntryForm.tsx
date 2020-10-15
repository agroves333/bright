import React from "react"
import { Box, Flex } from "rebass"
import { Label } from "@rebass/forms"
import { Field } from "react-final-form"
import { Form, FORM_ERROR } from "app/components/Form"
import { CreateEntryInput } from "app/auth/validations"
import DaySelector from "./DaySelector"
import TimeSelector from "./TimeSelector"

type EntryFormProps = {
  onSuccess?: (any) => void
  data?: any
}

export const EntryForm = (props: EntryFormProps) => {
  const startDay = props?.data?.startDay
  const endDay = props?.data?.endDay

  return (
    <Box {...props}>
      <Form
        submitText="Save"
        schema={CreateEntryInput}
        initialValues={{
          days: {
            startDay: typeof startDay !== "undefined" ? startDay : -1,
            endDay: typeof endDay !== "undefined" ? endDay : -1,
          },
          times: {
            startTime: props?.data?.startTime || "00:00",
            endTime: props?.data?.endTime || "00:00",
          },
          isAllDay: false,
        }}
        inline={true}
        onSubmit={async (values) => {
          try {
            props.onSuccess?.({
              days: values?.days,
              times: values?.times,
              isAllDay: values?.isAllDay,
            })
          } catch (error) {
            // if (error.name === "AuthenticationError") {
            //   return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            // } else {
            //   return {
            //     [FORM_ERROR]:
            //       "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
            //   }
            // }
          }
        }}
      >
        <Flex>
          <Box mr={3}>
            <DaySelector name="days" label="Days" />
          </Box>
          <Box mr={3}>
            <TimeSelector name="times" label="Times" />
          </Box>
          <Flex alignItems="center" mr={3}>
            <Label>
              <Field type="checkbox" component="input" name="isAllDay" />
              24/7
            </Label>
          </Flex>
        </Flex>
      </Form>
    </Box>
  )
}

export default EntryForm
