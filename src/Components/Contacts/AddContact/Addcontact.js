import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contactservices } from "../../../Services/Contactservices";

const Addcontact = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errormessage: "",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(async () => {
    try {

      setState({
        ...state,
        loading: true });
        // let response = await Contactservices.getContact(contactId);
        let response = await Contactservices.getGroups()
setState({
  ...state,
  loading:false,
  // contact:response.data,
  groups:response.data
})
    } catch (error) {}
  }, []);

  const handlesubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await Contactservices.createContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errormessage: error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  let { loading, contact, groups, errormessage } = state;
  return (
    <>
    {/* <pre>{JSON.stringify(state.contact)}</pre> */}
      <section className="add-contact">
        <div className="container">
          <div className="row p-3">
            <div className="col">
              <p className="h3 text-success fw-bold">Create Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                totam cupiditate, repellat atque quis, excepturi corporis at
                soluta harum ut quo fuga perspiciatis nesciunt animi enim ad
                quibusdam sunt nostrum.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={handlesubmit}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Photo Url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    type="number"
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="company"
                    value={contact.company}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <select
                    required={true}
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                    className="form-control"
                  >
                    <option value="">Select a Group</option>
                    {groups.length > 0 &&
                      groups.map(group => {
                        return (
                          <option key={group.Id} value={group.id}>{group.name}</option>
                      )
                        })
                      }
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Addcontact;
