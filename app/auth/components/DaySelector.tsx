import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { Box, Flex } from "rebass"
import { Label } from "@rebass/forms"

const days = ["U", "M", "T", "W", "R", "F", "S"]

export interface DaySelectorProps extends PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

const Info = ({ startDay, endDay }) => {
  if (startDay === -1) {
    return <Box>Select start day</Box>
  } else if (startDay !== -1 && startDay === endDay) {
    return <Box>Select end day (if selecting day range)</Box>
  } else {
    return <></>
  }
}

export const DaySelector = React.forwardRef<HTMLInputElement, DaySelectorProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    const handleClick = (key) => {
      if (input?.value?.startDay === -1 && input?.value?.endDay === -1) {
        input.onChange({ startDay: key, endDay: key })
      } else if (input?.value?.startDay !== -1 && input?.value?.endDay === -1) {
        input.onChange({ startDay: input?.value?.startDay, endDay: key })
      } else if (input?.value?.startDay !== -1 && input?.value?.endDay !== -1) {
        if (key >= input?.value?.startDay && key <= input?.value?.endDay) {
          input.onChange({ startDay: key, endDay: key })
        } else {
          if (key < input?.value?.startDay) {
            input.onChange({ startDay: key, endDay: key })
          } else {
            input.onChange({ startDay: input?.value?.startDay, endDay: key })
          }
        }
      }
    }

    return (
      <Box {...outerProps}>
        <Label htmlFor={name}>{label}</Label>
        <Flex>
          {days.map((day, key) => {
            const selected = key >= input?.value?.startDay && key <= input?.value?.endDay
            return (
              <Flex
                key={key}
                p={1}
                mr={1}
                width="40px"
                height="40px"
                color={selected ? "white" : "primary"}
                bg={selected ? "primary" : "white"}
                justifyContent="center"
                alignItems="center"
                flexShrink={0}
                sx={{
                  border: `1px solid ${selected ? "transparent" : "#07c"}`,
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={() => handleClick(key)}
              >
                {day}
              </Flex>
            )
          })}
        </Flex>

        <Info startDay={input?.value?.startDay} endDay={input?.value?.endDay} />
        {touched && normalizedError && (
          <Box role="alert" style={{ color: "red" }}>
            {normalizedError}
          </Box>
        )}
      </Box>
    )
  }
)

export default DaySelector
