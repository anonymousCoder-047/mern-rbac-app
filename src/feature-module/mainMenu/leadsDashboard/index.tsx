import React, {useState} from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";

const route = all_routes;
const LeadsDashboard = () => {
  const [chartOptions] = useState<any>( {
    series: [
      {
        data: [400, 220, 448],
        color: "#FC0027",
      },
    ],
    chart: {
      type: "bar",
      height: 150,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Conversation", "Follow Up", "Inpipeline"],
      min: 0,  
          max: 500,  
          tickAmount: 5,  
    },
  });
  const [chartOptions2] = useState<any>( {
    series: [
      {
        data: [400, 220, 448],
        color: "#77D882",
      },
    ],
    chart: {
      type: "bar",
      height: 150,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Conversation", "Follow Up", "Inpipeline"],
      min: 0,  
          max: 500,  
          tickAmount: 5,  
    },
  });
  const [chartOptions3] = useState<any>({
    series: [44, 55, 13, 43],
    options: {
      chart: {
        width: 400,
        height: 300,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["Inpipeline", "Follow Up", "Schedule Service", "Conversation"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 275,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  
    const chartElement = document.querySelector("#leadpiechart");
    if (chartElement) {
      const options = {
        series: chartOptions3.series,
        chart: {
          width: 400,
          type: "pie",
        },
        legend: {
          position: "bottom",
        },
        labels: chartOptions3.options.labels,
        responsive: chartOptions3.options.responsive,
      };

      const chart = new ApexCharts(chartElement, options);
      chart.render();
    }
 





  // const [chartOptions3] = useState<any>( {
  //   series: [44, 55, 13, 43],
  //   options: {
  //     chart: {
  //       width: 400,
  //       height: 300,
  //       type: "pie",
  //     },
  //     legend: {
  //       position: "bottom",
  //     },
  //     labels: ["Inpipeline", "Follow Up", "Schedule Service", "Conversation"],
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 275,
  //           },
  //           legend: {
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // });
  const [chartOptions4] = useState<any>( {
    series: [
      {
        name: "Reports",
        data: [40, 30, 20, 30, 22, 20, 30, 20, 22, 30, 15, 20],
      },
    ],
    colors: ["#4A00E5"],
    chart: {
      height: 273,
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  });


  const initialSettings = {
    endDate: new Date("2020-08-11T12:30:00.000Z"),
    ranges: {
      "Last 30 Days": [
        new Date("2020-07-12T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last 7 Days": [
        new Date("2020-08-04T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last Month": [
        new Date("2020-06-30T18:30:00.000Z"),
        new Date("2020-07-31T18:29:59.999Z"),
      ],
      "This Month": [
        new Date("2020-07-31T18:30:00.000Z"),
        new Date("2020-08-31T18:29:59.999Z"),
      ],
      Today: [
        new Date("2020-08-10T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      Yesterday: [
        new Date("2020-08-09T04:57:17.076Z"),
        new Date("2020-08-09T04:57:17.076Z"),
      ],
    },
    startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
    timePicker: false,
  };
  return (
    <div>
      {/* Page Wrapper */}
      <div className="page-wrapper">
  <div className="content">
    <div className="row">
      <div className="col-md-12">
        <div className="page-header">
          <div className="row align-items-center ">
            <div className="col-md-4">
              <h3 className="page-title">Leads Dashboard</h3>
            </div>
            <div className="col-md-8 float-end ms-auto">
              <div className="d-flex title-head">
                <div className="daterange-picker d-flex align-items-center justify-content-center">
                  <div className="form-sort me-2">
                    <i className="ti ti-calendar" />
                    <DateRangePicker
                                initialSettings={initialSettings}
                              >
                                <input
                                  className="form-control bookingrange"
                                  type="text"
                                />
                              </DateRangePicker>
                  </div>
                  <div className="head-icons mb-0">
                    <CollapseHeader/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-7">
        <div className="card">
          <div className="card-header border-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h4>
                <i className="ti ti-grip-vertical me-1" />
                Recently Created Leads
              </h4>
              <div className="dropdown">
                <Link
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  to="#"
                >
                  <i className="ti ti-calendar-check me-2" />
                  Last 30 days
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link to="#" className="dropdown-item">
                    Last 15 days
                  </Link>
                  <Link to="#" className="dropdown-item">
                    Last 30 days
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive custom-table">
              <table className="table dataTable" id="lead-project">
                <thead className="thead-light">
                  <tr>
                    <th>Lead Name</th>
                    <th>Company Name</th>
                    <th>Phone</th>
                    <th>Lead Status</th>
                  </tr>
                </thead>
                <tbody>
                            <tr className="odd">
                              <td>Collins</td>
                              <td>
                                <h2 className="d-flex align-items-center">
                                  <Link
                                    to={route.companyDetails}
                                    className="avatar avatar-sm border me-2"
                                  >
                                    <ImageWithBasePath
                                      className="w-auto h-auto"
                                      src="assets/img/icons/company-icon-01.svg"
                                      alt="User Image"
                                    />
                                  </Link>
                                  <Link
                                    to={route.companyDetails}
                                    className="d-flex flex-column"
                                  >
                                    NovaWave LLC<span className="text-default">Newyork, USA </span>
                                  </Link>
                                </h2>
                              </td>
                              <td>+1 875455453</td>
                              <td>
                                <span className="badge badge-pill  bg-pending">
                                  {" "}
                                  Not Contacted
                                </span>
                              </td>
                            </tr>
                            <tr className="even">
                              <td>Konopelski</td>
                              <td>
                                <h2 className="d-flex align-items-center">
                                  <Link
                                    to={route.companyDetails}
                                    className="avatar avatar-sm border me-2"
                                  >
                                    <ImageWithBasePath
                                      className="w-auto h-auto"
                                      src="assets/img/icons/company-icon-02.svg"
                                      alt="User Image"
                                    />
                                  </Link>
                                  <Link
                                    to={route.companyDetails}
                                    className="d-flex flex-column"
                                  >
                                    BlueSky Industries
                                    <span className="text-default">Winchester, KY </span>
                                  </Link>
                                </h2>
                              </td>
                              <td>+1 989757485</td>
                              <td>
                                <span className="badge badge-pill  bg-warning">
                                  {" "}
                                  Contacted
                                </span>
                              </td>
                            </tr>
                            <tr className="odd">
                              <td>Adams</td>
                              <td>
                                <h2 className="d-flex align-items-center">
                                  <Link
                                    to={route.companyDetails}
                                    className="avatar avatar-sm border me-2"
                                  >
                                    <ImageWithBasePath
                                      className="w-auto h-auto"
                                      src="assets/img/icons/company-icon-03.svg"
                                      alt="User Image"
                                    />
                                  </Link>
                                  <Link
                                    to={route.companyDetails}
                                    className="d-flex flex-column"
                                  >
                                    SilverHawk<span className="text-default">Jametown, NY </span>
                                  </Link>
                                </h2>
                              </td>
                              <td>+1 546555455</td>
                              <td>
                                <span className="badge badge-pill  bg-warning">
                                  {" "}
                                  Contacted
                                </span>
                              </td>
                            </tr>
                            <tr className="even">
                              <td>Schumm</td>
                              <td>
                                <h2 className="d-flex align-items-center">
                                  <Link
                                    to={route.companyDetails}
                                    className="avatar avatar-sm border me-2"
                                  >
                                    <ImageWithBasePath
                                      className="w-auto h-auto"
                                      src="assets/img/icons/company-icon-04.svg"
                                      alt="User Image"
                                    />
                                  </Link>
                                  <Link
                                    to={route.companyDetails}
                                    className="d-flex flex-column"
                                  >
                                    SummitPeak<span className="text-default">Compton, RI </span>
                                  </Link>
                                </h2>
                              </td>
                              <td>+1 454478787</td>
                              <td>
                                <span className="badge badge-pill  bg-pending">
                                  {" "}
                                  Not Contacted
                                </span>
                              </td>
                            </tr>
                          </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-5 d-flex">
        <div className="card w-100">
          <div className="card-header border-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h4>
                <i className="ti ti-grip-vertical me-1" />
                Projects By Stage
              </h4>
              <div className="dropdown">
                <Link
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  to="#"
                >
                  Last 30 Days
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link to="#" className="dropdown-item">
                    Last 30 Days
                  </Link>
                  <Link to="#" className="dropdown-item">
                    Last 15 Days
                  </Link>
                  <Link to="#" className="dropdown-item">
                    Last 7 Days
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
          <div id="leadpiechart">
      <Chart
        options={chartOptions3.options}
        series={chartOptions3.series}
        type="pie"
        width={chartOptions3.options.chart.width}
        height={chartOptions3.options.chart.height}
      />
    </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 d-flex">
        <div className="card w-100">
          <div className="card-header border-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h4>
                <i className="ti ti-grip-vertical me-1" />
                Projects By Stage
              </h4>
              <div className="d-flex align-items-center flex-wrap row-gap-2">
                <div className="dropdown me-2">
                  <Link
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    to="#"
                  >
                    Sales Pipeline
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to="#" className="dropdown-item">
                      Marketing Pipeline
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Sales Pipeline
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Email
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Chats
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Operational
                    </Link>
                  </div>
                </div>
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    to="#"
                  >
                    Last 30 Days
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to="#" className="dropdown-item">
                      Last 30 Days
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Last 15 Days
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Last 7 Days
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
          <div id="contact-report">
                        <Chart
                        options={chartOptions4}
                          series={chartOptions4.series}
                          type="area"
                          height={chartOptions4.chart.height}
                        />
                      </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header border-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h4>
                <i className="ti ti-grip-vertical me-1" />
                Leads By Stage
              </h4>
              <div className="d-flex align-items-center flex-wrap row-gap-2">
                <div className="dropdown me-2">
                  <Link
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    to="#"
                  >
                    Marketing Pipeline
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to="#" className="dropdown-item">
                      Marketing Pipeline
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Sales Pipeline
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Email
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Chats
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Operational
                    </Link>
                  </div>
                </div>
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    to="#"
                  >
                    Last 3 months
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to="#" className="dropdown-item">
                      Last 3 months
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Last 6 months
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Last 12 months
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
          <div id="last-chart">
                        <Chart
                          options={chartOptions}
                          series={chartOptions.series}
                          type={chartOptions.chart.type}
                          height={chartOptions.chart.height}
                        />
                      </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header border-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h4>
                <i className="ti ti-grip-vertical me-1" />
                Won Deals Stage
              </h4>
              <div className="d-flex align-items-center flex-wrap row-gap-2">
                <div className="dropdown me-2">
                  <Link
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    to="#"
                  >
                    Marketing Pipeline
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to="#" className="dropdown-item">
                      Marketing Pipeline
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Sales Pipeline
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Email
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Chats
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Operational
                    </Link>
                  </div>
                </div>
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    to="#"
                  >
                    Last 3 months
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to="#" className="dropdown-item">
                      Last 3 months
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Last 6 months
                    </Link>
                    <Link to="#" className="dropdown-item">
                      Last 12 months
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body ">
          <div id="won-chart">
                        {" "}
                        <Chart
                          options={chartOptions2}
                          series={chartOptions2.series}
                          type={chartOptions2.chart.type}
                          height={chartOptions2.chart.height}
                        />
                      </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default LeadsDashboard;
