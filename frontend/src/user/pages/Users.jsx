import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function Users() {
  const [users, setUsers] = useState();
  const { clearError, sendRequest, error, isLoading} = useHttpClient();


  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await sendRequest(`${import.meta.env.REACT_APP_BACKEND_URL}/users`);
        setUsers(data.users);
      } catch (err) {
        console.log(err)
      }
    }
    fetchUsers();
  }, [sendRequest]);


  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UsersList users={users} />}
    </>
  );
}
