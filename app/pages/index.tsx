import { Suspense } from "react"
import { Link, BlitzPage, useQuery, useMutation } from "blitz"
import moment from "moment"
import { Box, Flex, Heading } from "rebass"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import getEntries from "app/queries/getEntries"

import { Entry } from "app/types/entry"

const Times = ({ entry }) => {
  return entry?.isAllDay ? (
    <Box>24/7</Box>
  ) : (
    <Flex>
      <Box>{moment(entry.startTime, "HH:mm").format("LT")}</Box>&nbsp;-&nbsp;
      <Box>{moment(entry.endTime, "HH:mm").format("LT")}</Box>
      <Box ml={2}>EST</Box>
    </Flex>
  )
}

const EntryRow = ({ entry, ...props }) => {
  const isSingle = entry?.startDay === entry?.endDay

  return (
    <Flex
      height="40px"
      bg="lightgray"
      my={2}
      p={2}
      alignItems="center"
      width={1}
      sx={{
        border: "1px solid mediumgray",
        borderRadius: "5px",
      }}
      {...props}
    >
      <>
        <Box mr={3} width={[1 / 4]}>
          {entry?.startDay !== -1 && moment().day(entry?.startDay).format("ddd")}
          {!isSingle
            ? " - " + (entry?.endDay !== -1 && moment().day(entry?.endDay).format("ddd"))
            : ""}
          :
        </Box>
        <Flex>
          <Times entry={entry} />
        </Flex>
      </>
    </Flex>
  )
}

const Entries = () => {
  const [entries] = useQuery(getEntries, null)

  return (
    <Flex flexDirection="column" width={[1, 1 / 2, 1 / 3]}>
      {entries.length ? (
        entries.map((entry: Entry) => {
          return <EntryRow key={entry.id} entry={entry} />
        })
      ) : (
        <Box py={2}>Sorry, the hospital is currently closed until further notice.</Box>
      )}
    </Flex>
  )
}

const Home: BlitzPage = () => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Heading fontSize={[3, 4, 5]} color="primary">
        Hours of Operation
      </Heading>
      <Suspense fallback="Loading...">
        <Entries />
      </Suspense>
    </Flex>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
