import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";
import { useEffect } from "react";
import { useState } from "react";

export default function ActivityDetailsPage() {
  const { id } = useParams(); //Grab the id
  const { token } = useAuth();
  const navigate = useNavigate();
  const [deleteCalled, setDeleteCalled] = useState(false); //to track if delete button is clicked

  //Delete an activity per given id
  const {
    mutate: deleteActivity,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation("DELETE", "/activities/" + id, ["activities"]);

  //Fetch a particular activity per given id
  const {
    data: activity,
    loading: fetchLoading,
    error: fetchError,
  } = useQuery(`/activities/${id}`, "activities");

  /**
   * Added a useEffect to navigate after deletion is successful
   * If delete button clicked, loading completed and no delete errors,
   * navigate to activities page.
   *
   * Because deleteLoading and deleteError are false before and after deleteActivity(),
   * navigate("/") would run before and after deleteActivity().
   * I needed one more state variable (deleteCalled),
   * so that I am able to execute navigate("/") AFTER the deleteActivity().
   */
  useEffect(() => {
    if (!deleteLoading && !deleteError && deleteCalled) {
      navigate("/");
    }
  }, [deleteLoading, deleteError, navigate, deleteCalled]);

  // If still fetching OR no activity fetched, display Loading
  if (fetchLoading || !activity) return <p>Loading...</p>;
  return (
    <>
      <h1>Activity Details</h1>
      <p>
        <strong>Activity Name: </strong>
        {activity.name}
      </p>
      <p>
        <strong>Activity Description: </strong>
        {activity.description}
      </p>
      <p>
        <strong>Creator Name: </strong>
        {activity.creatorName}
      </p>
      {token && (
        <button
          onClick={() => {
            setDeleteCalled(true);
            deleteActivity();
          }}
        >
          {deleteLoading ? "Deleting" : deleteError ? deleteError : "Delete"}
        </button>
      )}

      {fetchError && <output>{fetchError}</output>}
    </>
  );
}
