import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";

export default function AddSetForm({ routine }) {
  //adding sets
  const {
    mutate: add,
    loading: addLoading,
    error: addError,
  } = useMutation("POST", "/sets", ["routines"]); //Invalidate routines because sets data cached there

  //fetching activities
  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useQuery("/activities", "activities");

  //function to add a set from user input
  const addSet = (formData) => {
    const activityId = formData.get("activityName");
    const count = formData.get("count");
    const routineId = routine.id;
    if (count < 0) return addError;
    add({ activityId, routineId, count });
  };

  if (activitiesLoading || !activities) return <p>Loading...</p>;
  if (activitiesError) return <p>Sorry! {activitiesError}</p>;
  return (
    <>
      <h2>Add a set</h2>
      <form action={addSet}>
        <label>
          Name
          <select id="sets" name="activityName" required>
            {activities?.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Count
          <input type="number" name="count" min="1" step="1" />
        </label>
        <button>{addLoading ? "Adding Set..." : "Add Set"}</button>
        {addError && <output>{addError}</output>}
      </form>
    </>
  );
}
