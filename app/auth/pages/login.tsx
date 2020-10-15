import React from "react"
import { useRouter, BlitzPage } from "blitz"
import { Flex } from "rebass"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Flex justifyContent="center" alignItems="center">
      <LoginForm onSuccess={() => router.push("/admin")} />
    </Flex>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
