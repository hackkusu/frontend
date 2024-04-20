import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { connect } from "react-redux";
import { Input, Button, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

// Reactstrap
import { Form, Dropdown, DropdownToggle, DropdownMenu, Modal, Label, FormFeedback } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

// import images
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  // changeSidebarType,
} from "../../store/actions";

import SurveyModal from '../Common/SurveyModal';

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";


const Header = props => {
  const [search, setsearch] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);
  const [modal_mdo, setmodal_mdo] = useState("@mdo");
  const [modal_mdotoggle, setmodal_mdotoggle] = useState(false);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    var windowSize = document.documentElement.clientWidth;

    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
    if (windowSize > 991) {
      (body.getAttribute('data-sidebar-size') === 'sm') && windowSize > 991 ? body.setAttribute('data-sidebar-size', 'lg') : body.setAttribute('data-sidebar-size', 'sm');
    }
  }

  function mdo_modal() {
    setmodal_mdotoggle(!modal_mdotoggle);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="20" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="20" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <Form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={props.t("Search") + "..."}
                />
                <span className="uil-search"></span>
              </div>
            </Form>
          </div>

          <div className="d-flex">

            <Dropdown
              className="d-inline-block d-lg-none ms-2"
              onClick={() => {
                setsearch(!search);
              }}
              type="button"
            >
              <DropdownToggle
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
                tag="button"
              > <i className="uil-search" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                <Form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <Input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                      <div className="input-group-append">
                        <Button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </DropdownMenu>
            </Dropdown>


            {/* <DeleteModal show={true} /> */}

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                mdo_modal();
                setmodal_mdo("@mdo")
              }}
            >
              Update Survey
            </button>

            
            <SurveyModal open={modal_mdotoggle} closeModal={() => mdo_modal()}></SurveyModal>

            {/* <NotificationDropdown /> */}

            <ProfileMenu />

            {/* <div onClick={() => {
              props.showRightSidebarAction(!props.showRightSidebar);
            }}
              className="dropdown d-inline-block">
              <button type="button" className="btn header-item noti-icon right-bar-toggle waves-effect">
                <i className="uil-cog"></i>
              </button>
            </div> */}

          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  // changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;


  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  // changeSidebarType,
})(withTranslation()(Header));
