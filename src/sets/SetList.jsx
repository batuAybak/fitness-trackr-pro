import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function SetList({ routineData }) {
  return (
    <ul>
      {routineData.sets.length === 0 ? ( //If no routine previously, return p tag
        <p>This routine doesn&apos;t have any sets. Add one?</p>
      ) : (
        //If not, return routine data
        routineData.sets.map((set) => <SetListItem key={set.id} set={set} />)
      )}
    </ul>
  );
}

function SetListItem({ set }) {
  const { token } = useAuth();

  //delete sets
  const {
    mutate: deleteSet,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation("DELETE", `/sets/${set.id}`, ["routines"]); //Invalidate routines because sets data cached there
  return (
    <li>
      <p>
        {set.name} x {set.count}
      </p>
      {token && (
        <button onClick={() => deleteSet()}>
          {deleteLoading ? "Deleting" : deleteError ? deleteError : "Delete"}
        </button>
      )}
    </li>
  );
}
