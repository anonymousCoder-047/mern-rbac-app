import React, {useEffect, useState} from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import { endpoints } from "../../../helper/endpoints";
import PrivateServer from "../../../helper/PrivateServer";
import moment from "moment";
import _, { get } from "lodash"
import ApexCharts from "apexcharts";
window.ApexCharts = ApexCharts;

const route = all_routes;
const LeadsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermPie, setSearchTermPie] = useState('');
  const [searchTermGraph, setSearchTermGraph] = useState('');
  const [leads, setLeads] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchData, setFilteredSearchData] = useState([]);
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
  
  const [chartOptions3, setChartOptions3] = useState<any>({
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

  const [chartOptions4, setChartOptions4] = useState<any>( {
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

  const getDeals = async () => {
    try {
      const { Deals } = endpoints;
      const response = await PrivateServer.getData(Deals?.view)
  
      if(response?.data) {
        setLeads(response?.data);
        setTotalLeads(response?.data?.length);

        setChartOptions3({
          ...chartOptions3, 
          series: [...new Set(response?.data?.map((x) => x?.stage?.stage_percentage?.[0]))],
          options: {
            ...chartOptions3.options,
            labels: [...new Set(response?.data?.map((x) => x?.stage?.pipeline_name))],
          },
        })

        setChartOptions4({
          ...chartOptions4, 
          series: [...new Set(response?.data?.map((x) => ({ name: "Reports", data: [x?.stage?.stage_percentage?.[0]] })))],
        })
      }
    } catch(error) {
      console.log("Error while getting deals -- E:", error?.message);
    }
  }

  const getContacts = async () => {
    try {
      const { Contact } = endpoints;
      const response = await PrivateServer.getData(Contact?.view)
  
      if(response?.data) {
        setTotalContacts(response?.data?.length);
      }
    } catch(error) {
      console.log("Error while getting deals -- E:", error?.message);
    }
  }

  const getCompanies = async () => {
    try {
      const { Companies } = endpoints;
      const response = await PrivateServer.getData(Companies?.view)
  
      if(response?.data) {
        setTotalCompanies(response?.data?.length);
      }
    } catch(error) {
      console.log("Error while getting deals -- E:", error?.message);
    }
  }

  const getUsers = async () => {
    try {
      const { Profile } = endpoints;
      const response = await PrivateServer.getData(Profile?.view)
  
      if(response?.data) {
        setTotalUsers(response?.data?.length);
      }
    } catch(error) {
      console.log("Error while getting deals -- E:", error?.message);
    }
  }

  const filterByLastXDays = (data: any[], days: number) => {
    const cutoff = moment().subtract(days, 'days').startOf('day');

    return _.filter(data, (item) => {
      return moment(item.last_contact_date).isAfter(cutoff);
    });
  };

  const handleSearch = (_days) => {
    setSearchTerm(_days);
    setSearchTermPie(_days);
    setSearchTermGraph(_days);

    const _filterdData = filterByLastXDays(leads, parseInt(_days));

    if(_days != '0') setFilteredSearchData(_filterdData);
    else setFilteredSearchData(leads)
  }

  useEffect(() => {
    getDeals();
    getContacts();
    getCompanies();
    getUsers();
  }, [])

  return (
    <div className="page-wrapper">
  <div className="content">
    <div className="row">
      <div className="col-md-12">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h3 className="page-title">Leads Dashboard</h3>
            </div>
            <div className="col-md-8 float-end ms-auto">
              <div className="d-flex title-head">
                <div className="daterange-picker d-flex align-items-center justify-content-center">
                  <div className="form-sort me-2">
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

    {/* Example of another card without charts */}
    <div className="row mt-4">
      <div className="col-md-6">
        <div className="card text-white bg-primary mb-3">
          <div className="card-header border-0 pb-0">
            <h4 className="text-white">Total Contacts</h4>
          </div>
          <div className="card-body">
            <Link to={route.contactList} className="d-flex flex-column text-white">
              {totalContacts}
            </Link>
            {/* <p>{totalContacts}</p> */}
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card text-white bg-success mb-3">
          <div className="card-header border-0 pb-0">
            <h4 className="text-white">Total Leads</h4>
          </div>
          <div className="card-body">
            {/* <p>{totalLeads}</p> */}
            <Link to={route.leads} className="d-flex flex-column text-white">
              {totalLeads}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card text-white bg-warning mb-3">
          <div className="card-header border-0 pb-0">
            <h4 className="text-white">Total Companies</h4>
          </div>
          <div className="card-body">
            {/* <p>{totalCompanies}</p> */}
            <Link to={route.companies} className="d-flex flex-column text-white">
              {totalCompanies}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card text-white bg-info mb-3">
          <div className="card-header border-0 pb-0">
            <h4 className="text-white">Total Users</h4>
          </div>
          <div className="card-body">
            {/* <p>{totalUsers}</p> */}
            <Link to={route.manageusers} className="d-flex flex-column text-white">
              {totalUsers}
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Recently Created Leads */}
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header border-0 pb-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h4>
                <i className="ti ti-grip-vertical me-1" />
                Recently Created Leads
              </h4>
              <div className="dropdown">
                <button
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {searchTerm !== "" ? `Last ${searchTerm} days` : "Recent data"}
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <button className="dropdown-item" onClick={() => handleSearch("0")}>
                    Recent data
                  </button>
                  <button className="dropdown-item" onClick={() => handleSearch("15")}>
                    Last 15 days
                  </button>
                  <button className="dropdown-item" onClick={() => handleSearch("30")}>
                    Last 30 days
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive custom-table">
              <table className="table dataTable">
                <thead className="thead-light">
                  <tr>
                    <th>Lead Name</th>
                    <th>Company Name</th>
                    <th>Contact Name</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {(searchTerm !== "" ? searchData : leads)
                    ?.filter((_, i) => i < 5)
                    ?.map((_lead) => (
                      <tr key={_lead?._id}>
                        <td>{_lead?.opportunity_name}</td>
                        <td>
                          <h2 className="d-flex align-items-center">
                            <Link
                              to={route.companyDetails}
                              state={{
                                ..._lead?.company_name,
                                totalData: leads?.length,
                              }}
                              className="d-flex flex-column"
                            >
                              {_lead?.company_name}
                            </Link>
                          </h2>
                        </td>
                        <td>
                          {_lead?.contact_name}
                        </td>
                        <td>
                          <span
                            className={`badge badge-pill ${
                              _lead?.stage?.stage_percentage?.[0] === "100"
                                ? "bg-success"
                                : _lead?.stage?.stage_percentage?.[0] === "50"
                                ? "bg-warning"
                                : _lead?.stage?.stage_percentage?.[0] === "75"
                                ? "bg-info"
                                : "bg-pending"
                            }`}
                          >
                            {_lead?.profileId?.username}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
