import React from "react"
import { useRouter, BlitzPage } from "blitz"
import { Flex, Box } from "rebass"
import Layout from "app/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  const user = useCurrentUser()

  return user ? (
    <Flex justifyContent="center" alignItems="center">
      <SignupForm onSuccess={() => router.push("/admin")} />
    </Flex>
  ) : (
    <Box>Sorry, your not allowed to access this page.</Box>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
