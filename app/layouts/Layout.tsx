import { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import { Flex, Box } from "rebass"
import Header from "app/components/Header"
import Footer from "app/components/Footer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Head>
        <title>{title || "Bright"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback="">
        <Header />
      </Suspense>
      <Box as="main" flex="1" p={2}>
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}

export default Layout
