import { Header } from "./components/Header";
import { PageSpinner } from "./components/UI/Spinner";
import { useAppSelector } from "./hooks/redux";
import { userAPI } from "./services/UserService";
import { useEffect } from 'react'
import { Todos } from "./components/Todos";

function App() {
  const { isLoading } = useAppSelector(state => state.globalSlice)
  const { isAuth } = useAppSelector(state => state.UserSlice)
  const { todos } = useAppSelector(state => state.TodosSlice)

  const [checkAuth] = userAPI.useRefreshMutation()
  const [update] = userAPI.useUpdateTodosMutation()

  useEffect(() => {
    if (isAuth) {
      update(todos)
    }
  }, [todos])

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      {isLoading && <PageSpinner />}
      <Header />
      <div className="container">
        <Todos />
      </div>
    </>
  );
}

export default App;
