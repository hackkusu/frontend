import React from "react";
import { Card, CardBody, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import SimpleBar from "simplebar-react";

const RecentActivity = () => {
    return (
        <Card>
            <CardBody>
                <div className="float-end">
                    <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="text-reset" id="dropdownMenuButton5" caret>
                            <span className="text-muted">Recent<i className="mdi mdi-chevron-down ms-1"></i></span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem href="#">Recent</DropdownItem>
                            <DropdownItem href="#">By Users</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>

                <h4 className="card-title mb-4">Highlight Responses</h4>

                <SimpleBar className="activity-feed mb-0 ps-2" style={{ maxHeight: '336px' }}>
                    <li className="feed-item">
                        <div className="feed-item-list">
                            <p className="text-muted mb-1 font-size-13">Today<small className="d-inline-block ms-1">12:20 pm</small></p>
                            <p className="mt-0 mb-0">I really appreciated the depth of discussion around ethical considerations in law the practical examples made the theory much more accessible.</p>
                            
                            <span className="badge bg-soft-success font-size-12">Success</span>
                        </div>
                    </li>
                    <li className="feed-item">
                        <p className="text-muted mb-1 font-size-13">22 Jul, 2020 <small className="d-inline-block ms-1">12:36 pm</small></p>
                        <p className="mt-0 mb-0">I found the lecture to be a good refresher on some of the basics but im looking forward to more engaging content in future sessions."</p>
                        <span className="badge bg-soft-warning font-size-12">Nuetral</span>
                    </li>
                    <li className="feed-item">
                        <p className="text-muted mb-1 font-size-13">18 Jul, 2020 <small className="d-inline-block ms-1">07:56 am</small></p>
                        <p className="mt-0 mb-0">I think the lecture could benefit from a clearer structure and more relatable examples it was hard to follow the main points at times.</p>
                            <span className="badge bg-soft-danger font-size-12">Negative</span>
                    </li>
                    

                </SimpleBar>

            </CardBody>
        </Card>
    );
};

export default RecentActivity;