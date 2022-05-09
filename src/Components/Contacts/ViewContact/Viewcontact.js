import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Contactservices } from "../../../Services/Contactservices";
import Spinner from "../../Spinner/Spinner";

const Viewcontact = () => {
  let { contactId } = useParams();
  const [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
    group: {},
  });

  useEffect(async () => {
    try {
      setState({ ...state, loading: true });
      let response = await Contactservices.getContact(contactId);
      let groupResponse = await Contactservices.getGroup(response.data);
      setState({
        ...state,
        loading: false,
        contact: response.data,
        group: groupResponse.data,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, [contactId]);
  let { loading, contact, errorMessage, group } = state;
  return (
    <>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row align-item-center">
            <div className="col">
              <div className="h3 text-warning">View Contact</div>
              <p className="fs-italic">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
                unde odit nemo eius, repellat voluptatem atque suscipit sunt
                cupiditate temporibus soluta, vitae, velit quibusdam quidem sed
                doloribus dolores aliquid ratione?
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && 
            <section className="view-contact mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img src={contact.photo} alt="" className="contact-img" />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name:
                        <span className="fw-bold ms-2">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile:
                        <span className="fw-bold ms-2">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email:
                        <span className="fw-bold ms-2">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company Name:
                        <span className="fw-bold ms-2">{contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title:
                        <span className="fw-bold ms-2">{contact.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group:
                        <span className="fw-bold ms-2">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link to={"/contacts/list"} className="btn btn-warning">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          }
        </>
      )}
    </>
  );
};

export default Viewcontact;
