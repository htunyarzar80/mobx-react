
import PetList from "./Components/PetList";
import petOwner from "./Store/petOwner";
import OwnerList from "./Components/OwnerList";

function App() {
  
  return (
    <div className=" me-5" style={{padding: '30px',alignItems:"center",justifyContent:"center",borderRadius:"10px"}}>
      <h1>Pets List</h1>
      <PetList store={petOwner} />
      <hr />
      <h1>Owners List</h1>
      <OwnerList store={petOwner} />
    </div>
  );
}

export default App;