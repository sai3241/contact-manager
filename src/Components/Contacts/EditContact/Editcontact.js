import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Contactservices } from "../../../Services/Contactservices";
import Spinner from "../../Spinner/Spinner";

const Editcontact = () => {
  let { contactId } = useParams();
  let navigate = useNavigate();

  let [state, setState] = useState({
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
    errorMessage: "",
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
      setState({ ...state, loading: true });
      let response = await Contactservices.getContact(contactId);
      let groupResponse = await Contactservices.getGroups();
      setState({
        ...state,
        loading: false,
        contact: response.data,
        groups: groupResponse.data,
      });
    } catch (error) {
      setState({
        ...state,
        loading:false,
        errorMessage:error.message
      })
    }
  }, []);

  const handlesubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await Contactservices.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errormessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, groups, errormessage } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="add-contact">
            <div className="container">
              <div className="row p-3">
                <div className="col">
                  <p className="h3 text-primary fw-bold">Edit Contact</p>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis, totam cupiditate, repellat atque quis, excepturi
                    corporis at soluta harum ut quo fuga perspiciatis nesciunt
                    animi enim ad quibusdam sunt nostrum.
                  </p>
                </div>
              </div>
              <div className="row align-items-center">
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
                        className="form-control"
                        required={true}
                        name="groupId"
                        value={contact.groupId}
                        onChange={updateInput}
                      >
                        <option value="">Select a Group</option>

                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.Id} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img src={contact.photo} alt="" className="contact-img" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Editcontact;
