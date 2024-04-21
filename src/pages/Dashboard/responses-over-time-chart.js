import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Col, Row } from "reactstrap";
import Pusher from 'pusher-js';
import { get } from "../../helpers/api_helper";

const ResponsesOverTimeChart = () => {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            id: "realtime",
            type: "area",
            height: 350,
            zoom: {
                autoScaleYaxis: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 3,
        },
        colors: ["#34c38f", "#f46a6b"],
        xaxis: {
            type: "datetime",
        },
        grid: {
            borderColor: "#f1f1f1",
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
    });

    const updateTimeFormat = (seriesData) => {
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        const dataRange = seriesData.map((s) => s.data).flat();
        if (dataRange.length > 0) {
            const timeRange = new Date(dataRange[dataRange.length - 1].x).getTime() - new Date(dataRange[0].x).getTime();

            if (timeRange <= oneDay) {
                setOptions((prevOptions) => ({
                    ...prevOptions,
                    xaxis: {
                        ...prevOptions.xaxis,
                        labels: {
                            datetimeUTC: false,
                            datetimeFormatter: {
                                year: 'yyyy',
                                month: 'MMM \'yy',
                                day: 'dd MMM',
                                hour: 'HH:mm',
                            },
                        },
                        tooltip: {
                            x: {
                                format: "HH:mm dd/MM/yy",
                            },
                        },
                    },
                }));
            } else {
                setOptions((prevOptions) => ({
                    ...prevOptions,
                    xaxis: {
                        ...prevOptions.xaxis,
                        labels: {
                            datetimeUTC: false,
                            datetimeFormatter: {
                                year: 'yyyy',
                                month: 'MMM \'yy',
                                day: 'dd MMM',
                                hour: 'HH:mm',
                            },
                        },
                        tooltip: {
                            x: {
                                format: "dd/MM/yy",
                            },
                        },
                    },
                }));
            }
        }
    };

    useEffect(() => {
        const fetchInitialData = () => {
            get('/api/get_responses_over_time')
                .then(data => {
                    setSeries(data.series);
                    updateTimeFormat(data.series);
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchInitialData();

        // Pusher Configuration
        const pusher = new Pusher('1bbaecb26111a9ad219d', {
            cluster: 'us3',
            encrypted: true
        });

        // Subscribe to the channel
        const channel = pusher.subscribe('survey-response-channel');

        // Bind to the update event
        channel.bind('new-response', (data) => {
            fetchInitialData();
        });

        // Cleanup function
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    return (
        <div>
            <Row>
                <Col xl={12}>
                <div className="float-end">
                        <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="text-reset" id="dropdownMenuButton5" caret href="#">
                                {/* <span className="fw-semibold">Sort By:</span>  */}
                                <span className="text-muted">Yearly<i className="mdi mdi-chevron-down ms-1"></i></span>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#">Monthly</DropdownItem>
                                <DropdownItem href="#">Yearly</DropdownItem>
                                <DropdownItem href="#">Weekly</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </Col>
            </Row>

            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height="350"
            />
        </div>
    );
};

export default ResponsesOverTimeChart;
