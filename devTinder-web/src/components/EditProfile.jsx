import { useState } from "react";

const EditProfile = () => {
      const [firstName,setFirstName] = useState('');
      const [lastName,setLastName] = useState('');
      const [age,setAge] = useState('');
      const [gender,setGender] = useState('');
      const [about,setAbout] = useState('');
      

    //  const [error,setError] = useState('');

  return (
      <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Error</h2>

          <form >
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">First Name</legend>
              <label className="input validator w-full">
               
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <p className="validator-hint hidden">Enter valid first name</p>
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Last Name</legend>
              <label className="input validator w-full">
                
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </fieldset>

            <div className="card-actions justify-center m-2">
            <p className="text-error"></p>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile