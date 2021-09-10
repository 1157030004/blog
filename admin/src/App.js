import "./App.css";
import { Admin, Resource, EditGuesser, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import UserList from "./components/userList/UserList";
import { PostCreate, PostEdit, PostList } from "./components/postList/PostList";
import { Book, People } from "@material-ui/icons";
import Dashboard from "../src/components/dashboard/Dashboard";
import dataProvidera from "./dataProvider";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => {
	console.log("DATA", dataProvidera);
	return (
		<Admin dashboard={Dashboard} dataProvider={dataProvidera}>
			<Resource
				name="universities"
				list={PostList}
				edit={PostEdit}
				create={PostCreate}
				icon={Book}
			/>
			<Resource name="users" list={UserList} icon={People} />
		</Admin>
	);
};

export default App;
