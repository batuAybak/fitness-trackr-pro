import useQuery from "../api/useQuery";
import { Link } from "react-router";

export default function RoutineList() {
  const { data: routines, loading, error } = useQuery("/routines", "routines");

  if (loading || !routines) return <p>Routines Loading...</p>;
  if (error) return <p>Failed! {error}</p>;
  return (
    <ul>
      {routines.map((routine) => (
        // Map through the fetched routines array, and print each item by calling RoutineListItem function
        <RoutineListItem key={routine.id} routine={routine} />
      ))}
    </ul>
  );
}

// Create Link for a single item
function RoutineListItem({ routine }) {
  /**
   * This method needs to be separate.
   */
  return (
    <li>
      <Link to={`/routine-details-page/${routine.id}`}>{routine.name}</Link>
    </li>
  );
}
