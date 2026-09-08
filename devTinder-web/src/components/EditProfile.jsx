import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=800&auto=format&fit=crop";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhotoUrl(user.photoUrl || "");
    setAge(user.age ?? "");
    setGender(user.gender || "");
    setAbout(user.about || "");
    setSkills(Array.isArray(user.skills) ? user.skills : []);
  }, [user]);

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill || skills.includes(skill)) {
      setSkillInput("");
      return;
    }
    setSkills([...skills, skill]);
    setSkillInput("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        firstName,
        lastName,
        photoUrl,
        about,
        skills,
      };
      if (age !== "") payload.age = Number(age);
      if (gender) payload.gender = gender;

      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.Message ||
          "Could not save profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const previewUser = {
    firstName: firstName || "Your",
    lastName: lastName || "Name",
    photoUrl: photoUrl || FALLBACK_PHOTO,
    age,
    gender,
    about: about || "Tell other developers a little about you.",
    skills,
  };

  if (!user) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden px-4 py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 left-[15%] h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Your profile
          </p>
          <h1 className="mt-2 text-3xl font-bold">Edit how you show up</h1>
          <p className="mt-2 text-base-content/60">
            Update your details and watch the live preview change instantly.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
          <div className="card w-full max-w-md border border-base-300 bg-base-200/80 shadow-xl backdrop-blur">
            <div className="card-body">
              <div className="mb-2 flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-200">
                    <img src={photoUrl || FALLBACK_PHOTO} alt="Profile preview" />
                  </div>
                </div>
                <div>
                  <h2 className="card-title capitalize">
                    {firstName || "First"} {lastName || "Last"}
                  </h2>
                  <p className="text-sm text-base-content/60">
                    This is how others will see you
                  </p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <fieldset className="fieldset p-0">
                    <legend className="fieldset-legend">First name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Ada"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>

                  <fieldset className="fieldset p-0">
                    <legend className="fieldset-legend">Last name</legend>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Lovelace"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </div>

                <fieldset className="fieldset p-0">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    className="input w-full text-sm"
                    placeholder="https://example.com/photo.jpg"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <fieldset className="fieldset p-0">
                    <legend className="fieldset-legend">Age</legend>
                    <input
                      type="number"
                      min="18"
                      max="100"
                      className="input w-full"
                      placeholder="18+"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </fieldset>

                  <fieldset className="fieldset p-0">
                    <legend className="fieldset-legend">Gender</legend>
                    <div className="grid grid-cols-3 gap-1">
                      {GENDER_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`btn btn-sm px-0 ${
                            gender === option.value
                              ? "btn-primary"
                              : "btn-ghost border border-base-300"
                          }`}
                          onClick={() => setGender(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <fieldset className="fieldset p-0">
                  <legend className="fieldset-legend">Skills</legend>
                  <div className="mb-2 flex min-h-8 flex-wrap gap-2">
                    {skills.length === 0 && (
                      <span className="text-sm text-base-content/50">
                        Add a few skills, like React or Node
                      </span>
                    )}
                    {skills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        className="badge badge-primary badge-outline gap-1 py-3"
                        onClick={() =>
                          setSkills(skills.filter((item) => item !== skill))
                        }
                      >
                        {skill}
                        <span aria-hidden="true">×</span>
                      </button>
                    ))}
                  </div>
                  <div className="join w-full">
                    <input
                      type="text"
                      className="input join-item w-full"
                      placeholder="Type a skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn join-item"
                      onClick={addSkill}
                    >
                      Add
                    </button>
                  </div>
                </fieldset>

                <fieldset className="fieldset p-0">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    className="textarea h-28 w-full leading-relaxed"
                    placeholder="Tell other developers what you are building and looking for."
                    maxLength={200}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <p className="label justify-end">{about.length}/200</p>
                </fieldset>

                {error && <p className="text-center text-sm text-error">{error}</p>}

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={saving}
                >
                  {saving && (
                    <span className="loading loading-spinner loading-sm" />
                  )}
                  Save profile
                </button>
              </form>
            </div>
          </div>

          <div className="w-full max-w-md lg:sticky lg:top-24">
            <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-base-content/50">
              Live preview
            </p>
            <UserCard user={previewUser} showActions={false} />
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
