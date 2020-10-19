import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { Box, Flex } from "rebass"
import { Label, Input } from "@rebass/forms"

export interface TimeSelectorProps extends PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const TimeSelector = React.forwardRef<HTMLInputElement, TimeSelectorProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    const startTimeOnChange = (e) => {
      input.onChange({
        startTime: e?.target?.value,
        endTime: input?.value?.endTime,
      })
    }

    const endTimeOnChange = (e) => {
      input.onChange({
        startTime: input?.value?.startTime,
        endTime: e?.target?.value,
      })
    }

    return (
      <Flex {...outerProps}>
        <Box mr={2}>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            type="time"
            sx={{
              padding: "5px",
              fontSize: "20px",
              borderColor: "primary",
              color: "primary",
            }}
            value={input?.value?.startTime}
            name="startTime"
            onInput={startTimeOnChange}
          />
        </Box>
        <Box>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            type="time"
            sx={{
              padding: "5px",
              fontSize: "20px",
              borderColor: "primary",
              color: "primary",
            }}
            value={input?.value?.endTime}
            name="endTime"
            onInput={endTimeOnChange}
          />
        </Box>
        {touched && normalizedError && (
          <Box role="alert" style={{ color: "red" }}>
            {normalizedError}
          </Box>
        )}
      </Flex>
    )
  }
)

export default TimeSelector
