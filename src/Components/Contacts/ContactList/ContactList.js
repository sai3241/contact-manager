import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Contactservices } from "../../../Services/Contactservices";
import Spinner from "../../Spinner/Spinner";

const ContactList = () => {
  const [query, setQuery] = useState({
    text: "",
  });
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });

  useEffect(async () => {
    try {
      setState({ ...state, loading: true });
      let response = await Contactservices.getAllContacts();
      setState({
        ...state,
        loading: false,
        contacts: response.data,
        filteredContacts: response.data,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, []);

  const clickdelete = async (contactId) => {
    try {
      let response = await Contactservices.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await Contactservices.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  };

  let searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredContacts: theContacts,
    });
  };

  let { loading, contacts, filteredContacts, errorMessage } = state;

  return (
    <>
      {/* <pre>{JSON.stringify(contacts)}</pre> */}
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Contact Manger
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Reprehenderit nobis beatae maiores ipsam nulla quia nemo
                  similique? Quibusdam consequatur est, sunt aliquam culpa, amet
                  sapiente, dolorem et illum ex officia.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        onChange={searchContacts}
                        type="text"
                        className="form-control"
                        placeholder="Search names"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filteredContacts.length > 0 &&
                  filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-6" key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src={contact.photo}
                                  alt=""
                                  className="contact-img"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:
                                    <span className="fw-bold ms-2">
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile:
                                    <span className="fw-bold ms-2">
                                      {contact.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email:
                                    <span className="fw-bold ms-2">
                                      {contact.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen"></i>
                                </Link>
                                <button
                                  className="btn btn-danger my-1"
                                  onClick={() => clickdelete(contact.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ContactList;
