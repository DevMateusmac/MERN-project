/* eslint-disable react/prop-types */
import UsersItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

export default function UsersList({ users }) {
  if (users.length === 0) {
    return (
      <section>
        <Card>
          <h2>No users found.</h2>
        </Card>
      </section>
    );
  }

  return (
    <ul className="users-list">
      {users.map((user) => (
        <UsersItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
}
