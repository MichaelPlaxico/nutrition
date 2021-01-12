import { NutritionTable } from './components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

const App = () => (
  <div className="App">
    <QueryClientProvider client={queryClient}>
      <NutritionTable />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </div>
)

export default App
