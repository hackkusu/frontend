import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

import Pusher from 'pusher-js';
import { PUSHER_CLIENT_ID, get } from "../../../helpers/api_helper";

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"

//i18n
import { withTranslation } from "react-i18next"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // const fetchInitialData = () => {
    //     get('/api/get_responses_over_time')
    //         .then(data => {
    //             setSeries(data.series);
    //             updateTimeFormat(data.series);
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // };

    // fetchInitialData();

    // Pusher Configuration
    const pusher = new Pusher(PUSHER_CLIENT_ID, {
      cluster: 'us3',
      encrypted: true
    });

    // Subscribe to the channel
    const channel = pusher.subscribe('survey-response-channel');

    // Bind to the update event
    channel.bind('new-response', (data) => {
      setNotificationsCount(notificationsCount + 1);
      const newNotifications = notifications;
      newNotifications.push(data);
      setNotifications(newNotifications);
    });
    channel.bind('new-achievement', (data) => {
      setNotificationsCount(notificationsCount + 1);
      const newNotifications = notifications;
      newNotifications.push(data);
      setNotifications(newNotifications);
    });

    // Cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="uil-bell"></i>
          {notificationsCount > 0 ? (
            <span className="badge bg-danger rounded-pill">{notificationsCount}</span>
          ) : null}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 font-size-16"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <Link to="#!" className="small" onClick={() => {
                  setNotificationsCount(0)
                  setNotifications([])
                }}>
                  {" "}
                  Mark all as read
                </Link>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>

            {/* <Link to="" className="text-dark notification-item">
              <div className="d-flex align-items-start">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                  <i className="uil-shopping-basket"></i>
                  </span>
                </div>
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">
                    {props.t("Your order is placed")}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("If several languages coalesce the grammar")}
                    </p>
                    <p className="mb-0">
                    <i className="mdi mdi-clock-outline"></i>{" "}
                      {props.t("3 min ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="" className="text-dark notification-item">
              <div className="d-flex align-items-start">
                <img
                  src={avatar3}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">James Lemire</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("It will seem like simplified English") + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline"/>
                      {props.t("1 hours ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}

            {notifications.map((item, idx) => (
              item.message == 'A new response was added.' ? (
                <Link key={idx} to="" className="text-dark notification-item">
                  <div className="d-flex align-items-start">
                    <Row>
                      <Col xs='2'>
                        <div className="avatar-xs me-3">
                          <span className="avatar-title bg-success rounded-circle font-size-16">
                            <i className="bx bx-badge-check" />
                          </span>
                        </div>
                      </Col>
                      <Col xs='10'>

                        <div className="flex-1">
                          <h6 className="mt-0 mb-1">
                            {item.message}
                            {/* {props.t("Your item is shipped")} */}
                          </h6>
                          <div className="font-size-12 text-muted">
                            <p className="mb-1">
                              {item.phoneNumber} finished response on {item.survey_name} survey using "{item.survey_start_code}" start code. 
                              <div>"{item.response}"</div>
                              {/* {props.t("If several languages coalesce the grammar")} */}
                            </p>
                            <p className="mb-0">
                              <i className="mdi mdi-clock-outline" />{" "}
                              just now
                            </p>
                          </div>
                        </div>
                      </Col></Row>
                  </div>
                </Link>) : (
                <Link key={idx} to="" className="text-dark notification-item">
                  <div className="d-flex align-items-start">
                    <Row>
                      <Col xs='2'>
                        <div className="avatar-xs me-3">
                          <span className="avatar-title bg-primary rounded-circle font-size-16">
                            <i className="uil-shopping-basket"></i>
                          </span>
                        </div>
                      </Col>
                      <Col xs='10'>
                        <div className="flex-1">
                          <h6 className="mt-0 mb-1">
                            {item.message} 🏆🏆
                          </h6>
                          <div className="font-size-12 text-muted">
                            <p className="mb-1">
                              on {item.survey_name} survey using "{item.survey_start_code}" start code
                            </p>
                            <p className="mb-0">
                              <i className="mdi mdi-clock-outline"></i>{" "}
                              just now
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Link>)
            ))}

            {/* <Link to="" className="text-dark notification-item">
              <div className="d-flex align-items-start">
                <img
                  src={avatar4}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">Salena Layfield</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t(
                        "As a skeptical Cambridge friend of mine occidental"
                      ) + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline"/>
                      {props.t("1 hours ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}
          </SimpleBar>

          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 text-center"
              to="#"
            ><i className="uil-arrow-circle-right me-1"></i>
              {" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}