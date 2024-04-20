import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
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
