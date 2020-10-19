import { useState, useEffect } from "react"
import { BlitzPage, useMutation, invoke } from "blitz"
import { Box, Flex, Button } from "rebass"
import moment from "moment"
import Layout from "app/layouts/Layout"
import { Entry } from "app/types/entry"
import { EntryForm } from "app/auth/components/EntryForm"

import getEntriesQuery from "app/queries/getEntries"
import createEntry from "app/auth/mutations/createEntry"
import deleteEntry from "app/auth/mutations/deleteEntry"
import updateEntry from "app/auth/mutations/updateEntry"

const Times = ({ entry }) => {
  return entry?.isAllDay ? (
    <Flex alignItems="center">24/7</Flex>
  ) : (
    <Flex alignItems="center">
      <Box>{moment(entry.startTime, "HH:mm").format("LT")}</Box>&nbsp;-&nbsp;
      <Box>{moment(entry.endTime, "HH:mm").format("LT")}</Box>
      <Box ml={2}>EST</Box>
    </Flex>
  )
}

const EntryRow = ({ entry, setEntries, entries, ...props }) => {
  const isSingle = entry?.startDay === entry?.endDay
  const [isEdit, setIsEdit] = useState(false)
  const handleDeleteOnClick = async (entryId) => {
    await invoke(deleteEntry, { entryId })
    setEntries(entries.filter((entry) => entry.id !== entryId))
  }

  const handleEditOnClick = async (entryId) => {
    setIsEdit(true)
  }

  const handleUpdateEntry = async (data) => {
    if (data?.days?.startDay !== -1 || data?.days?.endDay !== -1) {
      try {
        await updateEntry({ ...data, entryId: entry.id })
        const updatedEntries = entries.map((row) => {
          return row.id === entry.id ? { ...data?.days, ...data?.times } : row
        })
        setEntries(updatedEntries)
      } catch (err) {
        console.error(err)
      }
    }
    setIsEdit(false)
  }

  return isEdit ? (
    <EntryForm data={entry} onSuccess={handleUpdateEntry} {...props} />
  ) : (
    <Flex
      height="40px"
      bg="lightgray"
      my={2}
      p={2}
      alignItems="center"
      justifyContent="space-between"
      width={1}
      sx={{
        border: "1px solid mediumgray",
        borderRadius: "5px",
      }}
      {...props}
    >
      <Flex width={1}>
        <Box mr={3} width={[1 / 4]}>
          {entry?.startDay !== -1 && moment().day(entry?.startDay).format("ddd")}
          {!isSingle
            ? " - " + (entry?.endDay !== -1 && moment().day(entry?.endDay).format("ddd"))
            : ""}
          :
        </Box>
        <Times entry={entry} />
      </Flex>
      <Flex alignItems="center">
        <Box
          mr={2}
          fontSize="20px"
          sx={{ cursor: "pointer", ":hover": { color: "primary" } }}
          onClick={() => handleEditOnClick(entry.id)}
        >
          &#9998;
        </Box>
        <Box
          fontSize="26px"
          sx={{
            paddingBottom: "2px",
            cursor: "pointer",
            lineHeight: "21px",
            ":hover": { color: "danger" },
          }}
          onClick={() => handleDeleteOnClick(entry.id)}
        >
          &times;
        </Box>
      </Flex>
    </Flex>
  )
}

const Entries = ({ entries, setEntries }) => {
  // @ts-ignore
  return (
    <Flex flexDirection="column">
      {entries.map((entry: Entry) => {
        return <EntryRow key={entry.id} entry={entry} setEntries={setEntries} entries={entries} />
      })}
    </Flex>
  )
}

const Home: BlitzPage = () => {
  const [entries, setEntries] = useState<Entry[]>([])
  const [isNewEntryFormVisible, setIsNewEntryFormVisible] = useState(false)
  const [createEntryMutation] = useMutation(createEntry)

  useEffect(() => {
    async function getEntries() {
      const initialEntries = await invoke(getEntriesQuery, null)
      setEntries(initialEntries)
    }
    getEntries()
  }, [])

  const handleCreateEntry = async (data) => {
    const entry = await createEntryMutation(data)
    setEntries([...entries, entry])
    setIsNewEntryFormVisible(false)
  }

  const handleNewEntryButtonClick = () => {
    setIsNewEntryFormVisible(true)
  }

  return (
    <Box>
      {entries.length ? (
        <Entries entries={entries} setEntries={setEntries} />
      ) : (
        <Box py={2}>No Entries</Box>
      )}
      <Box>
        {isNewEntryFormVisible ? (
          <EntryForm onSuccess={handleCreateEntry} />
        ) : (
          <Button bg="primary" mt={2} onClick={handleNewEntryButtonClick}>
            New Entry
          </Button>
        )}
      </Box>
    </Box>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
