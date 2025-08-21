import { useAuth } from "../auth/AuthContext";
import RoutineList from "./RoutineList";
import RoutinesForm from "./RoutinesForm";

export default function RoutinesPage() {
  const { token } = useAuth();
  return (
    <>
      <h1>Routines</h1>
      <RoutineList />
      {token && <RoutinesForm />}
    </>
  );
}
