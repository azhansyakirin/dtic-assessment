import { useEffect, useState } from "react";
import { isNil, fetchUsers } from "./utils";
import { parseUser } from "./parsers";
import Button from "./components/Button";
import Table from "./components/Table";
import initialUser from "./initial-user";

export default function App() {
    const [users, setUsers] = useState<Record<string, any>[]>([
        { ...initialUser },
    ]);

    useEffect(() => {
        callApi();
    }, []);

    const callApi = async () => {
        const res = await fetchUsers();
        setUsers(parseUser(res as Record<string, any>[]));
    };

    const cols = [
        {
            key: "thumbnail",
            caption: "",
            render: (user: any) => (
                <span>
                    {!isNil([user.firstName, user.lastName, user.thumbnail]) && (
                        <img
                            alt={`${user.firstName} ${user.lastName}`}
                            src={`${user.thumbnail}`}
                            width={48}
                            height={48}
                        />
                    )}
                </span>
            ),
        },
        {
            key: "name",
            caption: "Name",
            render: (user: any) => (
                <>
                    {!isNil([user.firstName, user.lastName, user.gender]) && (
                        <div className="truncate">
                            {`${user.firstName} ${user.lastName}`} (
                            {user.gender.charAt(0).toUpperCase()})
                        </div>
                    )}
                </>
            ),
        },
        {
            key: "location",
            caption: "Location",
            render: (user: any) => (
                <>
                    {!isNil([user.location?.state, user.location?.country]) && (
                        <span>
                            {user.location.state}, {user.location.country}
                        </span>
                    )}
                </>
            ),
        },
        {
            key: "email",
            caption: "Email",
            render: (user: any) => (
                <>
                    {!isNil(user.email) && <div className="truncate">{user.email}</div>}
                </>
            ),
        },
    ];

    console.log(cols)

    function refetchUsers() {
        callApi();
    }

    return (
        <div className="App">
            <h1>SCSS + React Hook + Data Processing</h1>
            <div className="box">
                Time: 25 minutes
                <ol>
                    <li>
                        Finish the Button component that takes "ButtonProps" interface as
                        its props. The style of the Button will change depends on the
                        variant prop following the SCSS styling.
                    </li>
                    <li>
                        Assuming "getUsers" is an API function to fetch users. Replace the
                        initial user in the table with users from "getUsers" function.
                    </li>
                    <li>
                        Complete the "parseUser" function. "parseUser" is used to convert
                        data from API to be more component friendly props.
                    </li>
                    <li>
                        [BONUS] Make the "Regenerate" button onClick event to refetch a new
                        set of users from "getUsers" function.
                    </li>
                </ol>
            </div>
            <Table caption="Current Users" columns={cols} data={users} />
            <Button
                variant={"primary"}
                onClick={() => {
                    refetchUsers();
                }}
            >
                Regenerate
            </Button>
        </div>
    );
}