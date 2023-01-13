import { useUsersQuery, User } from './users.service';

const UserDetails = (props: { user: User }) => {
	const { user } = props;
	return (
		<p>
			{user.id}. Name: {user.name} | Username: {user.username}
		</p>
	);
};

const UserList = () => {
	const { isFetching, data, error } = useUsersQuery();

	return (
		<section>
			<h1>API Call using RTKQuery</h1>
			<hr />
			{isFetching ? (
				<p>Loading.....</p>
			) : data ? (
				data.map((user) => <UserDetails key={user.id} user={user} />)
			) : (
				<p>No Data</p>
			)}
			{!!error && <p>Something went wrong!</p>}
		</section>
	);
};

export default UserList;