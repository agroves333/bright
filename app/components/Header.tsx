import React from "react"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Flex, Box, Link } from "rebass"
import { useMutation, useRouter } from "blitz"
import logout from "../auth/mutations/logout"

export const Header = (props) => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  return (
    <Flex p={2} flex="0 0 60px" color="white" bg="primary" alignItems="center" {...props}>
      <Box>
        <Link href="/">
          <img
            src="https://nitrocdn.com/pVkeQxNRiiZfGUvHUhSxQqTSYwgjuTkA/assets/static/optimized/rev-115f517/wp-content/uploads/2020/03/bright-logo-trans.png"
            alt="bright.md"
            height="20"
          />
        </Link>
      </Box>
      <Box mx="auto" />
      <Link variant="nav" href="/Hours">
        Hours
      </Link>
      {currentUser && (
        <Link variant="nav" href="/admin" ml={2}>
          Admin
        </Link>
      )}
      {!currentUser && (
        <Link variant="nav" href="/login" ml={2}>
          Login
        </Link>
      )}
      {currentUser && (
        <Link
          variant="nav"
          ml={2}
          onClick={async () => {
            await logoutMutation()
            await router.push("/")
          }}
        >
          Logout
        </Link>
      )}
    </Flex>
  )
}

export default Header
