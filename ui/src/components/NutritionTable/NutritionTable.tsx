import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { get } from 'lodash'
import { GraphQLClient } from 'graphql-request'
import classNames from 'classnames'
import {
  makeStyles,
  Checkbox,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

import { getDessertsQuery } from '#queries'
import { createDessertMutation, deleteDessertsMutation } from '#mutations'
import { CreateItemModal } from './'

/* Constants */
const sortTypes = {
  NONE: null,
  NAME: 'name',
  CALORIES: 'nutrition.calories',
  PROTEIN: 'nutrition.protein',
  CARBS: 'nutrition.carbs',
  FAT: 'nutrition.fat',
}

const sortDirections = {
  NONE: null,
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
}
const defaultSortType = sortTypes.NONE
const defaultSortDirection = sortDirections.NONE

const endpoint = 'http://localhost:4001/graphql'
const client = new GraphQLClient(endpoint, {
  headers: {},
})
/* Constants */

const NutritionTable = () => {
  const [sortType, setSortType] = useState<string | null>(defaultSortType)
  const [sortDirection, setSortDirection] = useState<string | null>(
    defaultSortDirection
  )
  const [selectedDessertIds, setSelectedDessertIds] = useState<string[]>([])
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false)

  /* Queries */
  const getDesserts = async () => {
    try {
      return await client.request(getDessertsQuery)
    } catch (error) {
      console.log(error)
    }
  }
  const getDessertsQueryResults = useQuery('desserts', getDesserts)
  const { isLoading, error } = getDessertsQueryResults

  /* Mutations */
  const createDessert = async (dessert: Dessert) => {
    try {
      return await client.request(createDessertMutation, dessert)
    } catch (error) {
      console.log(error)
    }
  }
  const createDessertResult = useMutation('createDessert', createDessert)

  const deleteDesserts = async (dessertIds: Array<string>) => {
    console.log(dessertIds)
    try {
      return await client.request(deleteDessertsMutation, { ids: dessertIds })
    } catch (error) {
      console.log(error)
    }
  }
  const deleteDessertsResult = useMutation('deleteDesserts', deleteDesserts)

  const items = get(getDessertsQueryResults, 'data.desserts', [])
  /* Computed integers */
  const selectionCount = selectedDessertIds.length

  /* Predicates */
  const isAtleastOneItemSelected = selectionCount > 0
  const isMoreThanOneItemSelected = selectionCount > 1

  /* Computed text */
  const pluralizableDessert = `dessert${isMoreThanOneItemSelected ? 's' : ''}`
  const selectionText = `${selectionCount} ${pluralizableDessert} selected`

  const sortedItems = ((): Dessert[] => {
    const { ASCENDING, DESCENDING } = sortDirections

    if (sortType) {
      return items.concat().sort((a: Dessert, b: Dessert): number => {
        if (sortDirection === ASCENDING) {
          if (get(a, sortType) > get(b, sortType)) return 1
          if (get(a, sortType) < get(b, sortType)) return -1
          return 0
        }

        if (sortDirection === DESCENDING) {
          if (get(a, sortType) < get(b, sortType)) return 1
          if (get(a, sortType) > get(b, sortType)) return -1
          return 0
        }

        return 0
      })
    }

    return items.concat()
  })()

  /* Handlers */
  const handleSelection = (id: string) => {
    setSelectedDessertIds((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    )
  }

  const handleSort = (newSortType: string): void => {
    const { ASCENDING, DESCENDING } = sortDirections

    if (sortType === newSortType) {
      if (sortDirection === ASCENDING) return setSortDirection(DESCENDING)
      if (sortDirection === DESCENDING) return setSortDirection(ASCENDING)
    }

    setSortType(newSortType)
    setSortDirection(ASCENDING)
  }

  const handleSubmit = (dessert: Dessert) => {
    createDessertResult.mutate(dessert)
    setIsCreateItemModalOpen(false)
  }

  const handleResetData = () => {
    setSelectedDessertIds([])
    setSortType(defaultSortType)
    setSortDirection(defaultSortDirection)
  }

  const handleDeletion = () => {
    console.log('Handling deletion . . .')
    deleteDessertsResult.mutate(selectedDessertIds)
  }

  const classes = useStyles()

  if (isLoading) return <div>Loading . . .</div>
  if (error) return <div>There were errors.</div>
  return (
    <>
      <TableContainer>
        <Grid container>
          <Grid item>
            <h1>Nutrition List</h1>
          </Grid>
          <Grid item justify="flex-end">
            <Button
              color="primary"
              variant="outlined"
              onClick={handleResetData}
            >
              Reset Data
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          {isAtleastOneItemSelected && (
            <Grid item>
              <p>{selectionText}</p>
            </Grid>
          )}
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setIsCreateItemModalOpen(true)
              }}
            >
              Create
            </Button>
          </Grid>
          <Grid item>
            <Button color="primary" variant="outlined">
              Update
            </Button>
          </Grid>
          <Grid item>
            <Button color="primary" variant="outlined" onClick={handleDeletion}>
              Delete
            </Button>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="center"></TableCell>
              {[
                { text: 'Dessert (100g serving)', sortBy: sortTypes.NAME },
                { text: 'Calories', sortBy: sortTypes.CALORIES },
                { text: 'Fat (g)', sortBy: sortTypes.FAT },
                { text: 'Carbs (g)', sortBy: sortTypes.CARBS },
                { text: 'Protein (g)', sortBy: sortTypes.PROTEIN },
              ].map(({ text, sortBy }, index) => (
                <TableCell
                  align="center"
                  key={`${text}-${index}`}
                  onClick={() => handleSort(sortBy)}
                  className={classNames({
                    [classes.tableHeader]: true,
                    [classes.ascending]:
                      sortDirection === sortDirections.ASCENDING &&
                      sortType === sortBy,
                    [classes.descending]:
                      sortDirection === sortDirections.DESCENDING &&
                      sortType === sortBy,
                  })}
                >
                  {text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems.map(
              (
                { id, name, nutrition: { calories, fat, carbs, protein } },
                index
              ) => (
                <TableRow key={`${id}-${index}`}>
                  <TableCell align="center" size="small">
                    <Checkbox
                      checked={selectedDessertIds.includes(id)}
                      onChange={() => {
                        handleSelection(id)
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{name}</TableCell>
                  <TableCell align="center">{calories}</TableCell>
                  <TableCell align="center">{fat}</TableCell>
                  <TableCell align="center">{carbs}</TableCell>
                  <TableCell align="center">{protein}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateItemModal isOpen={isCreateItemModalOpen} onSubmit={handleSubmit} />
    </>
  )
}

const useStyles = makeStyles({
  ascending: {
    color: 'blue',
  },
  descending: {
    color: 'red',
  },
  tableHead: {
    backgroundColor: 'aqua',
  },
  tableHeader: {
    fontWeight: 'bold',
    cursor: 'pointer',
  },
})

interface Nutrition {
  calories: number
  fat: number
  carbs: number
  protein: number
}

interface Dessert {
  id: string
  name: string
  nutrition: Nutrition
}

export default NutritionTable
