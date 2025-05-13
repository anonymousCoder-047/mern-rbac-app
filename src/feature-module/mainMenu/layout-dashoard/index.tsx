import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Chart } from "primereact/chart";
import { Calendar } from "primereact/calendar";
import TodoModal from "../../../core/modals/todoModal";
import ApexCharts from "apexcharts";
import { useDispatch } from "react-redux";
import {
  resetAllMode,
  setDataLayout,
  setDataTheme,
  setDataWidth,
  setRtl,
} from "../../../core/data/redux/themeSettingSlice";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import DateRangePicker from "react-bootstrap-daterangepicker";

const LayoutDemo = () => {
  const route = all_routes;
  const Location = useLocation();
  const dispatch = useDispatch();
  const [isTodo, setIsTodo] = useState([false, false, false]);

  const [date, setDate] = useState(new Date());

  //New Chart
  const [empDepartment] = useState<any>({
    chart: {
      height: 235,
      type: "bar",
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      toolbar: {
        show: false,
      },
    },
    fill: {
      colors: ["#F26522"], // Fill color for the bars
      opacity: 1, // Adjust opacity (1 is fully opaque)
    },
    colors: ["#F26522"],
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      padding: {
        top: -20,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: true,
        barHeight: "35%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        data: [80, 110, 80, 20, 60, 100],
        name: "Employee",
      },
    ],
    xaxis: {
      categories: [
        "UI/UX",
        "Development",
        "Management",
        "HR",
        "Testing",
        "Marketing",
      ],
      labels: {
        style: {
          colors: "#111827",
          fontSize: "13px",
        },
      },
    },
  });

  const [salesIncome] = useState<any>({
    chart: {
      height: 290,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#FF6F28", "#F8F9FA"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusWhenStacked: "all",
        horizontal: false,
        endingShape: "rounded",
      },
    },
    series: [
      {
        name: "Income",
        data: [40, 30, 45, 80, 85, 90, 80, 80, 80, 85, 20, 80],
      },
      {
        name: "Expenses",
        data: [60, 70, 55, 20, 15, 10, 20, 20, 20, 15, 80, 20],
      },
    ],
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
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      padding: {
        left: -8,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    fill: {
      opacity: 1,
    },
  });

  //Attendance ChartJs
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const data = {
      labels: ["Late", "Present", "Permission", "Absent"],
      datasets: [
        {
          label: "Semi Donut",
          data: [40, 20, 30, 10],
          backgroundColor: ["#0C4B5E", "#03C95A", "#FFC107", "#E70D0D"],
          borderWidth: 5,
          borderRadius: 10,
          borderColor: "#fff", // Border between segments
          hoverBorderWidth: 0, // Border radius for curved edges
          cutout: "60%",
        },
      ],
    };
    const options = {
      rotation: -100,
      circumference: 200,
      layout: {
        padding: {
          top: -20, // Set to 0 to remove top padding
          bottom: -20, // Set to 0 to remove bottom padding
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  //Semi Donut ChartJs
  const [semidonutData, setSemidonutData] = useState({});
  const [semidonutOptions, setSemidonutOptions] = useState({});
  const toggleTodo = (index: number) => {
    setIsTodo((prevIsTodo) => {
      const newIsTodo = [...prevIsTodo];
      newIsTodo[index] = !newIsTodo[index];
      return newIsTodo;
    });
  };
  useEffect(() => {
    const data = {
      labels: ["Ongoing", "Onhold", "Completed", "Overdue"],
      datasets: [
        {
          label: "Semi Donut",
          data: [20, 40, 20, 10],
          backgroundColor: ["#FFC107", "#1B84FF", "#03C95A", "#E70D0D"],
          borderWidth: -10,
          borderColor: "transparent", // Border between segments
          hoverBorderWidth: 0, // Border radius for curved edges
          cutout: "75%",
          spacing: -30,
        },
      ],
    };

    const options = {
      rotation: -100,
      circumference: 185,
      layout: {
        padding: {
          top: -20, // Set to 0 to remove top padding
          bottom: 20, // Set to 0 to remove bottom padding
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
      },
      elements: {
        arc: {
          borderWidth: -30, // Ensure consistent overlap
          borderRadius: 30, // Add some rounding
        },
      },
    };

    setSemidonutData(data);
    setSemidonutOptions(options);
  }, []);

  useEffect(() => {
    if (Location.pathname === "/layout-horizontal") {
      dispatch(setDataLayout("horizontal"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-horizontal-single") {
      dispatch(setDataLayout("horizontal-single"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-detached") {
      dispatch(setDataLayout("detached"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-twocolumn") {
      dispatch(setDataLayout("twocolumn"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-without-header") {
      dispatch(setDataLayout("without-header"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-horizontal-overlay") {
      dispatch(setDataLayout("horizontal-overlay"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-horizontal-sidemenu") {
      dispatch(setDataLayout("horizontal-sidemenu"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-modern") {
      dispatch(setDataLayout("modern"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-transparent") {
      dispatch(setDataLayout("transparent"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-horizontal-box") {
      dispatch(setDataLayout("mini"));
      dispatch(setDataWidth("box"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-hovered") {
      dispatch(setDataLayout("default"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-mini") {
      dispatch(setDataLayout("mini"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-dark") {
      dispatch(setDataLayout("default"));
      dispatch(setDataTheme("dark"));
      dispatch(setRtl(""));
    } else if (Location.pathname === "/layout-rtl") {
      dispatch(setDataLayout("rtl"));
      dispatch(setRtl("layout-mode-rtl"));
    } else if (Location.pathname === "/layout-box") {
      dispatch(setDataLayout("mini"));
      dispatch(setDataWidth("box"));
      dispatch(setRtl(""));
    } else {
      dispatch(setDataLayout("default"));
      dispatch(setRtl(""));
    }
    return () => {
      dispatch(resetAllMode());
    };
  }, [dispatch, Location.pathname]);

  // Deals By Stage
  const chartRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("menuOpened", "Dashboard");
  }, []);
  useEffect(() => {
    if (chartRef.current) {
      const options = {
        series: [
          {
            name: "sales",
            colors: ["#FFC38F"],
            data: [
              {
                x: "Inpipeline",
                y: 400,
              },
              {
                x: "Follow Up",
                y: 130,
              },
              {
                x: "Schedule",
                y: 248,
              },
              {
                x: "Conversation",
                y: 470,
              },
              {
                x: "Won",
                y: 470,
              },
              {
                x: "Lost",
                y: 180,
              },
            ],
          },
        ],
        chart: {
          type: "bar",
          height: 275,
        },
        plotOptions: {
          bar: {
            borderRadiusApplication: "around",
            columnWidth: "40%",
          },
        },
        colors: ["#00918E"],
        xaxis: {
          type: "category",
          group: {
            style: {
              fontSize: "7px",
              fontWeight: 700,
            },
          },
        },
        yaxis: {
          min: 0,
          max: 500,
          tickAmount: 5,
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      // Cleanup on unmount
      return () => {
        chart.destroy();
      };
    }
  }, []);

  //  Leads By Stage
  const LeadsBySatge = useRef(null);

  useEffect(() => {
    if (LeadsBySatge.current) {
      const options = {
        series: [
          {
            data: [400, 220, 448],
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
        colors: ["#FC0027"],
        xaxis: {
          categories: ["Conversation", "Follow Up", "Inpipeline"],
          min: 0,
          max: 500,
          tickAmount: 5,
        },
      };

      const chart = new ApexCharts(LeadsBySatge.current, options);
      chart.render();

      // Cleanup on unmount
      return () => {
        chart.destroy();
      };
    }
  }, []);
  // Won Deals Chat
  const wonChat = useRef(null);
  useEffect(() => {
    const options = {
      series: [
        {
          data: [400, 122, 250],
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
      colors: ["#5CB85C"],
      xaxis: {
        categories: ["Conversation", "Follow Up", "Inpipeline"],
        min: 0,
        max: 500,
        tickAmount: 5,
      },
    };

    if (wonChat.current) {
      const chart = new ApexCharts(wonChat.current, options);
      chart.render();

      // Cleanup on unmount
      return () => {
        chart.destroy();
      };
    }
  }, []);
  // Deals By Year
  const dealsByYear = useRef(null);
  useEffect(() => {
    const options = {
      series: [
        {
          name: "Deals",
          data: [10, 20, 30, 15, 22, 40, 30, 20, 30, 18, 30, 60],
        },
      ],
      chart: {
        height: 273,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      colors: ["#E41F07"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
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
        labels: {
          formatter: (val: number) => {
            return val / 1 + "K";
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
    };

    if (dealsByYear.current) {
      const chart = new ApexCharts(dealsByYear.current, options);
      chart.render();

      // Cleanup on unmount
      return () => {
        chart.destroy();
      };
    }
  }, []);

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
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (location.pathname === "/dashboard/deals-dashboard") {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
      }, 2000);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="page-header">
                <div className="row align-items-center ">
                  <div className="col-md-4">
                    <h3 className="page-title">Deals Dashboard</h3>
                  </div>
                  <div className="col-md-8 float-end ms-auto">
                    <div className="d-flex title-head">
                      <div className="daterange-picker d-flex align-items-center justify-content-center">
                        <div className="form-sort ms-2">
                          <i className="ti ti-calendar" />
                          <DateRangePicker initialSettings={initialSettings}>
                            <input
                              className="form-control bookingrange"
                              type="text"
                            />
                          </DateRangePicker>
                        </div>
                        <div className="head-icons mb-0">
                          <CollapseHeader />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h4>
                      <i className="ti ti-grip-vertical ms-1" />
                      Recently Created Deals
                    </h4>
                    <div className="dropdown">
                      <Link
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        to="#"
                      >
                        <i className="ti ti-calendar-check ms-2" />
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
                    <table className="table dataTable" id="deals-project">
                      <thead className="thead-light">
                        <tr>
                          <th>Deal Name</th>
                          <th>Stage</th>
                          <th>Deal Value</th>
                          <th>Probability</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="odd">
                          <td>Collins</td>
                          <td>Conversation</td>
                          <td>$04,51,000</td>
                          <td>85%</td>
                          <td>
                            <span className="badge badge-pill  bg-danger">
                              Lost
                            </span>
                          </td>
                        </tr>
                        <tr className="even">
                          <td>Konopelski</td>
                          <td>Pipeline</td>
                          <td>$14,51,000</td>
                          <td>56%</td>
                          <td>
                            <span className="badge badge-pill  bg-success">
                              Won
                            </span>
                          </td>
                        </tr>
                        <tr className="odd">
                          <td>Adams</td>
                          <td>Won</td>
                          <td>$12,51,000</td>
                          <td>15%</td>
                          <td>
                            <span className="badge badge-pill  bg-success">
                              Won
                            </span>
                          </td>
                        </tr>
                        <tr className="even">
                          <td>Schumm</td>
                          <td>Lost</td>
                          <td>$51,000</td>
                          <td>45%</td>
                          <td>
                            <span className="badge badge-pill  bg-danger">
                              Lost
                            </span>
                          </td>
                        </tr>
                        <tr className="odd">
                          <td>Wisozk</td>
                          <td>Follow Up</td>
                          <td>$67,000</td>
                          <td>5%</td>
                          <td>
                            <span className="badge badge-pill  bg-success">
                              Won
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h4>
                      <i className="ti ti-grip-vertical ms-1" />
                      Deals By Stage
                    </h4>
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="dropdown ms-2">
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
                  <div id="deals-chart" ref={chartRef} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h4>
                      <i className="ti ti-grip-vertical ms-1" />
                      Leads By Stage
                    </h4>
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="dropdown ms-2">
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
                  <div id="last-chart" ref={LeadsBySatge} />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h4>
                      <i className="ti ti-grip-vertical ms-1" />
                      Won Deals Stage
                    </h4>
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="dropdown ms-2">
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
                  <div id="won-chart" ref={wonChat} />
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
                      <i className="ti ti-grip-vertical ms-1" />
                      Deals by Year
                    </h4>
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="dropdown ms-2">
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
                  <div id="deals-year" ref={dealsByYear} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutDemo;
