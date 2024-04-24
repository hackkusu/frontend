import React, { useEffect, useState } from "react";
import { Card, CardBody, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import SimpleBar from "simplebar-react";
import Pusher from 'pusher-js';
import { PUSHER_CLIENT_ID, get } from "../../helpers/api_helper";

const HighlightResponses = () => {
    const [highlightResponses, setHighlightResponses] = useState({ top_aspects: [], messages: {} });

    // Helper function to map sentiment to badge color
    const sentimentBadgeColor = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'bg-soft-success';
            case 'Neutral': return 'bg-soft-warning';
            case 'Negative': return 'bg-soft-danger';
            default: return 'bg-soft-secondary';
        }
    };

    useEffect(() => {
        // Fetch data function
        const fetchData = () => {
            get('/api/calculate_aspects')
                .then(data => setHighlightResponses(data))
                .catch(error => console.error('Error fetching highlight responses:', error));
        };

        // Initial fetch
        fetchData();

        // Pusher Configuration
        const pusher = new Pusher(PUSHER_CLIENT_ID, {
            cluster: 'us3',
            encrypted: true
        });

        // Subscribe to the channel
        const channel = pusher.subscribe('survey-response-channel');

        // Bind to the update event
        channel.bind('new-response', () => {
            fetchData(); // Fetch updated data when new data is available
        });

        // Cleanup
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

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

                <SimpleBar style={{ maxHeight: '336px' }}>
                    {Object.entries(highlightResponses.messages).map(([sentiment, { created, message }], index) => (
                        // <li className="feed-item" key={index}>
                            <div className="feed-item-list" key={index}>
                                <p className="text-muted mb-1 font-size-13">{created}<small className="d-inline-block ms-1"></small></p>
                                <p className="mt-0 mb-0">{message}</p>
                                <span className={`badge ${sentimentBadgeColor(sentiment)} font-size-12`}>{sentiment}</span>
                            </div>
                        // </li>
                    ))}
                </SimpleBar>

            </CardBody>
        </Card>
    );
};

export default HighlightResponses;
