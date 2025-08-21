import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import AddSetForm from "../sets/AddSetForm";
import SetList from "../sets/SetList";

export default function RoutineDetailsPage() {
  const { id } = useParams();
  const { token, sessionUsername } = useAuth();
  const navigate = useNavigate();

  //Fetch a particular routine by id
  const {
    data: routineData,
    loading: fetchLoading,
    error: fetchError,
  } = useQuery(`/routines/${id}`, "routines");

  //Delete a particular routine by id
  const {
    mutate: deleteRoutine,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation("DELETE", `/routines/${id}`, ["routines"]);

  if (fetchLoading || !routineData) return <p>Loading Routine details...</p>;
  if (fetchError) return <p>There is an error with fetching: {fetchError}</p>;

  return (
    <>
      <h1>{routineData.name}</h1>
      <p>{routineData.creatorName}</p>
      <p>{routineData.goal}</p>
      {token && (
        <button
          onClick={() => {
            /**
             * In Login.jsx, create a state var [sessionUsername, setSessionUsername] = useState();
             * setSessionUsername(username) in login page
             * Run deleteActivity(), then compare creatorName with sessionUsername,
             * according to that result, navigate or not
             */
            deleteRoutine();
            if (sessionUsername === routineData.creatorName)
              navigate("/routines");
          }}
        >
          {deleteLoading ? "Deleting" : deleteError ? deleteError : "Delete"}
        </button>
      )}

      {/* Displaying Sets */}
      <h2>Sets</h2>
      <SetList routineData={routineData} />
      {/* Only display AddSetForm if user is logged in */}
      {token && <AddSetForm routine={routineData} />}
    </>
  );
}
