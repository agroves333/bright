import React from "react"
import { Flex } from "rebass"

export const Footer = (props) => {
  return (
    <Flex
      {...props}
      bg="primary"
      sx={{
        height: "100px;",
      }}
    >
      <footer
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Flex justifyContent="center" alignItems="center" height="100%">
          <img
            src="https://nitrocdn.com/pVkeQxNRiiZfGUvHUhSxQqTSYwgjuTkA/assets/static/optimized/rev-115f517/wp-content/uploads/2020/03/bright-logo-trans.png"
            alt="bright.md"
            height="20"
          />
        </Flex>
      </footer>
    </Flex>
  )
}

export default Footer
