import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import Select from "react-select";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivityTogglePopup,
  setActivityTogglePopupThree,
  setActivityTogglePopupTwo,
  setAddTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import CollapseHeader from "../../../core/common/collapse-header";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import { TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DefaultEditor from "react-simple-wysiwyg";
import { Link } from "react-router-dom";
import {
  project,
  tagInputValues,
} from "../../../core/common/selectoption/selectoption";
import Activities from "../activities";
interface OptionType {
  value: string;
  label: string;
  image: string;
}
const Analytics = () => {
  dayjs.extend(customParseFormat);
  const onChange = (time: Dayjs, timeString: any) => {
    console.log(time, timeString);
  };
  const activities = [
    { value: "choose", label: "Choose" },
    { value: "phoneCalls", label: "Phone Calls" },
    { value: "socialMedia", label: "Social Media" },
    { value: "referralSites", label: "Referral Sites" },
    { value: "webAnalytics", label: "Web Analytics" },
    { value: "previousPurchases", label: "Previous Purchases" },
  ];
  const options: OptionType[] = [
    {
      value: "Darlee Robertson",
      label: "Darlee Robertson",
      image: "assets/img/profiles/avatar-19.jpg",
    },
    {
      value: "Sharon Roy",
      label: "Sharon Roy",
      image: "assets/img/profiles/avatar-20.jpg",
    },
    {
      value: "Vaughan",
      label: "Vaughan",
      image: "assets/img/profiles/avatar-21.jpg",
    },
    {
      value: "Jessica",
      label: "Jessica",
      image: "assets/img/profiles/avatar-23.jpg",
    },
    {
      value: "Carol Thomas",
      label: "Carol Thomas",
      image: "assets/img/profiles/avatar-16.jpg",
    },
  ];
  // const options3 = [
  //   { value: "select", label: "Select" },
  //   { value: "collins", label: "Collins" },
  //   { value: "konopelski", label: "Konopelski" },
  //   { value: "adams", label: "Adams" },
  // ];
  const addTogglePopupTwo = useSelector(
    (state: any) => state?.addTogglePopupTwo
  );
  const dealsopen = [
    { value: "choose", label: "Choose" },
    { value: "collins", label: "Collins" },
    { value: "konopelski", label: "Konopelski" },
    { value: "adams", label: "Adams" },
    { value: "schumm", label: "Schumm" },
    { value: "wisozk", label: "Wisozk" },
  ];
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );

  const options3 = [
    { value: "select", label: "Select" },
    { value: "collins", label: "Collins" },
    { value: "konopelski", label: "Konopelski" },
    { value: "adams", label: "Adams" },
  ];

  const options4 = [
    { value: "select", label: "Select" },
    { value: "novawave", label: "NovaWave LLC" },
    { value: "silverhawk", label: "SilverHawk" },
    { value: "harborview", label: "HarborView" },
  ];
  const activityToggleThree = useSelector(
    (state: any) => state?.activityTogglePopupThree
  );
  const route = all_routes;
  const dispatch = useDispatch();
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const options1 = [
    { value: "select", label: "Select" },
    { value: "minutes", label: "Minutes" },
    { value: "hours", label: "Hours" },
  ];

  const options2 = [
    { value: "select", label: "Select" },
    { value: "hendry", label: "Hendry" },
    { value: "bradtke", label: "Bradtke" },
    { value: "sally", label: "Sally" },
  ];
  const recentContact = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_3_months", label: "Last 3 months" },
    { value: "last_6_months", label: "Last 6 months" },
  ];
  const recentContact1 = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_3_months", label: "Last 3 months" },
    { value: "last_6_months", label: "Last 6 months" },
  ];
  const recentContact2 = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_3_months", label: "Last 3 months" },
    { value: "last_6_months", label: "Last 6 months" },
  ];
  const recentContact3 = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_3_months", label: "Last 3 months" },
    { value: "last_6_months", label: "Last 6 months" },
  ];
  const recentContact4 = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_3_months", label: "Last 3 months" },
    { value: "last_6_months", label: "Last 6 months" },
  ];
  const recentContact5 = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_3_months", label: "Last 3 months" },
    { value: "last_6_months", label: "Last 6 months" },
  ];
  const recentContact6 = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_3_months", label: "Last 3 months" },
    { value: "last_6_months", label: "Last 6 months" },
  ];
  const lostdealchat = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_15_months", label: "Last 15 days" },
    { value: "last_7_months", label: "Last 7 days" },
  ];
  const lostdealchat1 = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_15_months", label: "Last 15 days" },
    { value: "last_7_months", label: "Last 7 days" },
  ];
  const lostdealchat2 = [
    { value: "last_30_days", label: "Last 30 days" },
    { value: "last_15_months", label: "Last 15 days" },
    { value: "last_7_months", label: "Last 7 days" },
  ];
  const pipelinelist = [
    { value: "Marketing Pipeline", label: "Marketing Pipeline" },
    { value: "Pipeline", label: "Pipeline" },
  ];
  const pipelinelist1 = [
    { value: "Marketing Pipeline", label: "Marketing Pipeline" },
    { value: "Pipeline", label: "Pipeline" },
  ];
  const pipelinelist2 = [
    { value: "Marketing Pipeline", label: "Marketing Pipeline" },
    { value: "Pipeline", label: "Pipeline" },
  ];
  const pipelinelist3 = [
    { value: "Marketing Pipeline", label: "Marketing Pipeline" },
    { value: "Pipeline", label: "Pipeline" },
  ];
  const pipelinelist4 = [
    { value: "Marketing Pipeline", label: "Marketing Pipeline" },
    { value: "Pipeline", label: "Pipeline" },
  ];
  const status = [
    { value: "Inprogress", label: "Inprogress" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];
  const status1 = [
    { value: "Inprogress", label: "Inprogress" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];
  const status4 = [
    { value: "Inprogress", label: "Inprogress" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];
  const status3 = [
    { value: "Inprogress", label: "Inprogress" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];
  const languages = [
    { value: "Choose", label: "Choose" },
    { value: "English", label: "English" },
    { value: "Arabic", label: "Arabic" },
    { value: "Chinese", label: "Chinese" },
    { value: "Hindi", label: "Hindi" },
  ];
  const countries = [
    { value: "Choose", label: "Choose" },
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "France", label: "France" },
    { value: "UAE", label: "UAE" },
  ];
  const industries = [
    { value: "choose", label: "Choose" },
    { value: "Retail Industry", label: "Retail Industry" },
    { value: "Banking", label: "Banking" },
    { value: "Hotels", label: "Hotels" },
    { value: "Financial Services", label: "Financial Services" },
    { value: "Insurance", label: "Insurance" },
  ];

  // Deals By Stage
  const chartRef = useRef(null);
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
  const leadschat = useRef(null);

  useEffect(() => {
    if (leadschat.current) {
      const options = {
        series: [
          {
            name: "sales",
            colors: ["#BEA4F2"],
            data: [
              {
                x: "Inpipeline",
                y: 400,
              },
              {
                x: "Follow Up",
                y: 30,
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
          height: 250,
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
            borderRadiusApplication: "around",
          },
        },
        colors: ["#00918E"],
      };

      const chartInstance = new ApexCharts(leadschat.current, options);
      chartInstance.render();

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  //  Leads By Stage
  const LeadsBySatge2 = useRef(null);

  useEffect(() => {
    if (LeadsBySatge2.current) {
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
        },
      };

      const chart = new ApexCharts(LeadsBySatge2.current, options);
      chart.render();

      // Cleanup on unmount
      return () => {
        chart.destroy();
      };
    }
  }, []);

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col-4">
                    <h4 className="page-title">Analytics</h4>
                  </div>
                  <div className="col-8 text-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                  <h3>
                    <i className="ti ti-grip-vertical" /> Recently Created
                    Contacts
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={recentContact}
                          placeholder="Last 30 days"
                          classNamePrefix="react-select"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="">
                    <div
                      id="analytic-contact_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-6" />
                        <div className="col-sm-12 col-md-6" />
                      </div>
                      <div className="row dt-row">
                        <div className="col-sm-12 table-responsive">
                          <table
                            className="table dataTable custom-table mb-0 no-footer"
                            id="analytic-contact"
                            style={{ width: 635 }}
                          >
                            <thead>
                              <tr>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "174.333px" }}
                                >
                                  Contact
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: 131 }}
                                >
                                  Email
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: 96 }}
                                >
                                  Phone
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "152.333px" }}
                                >
                                  Created at
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="odd">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.contactDetails}
                                      className="avatar avatar-sm me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/profiles/avatar-16.jpg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.contactDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      Carol Thomas<span>UI /UX Designer </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>caroo3@example.com</td>
                                <td>+1 124547845</td>
                                <td>25 Sep 2023, 12:12 pm</td>
                              </tr>
                              <tr className="even">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.contactDetails}
                                      className="avatar avatar-sm me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/profiles/avatar-22.jpg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.contactDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      Dawn Mercha<span>Technician </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>dercha@example.com</td>
                                <td>+1 478845447</td>
                                <td>27 Sep 2023, 11:23 pm</td>
                              </tr>
                              <tr className="odd">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.contactDetails}
                                      className="avatar avatar-sm me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/profiles/avatar-23.jpg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.contactDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      Rachel Hampton
                                      <span>Software developer </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>rael@example.com</td>
                                <td>+1 215544845</td>
                                <td>04 Oct 2023, 04:12 pm</td>
                              </tr>
                              <tr className="even">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.contactDetails}
                                      className="avatar avatar-sm me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/profiles/avatar-24.jpg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.contactDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      Jonelle Curtiss<span>Supervisor </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>joe@example.com</td>
                                <td>+1 124547845</td>
                                <td>17 Oct 2023, 11:34 am</td>
                              </tr>
                              <tr className="odd">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.contactDetails}
                                      className="avatar avatar-sm me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/profiles/avatar-23.jpg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.contactDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      Rachel Hampton
                                      <span>Software developer </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>rael@example.com</td>
                                <td>+1 215544845</td>
                                <td>04 Oct 2023, 04:12 pm</td>
                              </tr>
                              <tr className="even">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.contactDetails}
                                      className="avatar avatar-sm me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/profiles/avatar-20.jpg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.contactDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      sharon Roy<span>Installer </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>sharon@example.com</td>
                                <td>+1 466701256</td>
                                <td>15 Nov 2023, 07:26 pm</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-5" />
                        <div className="col-sm-12 col-md-7" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between card-selectsview flex-wrap">
                  <h3 className="card-title">
                    <i className="ti ti-grip-vertical" />
                    Won Deals Stage
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={pipelinelist}
                          placeholder="Marketing Pipeline"
                          classNamePrefix="react-select"
                        />
                      </li>
                      <li>
                        <Select
                          className="select"
                          options={recentContact1}
                          placeholder="Last 30 days"
                          classNamePrefix="react-select"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div id="won-chart" ref={wonChat} />
                </div>
              </div>
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                  <h3>
                    <i className="ti ti-grip-vertical" />
                    Recently Created Deals
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={recentContact2}
                          placeholder="Last 30 days"
                          classNamePrefix="react-select"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="analytic-deal_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-6" />
                        <div className="col-sm-12 col-md-6" />
                      </div>
                      <div className="row dt-row">
                        <div className="col-sm-12 table-responsive">
                          <table
                            className="table table-nowrap custom-table mb-0 dataTable no-footer"
                            id="analytic-deal"
                            style={{ width: 487 }}
                          >
                            <thead>
                              <tr>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "76.3333px" }}
                                >
                                  Deal Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: 92 }}
                                >
                                  Stage
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: 76 }}
                                >
                                  Deal Value
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: 73 }}
                                >
                                  Probability
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "68.3333px" }}
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="odd">
                                <td>Collins</td>
                                <td>Conversation</td>
                                <td>$04,51,000</td>
                                <td>85%</td>
                                <td>
                                  <span className="badge badge-pill badge-status bg-success">
                                    {" "}
                                    Won
                                  </span>
                                </td>
                              </tr>
                              <tr className="even">
                                <td>Konopelski</td>
                                <td>Pipeline</td>
                                <td>$04,14,800</td>
                                <td>15%</td>
                                <td>
                                  <span className="badge badge-pill badge-status bg-danger">
                                    {" "}
                                    Lost
                                  </span>
                                </td>
                              </tr>
                              <tr className="odd">
                                <td>Adams</td>
                                <td>Won</td>
                                <td>$04,14,800</td>
                                <td>95%</td>
                                <td>
                                  <span className="badge badge-pill badge-status bg-success">
                                    {" "}
                                    Won
                                  </span>
                                </td>
                              </tr>
                              <tr className="even">
                                <td>Schumm</td>
                                <td>Lost</td>
                                <td>$9,14,400</td>
                                <td>47%</td>
                                <td>
                                  <span className="badge badge-pill badge-status bg-success">
                                    {" "}
                                    Won
                                  </span>
                                </td>
                              </tr>
                              <tr className="odd">
                                <td>Wisozk</td>
                                <td>Follow Up</td>
                                <td>$11,14,400</td>
                                <td>98%</td>
                                <td>
                                  <span className="badge badge-pill badge-status bg-success">
                                    {" "}
                                    Won
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-5" />
                        <div className="col-sm-12 col-md-7" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between card-selectsview flex-wrap">
                  <h3 className="card-title">
                    <i className="ti ti-grip-vertical" />
                    Lost Leads Stage
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={pipelinelist1}
                          placeholder="Marketing Pipeline"
                          classNamePrefix="react-select"
                        />
                      </li>
                      <li>
                        <Select
                          className="select"
                          options={lostdealchat}
                          placeholder="Marketing Pipeline"
                          classNamePrefix="react-select"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div id="last-chart-2" ref={LeadsBySatge2} />
                </div>
              </div>
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                  <h3>
                    <i className="ti ti-grip-vertical" />
                    Leads By Stage
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={pipelinelist2}
                          placeholder="Marketing Pipeline"
                          classNamePrefix="react-select"
                        />
                      </li>
                      <li className="mb-3 mb-0">
                        <Select
                          className="select"
                          options={recentContact3}
                          placeholder="Last 30 days"
                          classNamePrefix="react-select"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div id="leads-chart" ref={leadschat} />
                </div>
              </div>
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                  <h3>
                    <i className="ti ti-grip-vertical" />
                    Recently Added Companies
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={recentContact4}
                          placeholder="Last 30 days"
                          classNamePrefix="react-select"
                        />
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_add_2"
                        >
                          <i className="ti ti-square-rounded-plus me-2"></i> Add
                          Company
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="">
                    <div
                      id="analytic-company_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-6" />
                        <div className="col-sm-12 col-md-6" />
                      </div>
                      <div className="row dt-row">
                        <div className="col-sm-12 table-responsive">
                          <table
                            className="table custom-table mb-0 dataTable no-footer"
                            id="analytic-company"
                            style={{ width: 629 }}
                          >
                            <thead>
                              <tr>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "168.333px" }}
                                >
                                  Company Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: 131 }}
                                >
                                  Email
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: 96 }}
                                >
                                  Phone
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "152.333px" }}
                                >
                                  Created at
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="odd">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.companyDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-03.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.companyDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      NovaWaveLLC
                                    </Link>
                                  </h2>
                                </td>
                                <td>caroo3@example.com</td>
                                <td>+1 124547845</td>
                                <td>25 Sep 2023, 12:12 pm</td>
                              </tr>
                              <tr className="even">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.companyDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-03.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.companyDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      SilverHawk
                                    </Link>
                                  </h2>
                                </td>
                                <td>dercha@example.com</td>
                                <td>+1 478845447</td>
                                <td>27 Sep 2023, 11:23 pm</td>
                              </tr>
                              <tr className="odd">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.companyDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-04.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.companyDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      SummitPeak
                                    </Link>
                                  </h2>
                                </td>
                                <td>rael@example.com</td>
                                <td>+1 215544845</td>
                                <td>04 Oct 2023, 04:12 pm</td>
                              </tr>
                              <tr className="even">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.companyDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-05.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.companyDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      RiverStone Ventur
                                    </Link>
                                  </h2>
                                </td>
                                <td>joe@example.com</td>
                                <td>+1 124547845</td>
                                <td>17 Oct 2023, 11:34 am</td>
                              </tr>
                              <tr className="odd">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.companyDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-07.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.companyDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      CoastalStar Co.
                                    </Link>
                                  </h2>
                                </td>
                                <td>joe@example.com</td>
                                <td>+1 124547845</td>
                                <td>17 Oct 2023, 11:34 am</td>
                              </tr>
                              <tr className="even">
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.companyDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-10.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.companyDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      Redwood Inc
                                    </Link>
                                  </h2>
                                </td>
                                <td>sharon@example.com</td>
                                <td>+1 466701256</td>
                                <td>15 Nov 2023, 07:26 pm</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-5" />
                        <div className="col-sm-12 col-md-7" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                  <h3>
                    <i className="ti ti-grip-vertical" />
                    Deals By Stage
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={pipelinelist3}
                          placeholder="Marketing Pipeline"
                          classNamePrefix="react-select"
                        />
                      </li>
                      <li className="mb-3 mb-0">
                        <Select
                          className="select"
                          options={recentContact5}
                          placeholder="Last 30 days"
                          classNamePrefix="react-select"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div id="deals-chart" ref={chartRef} />
                </div>
              </div>
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                  <h3>
                    <i className="ti ti-grip-vertical" />
                    Activities
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={recentContact6}
                          placeholder="Last 30 days"
                          classNamePrefix="react-select"
                        />
                      </li>
                      <li>
                      <Link to="#" className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_add" ><i className="ti ti-square-rounded-plus me-2"></i>Add New Activity</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="activities-list">
                    <ul>
                      <li>
                        <div className="row align-items-center">
                          <div className="col-md-5">
                            <div className="activity-name">
                              <h5>We scheduled a meeting for next week</h5>
                              <p>Due Date : 10 Feb 2024, 09:00 am </p>
                              <span className="badge activity-badge bg-purple">
                                <i className="ti ti-user-share" />
                                Meeting
                              </span>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="user-activity">
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-19.jpg"
                                  alt=""
                                />
                              </span>
                              <h6>Darlee Robertson</h6>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3 mb-0">
                              <Select
                                className="select"
                                options={status}
                                placeholder="Inprogress"
                                classNamePrefix="react-select"
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row align-items-center">
                          <div className="col-md-5">
                            <div className="activity-name">
                              <h5>Regarding latest updates in project </h5>
                              <p>Due date : 29 Sep 2023, 08:20 am</p>
                              <span className="badge activity-badge bg-warning">
                                <i className="ti ti-mail" />
                                Email
                              </span>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="user-activity">
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-22.jpg"
                                  alt=""
                                />
                              </span>
                              <h6>Dawn Mercha</h6>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3 mb-0">
                              <Select
                                className="select"
                                options={status1}
                                placeholder="Inprogress"
                                classNamePrefix="react-select"
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row align-items-center">
                          <div className="col-md-5">
                            <div className="activity-name">
                              <h5>Call John and discuss about project</h5>
                              <p>Due date : 05 Oct 2023, 10:35 am</p>
                              <span className="badge activity-badge bg-blue">
                                <i className="ti ti-subtask" />
                                Task
                              </span>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="user-activity">
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-16.jpg"
                                  alt=""
                                />
                              </span>
                              <h6>Carol Thomas</h6>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3 mb-0">
                              <Select
                                className="select"
                                options={status3}
                                placeholder="Inprogress"
                                classNamePrefix="react-select"
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row align-items-center">
                          <div className="col-md-5">
                            <div className="activity-name">
                              <h5>Discussed budget proposal with Edwin</h5>
                              <p>Due date : 16 Oct 2023, 04:40 pm</p>
                              <span className="badge activity-badge bg-green">
                                <i className="ti ti-phone" />
                                Calls
                              </span>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="user-activity">
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-20.jpg"
                                  alt=""
                                />
                              </span>
                              <h6>Sharon Roy</h6>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3 mb-0">
                              <Select
                                className="select"
                                options={status4}
                                placeholder="Inprogress"
                                classNamePrefix="react-select"
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between card-selectsview flex-wrap">
                  <h3 className="card-title">
                    <i className="ti ti-grip-vertical" />
                    Lost Leads Stage
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={pipelinelist4}
                          placeholder="Marketing Pipeline"
                          classNamePrefix="react-select"
                        />
                      </li>
                      <li>
                        <Select
                          className="select"
                          options={lostdealchat1}
                          placeholder="Marketing Pipeline"
                          classNamePrefix="react-select"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div id="last-chart" ref={LeadsBySatge} />
                </div>
              </div>
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                  <h3>
                    <i className="ti ti-grip-vertical" />
                    Recently Created Leads
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={recentContact6}
                          placeholder="Last 30 days"
                          classNamePrefix="react-select"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="">
                    <div
                      id="analytic-lead_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-6" />
                        <div className="col-sm-12 col-md-6" />
                      </div>
                      <div className="row dt-row">
                        <div className="col-sm-12 table-responsive">
                          <table
                            className="table custom-table mb-0 dataTable no-footer"
                            id="analytic-lead"
                            style={{ width: 521 }}
                          >
                            <thead>
                              <tr>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "76.3333px" }}
                                >
                                  Lead Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: 168 }}
                                >
                                  Company Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: 96 }}
                                >
                                  Phone
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "99.3333px" }}
                                >
                                  Lead Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="odd">
                                <td>Collins</td>
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.leadsDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-01.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.leadsDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      NovaWaveLLC<span>Newyork, USA </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>+1 875455453</td>
                                <td>
                                  <span className="badge badge-pill text-white bg-success">
                                    {" "}
                                    Closed
                                  </span>
                                </td>
                              </tr>
                              <tr className="even">
                                <td>Collins</td>
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.leadsDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-02.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.leadsDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      Konopelski<span>Winchester, KY </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>+1 989757485</td>
                                <td>
                                  <span className="badge badge-pill text-white bg-pending">
                                    {" "}
                                    Not Contacted
                                  </span>
                                </td>
                              </tr>
                              <tr className="odd">
                                <td>Adams</td>
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.leadsDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-03.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.leadsDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      SilverHawk<span>Jametown, NY </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>+1 546555455</td>
                                <td>
                                  <span className="badge badge-pill text-white bg-success">
                                    {" "}
                                    Closed
                                  </span>
                                </td>
                              </tr>
                              <tr className="even">
                                <td>Schumm</td>
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.leadsDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-04.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.leadsDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      SummitPeak<span>Compton, RI </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>+1 454478787</td>
                                <td>
                                  <span className="badge badge-pill text-white bg-warning">
                                    {" "}
                                    Contacted
                                  </span>
                                </td>
                              </tr>
                              <tr className="odd">
                                <td>Wisozk</td>
                                <td>
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link
                                      to={route.leadsDetails}
                                     className="avatar avatar-sm border me-2"
                                    >
                                      <ImageWithBasePath
                                        className="w-auto h-auto"
                                        src="assets/img/icons/company-icon-05.svg"
                                        alt="img"
                                      />
                                    </Link>
                                    <Link
                                      to={route.leadsDetails}
                                      className="profile-split d-flex flex-column"
                                    >
                                      RiverStone Ventur<span>Dayton, OH </span>
                                    </Link>
                                  </h2>
                                </td>
                                <td>+1 124547845</td>
                                <td>
                                  <span className="badge badge-pill text-white bg-success">
                                    {" "}
                                    Closed
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-5" />
                        <div className="col-sm-12 col-md-7" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card analytics-card">
                <div className="card-header d-flex justify-content-between card-selectsview flex-wrap">
                  <h3 className="card-title">
                    <i className="ti ti-grip-vertical" />
                    Recently Created Campaign
                  </h3>
                  <div className="card-select">
                    <ul>
                      <li>
                        <Select
                          className="select"
                          options={lostdealchat2}
                          placeholder="Marketing Pipeline"
                          classNamePrefix="react-select"
                        />
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_pipeline"
                        >
                          <i className="ti ti-square-rounded-plus me-2"></i> Add
                          Pipeline
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="campaign-card">
                    <ul>
                      <li className="campaign-wrap">
                        <div className="campaign-info">
                          <div className="campaign-name">
                            <h5>Distribution</h5>
                            <p>Public Relations</p>
                          </div>
                          <ul className="list-progress">
                            <li>
                              <h6>30.5%</h6>
                              <p>Opened</p>
                            </li>
                            <li>
                              <h6>20.5%</h6>
                              <p>Closed</p>
                            </li>
                            <li>
                              <h6>30.5%</h6>
                              <p>Unsubscribe</p>
                            </li>
                            <li>
                              <h6>70.5%</h6>
                              <p>Delivered</p>
                            </li>
                            <li>
                              <h6>35.0%</h6>
                              <p>Conversation</p>
                            </li>
                          </ul>
                        </div>
                        <div className="campaign-action">
                          <div className="campaign-date">
                            <span className="badge badge-pill badge-status bg-danger">
                              Bounced
                            </span>
                            <p>Due Date : 25 Sep 2023</p>
                          </div>
                          <ul className="project-mem">
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-14.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-15.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li className="more-set">
                              <Link to="#">+03</Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="campaign-wrap">
                        <div className="campaign-info">
                          <div className="campaign-name">
                            <h5>Pricing</h5>
                            <p>Social Marketing</p>
                          </div>
                          <ul className="list-progress">
                            <li>
                              <h6>42.5%</h6>
                              <p>Opened</p>
                            </li>
                            <li>
                              <h6>38.2%</h6>
                              <p>Closed</p>
                            </li>
                            <li>
                              <h6>48.8%</h6>
                              <p>Unsubscribe</p>
                            </li>
                            <li>
                              <h6>62.7%</h6>
                              <p>Delivered</p>
                            </li>
                            <li>
                              <h6>22.5%</h6>
                              <p>Conversation</p>
                            </li>
                          </ul>
                        </div>
                        <div className="campaign-action">
                          <div className="campaign-date">
                            <span className="badge badge-pill badge-status bg-green">
                              Running
                            </span>
                            <p>Due Date : 14 Oct 2023</p>
                          </div>
                          <ul className="project-mem">
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-14.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-15.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li className="more-set">
                              <Link to="#">+04</Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="campaign-wrap">
                        <div className="campaign-info">
                          <div className="campaign-name">
                            <h5>Merchandising</h5>
                            <p>Content Marketing</p>
                          </div>
                          <ul className="list-progress">
                            <li>
                              <h6>52.5%</h6>
                              <p>Opened</p>
                            </li>
                            <li>
                              <h6>29.3%</h6>
                              <p>Closed</p>
                            </li>
                            <li>
                              <h6>62.8%</h6>
                              <p>Unsubscribe</p>
                            </li>
                            <li>
                              <h6>71.3%</h6>
                              <p>Delivered</p>
                            </li>
                            <li>
                              <h6>39.5%</h6>
                              <p>Conversation</p>
                            </li>
                          </ul>
                        </div>
                        <div className="campaign-action">
                          <div className="campaign-date">
                            <span className="badge badge-pill badge-status bg-info">
                              Paused
                            </span>
                            <p>Due Date : 14 Oct 2023</p>
                          </div>
                          <ul className="project-mem">
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-14.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-15.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li className="more-set">
                              <Link to="#">+06</Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="campaign-wrap">
                        <div className="campaign-info">
                          <div className="campaign-name">
                            <h5>Repeat Customers</h5>
                            <p>Rebranding</p>
                          </div>
                          <ul className="list-progress">
                            <li>
                              <h6>17.5%</h6>
                              <p>Opened</p>
                            </li>
                            <li>
                              <h6>49.5%</h6>
                              <p>Closed</p>
                            </li>
                            <li>
                              <h6>35.2%</h6>
                              <p>Unsubscribe</p>
                            </li>
                            <li>
                              <h6>54.8%</h6>
                              <p>Delivered</p>
                            </li>
                            <li>
                              <h6>60.5%</h6>
                              <p>Conversation</p>
                            </li>
                          </ul>
                        </div>
                        <div className="campaign-action">
                          <div className="campaign-date">
                            <span className="badge badge-pill badge-status bg-success">
                              Success
                            </span>
                            <p>Due Date : 29 Oct 2023</p>
                          </div>
                          <ul className="project-mem">
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-14.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-15.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </Link>
                            </li>
                            <li className="more-set">
                              <Link to="#">+02</Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

      {/* Add Company */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_add_2"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add Company</h5>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="accordion" id="main_accordion">
              {/* Basic Info */}
              <div className="accordion-item rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button bg-white rounded fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#basic"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-user-plus fs-20" />
                    </span>
                    Basic Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse show"
                  id="basic"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="profile-upload">
                            <div className="profile-upload-img">
                              <span>
                                <i className="ti ti-photo" />
                              </span>
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-20.jpg"
                                alt="img"
                                className="preview1"
                              />
                              <button type="button" className="profile-remove">
                                <i className="ti ti-x" />
                              </button>
                            </div>
                            <div className="profile-upload-content">
                              <label className="profile-upload-btn">
                                <i className="ti ti-file-broken" /> Upload File
                                <input type="file" className="input-img" />
                              </label>
                              <p>JPG, GIF or PNG. Max size of 800K</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Company Name</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <label className="col-form-label">
                              Email <span className="text-danger">*</span>
                            </label>
                            <div className="status-toggle small-toggle-btn d-flex align-items-center">
                              <span className="me-2 label-text">
                                Email Opt Out
                              </span>
                              <input
                                type="checkbox"
                                id="user"
                                className="check"
                                defaultChecked
                              />
                              <label htmlFor="user" className="checktoggle" />
                            </div>
                          </div>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Phone 1 <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Phone 2</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Fax <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Website <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Ratings</label>
                          <div className="icon-form-end">
                            <span className="form-icon">
                              <i className="ti ti-star" />
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="4.2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="fmb-3">
                          <label className="col-form-label">Owner</label>
                          <SelectWithImage2 />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Tags </label>
                          <input
                            className="input-tags form-control"
                            type="text"
                            data-role="tagsinput"
                            name="Label"
                            defaultValue="Collab"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <label className="col-form-label">Deals</label>
                            <Link
                              to="#"
                              className="label-add"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvas_add_2"
                            >
                              <i className="ti ti-square-rounded-plus" />
                              Add New
                            </Link>
                          </div>
                          <Select
                            className="select2"
                            classNamePrefix="react-select"
                            options={dealsopen}
                            placeholder="Choose"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Source <span className="text-danger">*</span>
                          </label>
                          <Select
                            className="select2"
                            classNamePrefix="react-select"
                            // options={Activities}
                            placeholder="Choose"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Industry <span className="text-danger">*</span>
                          </label>
                          <Select
                            className="select2"
                            classNamePrefix="react-select"
                            options={industries}
                            placeholder="Choose"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Contacts</label>
                          <Select
                            className="select2"
                            options={project}
                            defaultValue={tagInputValues}
                            isMulti
                            classNamePrefix="react-select"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Currency <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Language <span className="text-danger">*</span>
                          </label>
                          <Select
                            className="select2"
                            classNamePrefix="react-select"
                            options={languages}
                            placeholder="Choose"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-0">
                          <label className="col-form-label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows={5}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}
              {/* Address Info */}
              <div className="accordion-item border-top rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#address"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-map-pin-cog fs-20" />
                    </span>
                    Address Info
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse"
                  id="address"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Street Address{" "}
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">City </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            State / Province{" "}
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3 mb-md-0">
                          <label className="col-form-label">Country</label>
                          <Select
                            className="select2"
                            classNamePrefix="react-select"
                            options={countries}
                            placeholder="Choose"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="col-form-label">Zipcode </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Address Info */}
              {/* Social Profile */}
              <div className="accordion-item border-top rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#social"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-social fs-20" />
                    </span>
                    Social Profile
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse"
                  id="social"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Facebook</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Skype </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Linkedin </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">Twitter</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3 mb-md-0">
                          <label className="col-form-label">Whatsapp</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="col-form-label">Instagram</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Social Profile */}
              {/* Access */}
              <div className="accordion-item border-top rounded mb-3">
                <div className="accordion-header">
                  <Link
                    to="#"
                    className="accordion-button accordion-custom-button rounded bg-white fw-medium text-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#access-info"
                  >
                    <span className="avatar avatar-md rounded text-dark border me-2">
                      <i className="ti ti-accessible fs-20" />
                    </span>
                    Access
                  </Link>
                </div>
                <div
                  className="accordion-collapse collapse"
                  id="access-info"
                  data-bs-parent="#main_accordion"
                >
                  <div className="accordion-body border-top">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="col-form-label">Visibility</label>
                          <div className="d-flex flex-wrap">
                            <div className="me-2">
                              <input
                                type="radio"
                                className="status-radio"
                                id="public"
                                name="visible"
                              />
                              <label htmlFor="public">Public</label>
                            </div>
                            <div className="me-2">
                              <input
                                type="radio"
                                className="status-radio"
                                id="private"
                                name="visible"
                              />
                              <label htmlFor="private">Private</label>
                            </div>
                            <div
                              data-bs-toggle="modal"
                              data-bs-target="#access_view"
                            >
                              <input
                                type="radio"
                                className="status-radio"
                                id="people"
                                name="visible"
                              />
                              <label htmlFor="people">Select People</label>
                            </div>
                          </div>
                        </div>
                        <div className="mb-0">
                          <label className="col-form-label">Status</label>
                          <div className="d-flex flex-wrap">
                            <div className="me-2">
                              <input
                                type="radio"
                                className="status-radio"
                                id="active"
                                name="status"
                                defaultChecked
                              />
                              <label htmlFor="active">Active</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                className="status-radio"
                                id="inactive"
                                name="status"
                              />
                              <label htmlFor="inactive">Inactive</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Access */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-light me-2"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Add Company */}
      {/* Add New Pipeline */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_pipeline"
      >
        <div className="offcanvas-header border-bottom">
          <h4>Add New Pipeline</h4>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="offcanvas-body">
          <form>
            <div>
              <div className="mb-3">
                <label className="col-form-label">
                  Pipeline Name <span className="text-danger">*</span>
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="mb-3">
                <div className="pipe-title d-flex align-items-center justify-content-between">
                  <h5 className="form-title">Pipeline Stages</h5>
                  <Link
                    to="#"
                    className="add-stage"
                    data-bs-toggle="modal"
                    data-bs-target="#add_stage"
                  >
                    <i className="ti ti-square-rounded-plus" />
                    Add New
                  </Link>
                </div>
                <div className="pipeline-listing">
                  <div className="pipeline-item">
                    <p>
                      <i className="ti ti-grip-vertical" /> Inpipeline
                    </p>
                    <div className="action-pipeline">
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_stage"
                      >
                        <i className="ti ti-edit text-blue" />
                        Edit
                      </Link>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_stage"
                      >
                        <i className="ti ti-trash text-danger" />
                        Delete
                      </Link>
                    </div>
                  </div>
                  <div className="pipeline-item">
                    <p>
                      <i className="ti ti-grip-vertical" /> Follow Up
                    </p>
                    <div className="action-pipeline">
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_stage"
                      >
                        <i className="ti ti-edit text-blue" />
                        Edit
                      </Link>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_stage"
                      >
                        <i className="ti ti-trash text-danger" />
                        Delete
                      </Link>
                    </div>
                  </div>
                  <div className="pipeline-item">
                    <p>
                      <i className="ti ti-grip-vertical" /> Schedule Service
                    </p>
                    <div className="action-pipeline">
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_stage"
                      >
                        <i className="ti ti-edit text-blue" />
                        Edit
                      </Link>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_stage"
                      >
                        <i className="ti ti-trash text-danger" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <h5 className="form-title">Access</h5>
                <div className="d-flex flex-wrap access-item nav">
                  <div
                    className="radio-btn"
                    data-bs-toggle="tab"
                    data-bs-target="#all"
                  >
                    <input
                      type="radio"
                      className="status-radio"
                      id="all"
                      name="status"
                      defaultChecked
                    />
                    <label htmlFor="all">All</label>
                  </div>
                  <div
                    className="radio-btn"
                    data-bs-toggle="tab"
                    data-bs-target="#select-person"
                  >
                    <input
                      type="radio"
                      className="status-radio"
                      id="select"
                      name="status"
                    />
                    <label htmlFor="select">Select Person</label>
                  </div>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade" id="select-person">
                    <div className="access-wrapper">
                      <div className="access-view">
                        <div className="access-img">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-21.jpg"
                            alt="Image"
                          />
                          Vaughan
                        </div>
                        <Link to="#">Remove</Link>
                      </div>
                      <div className="access-view">
                        <div className="access-img">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-01.jpg"
                            alt="Image"
                          />
                          Jessica
                        </div>
                        <Link to="#">Remove</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-light me-2"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Add New Pipeline */}
      <>
        {/* Hello world */}
        {/* Add New Stage */}
        <div className="modal custom-modal fade" id="add_stage" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Stage</h5>
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body">
                <form >
                  <div className="mb-3">
                    <label className="col-form-label">Stage Name *</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="modal-btn text-end">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <button type="button"  data-bs-dismiss="modal" className="btn btn-danger">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add New Stage */}
      </>
      <>
        {/* Edit Stage */}
        <div className="modal custom-modal fade" id="edit_stage" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Stage</h5>
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="col-form-label">Stage Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Inpipeline"
                    />
                  </div>
                  <div className="modal-btn text-end">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <button type="button"  data-bs-dismiss="modal" className="btn btn-danger">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Stage */}
        {/* Delete Stage */}
        <div className="modal fade" id="delete_stage" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove Stage?</h4>
                  <p className="mb-0">
                    Are you sure you want to remove <br /> stage you selected.
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Link
                      to="#"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="#" data-bs-dismiss="modal" className="btn btn-danger">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Stage */}
      </>
       {/* Add New Activity */}
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="offcanvas_add"
    >
      <div className="offcanvas-header border-bottom">
        <h4>Add New Activity </h4>
        <button
          type="button"
          className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="ti ti-x" />
        </button>
      </div>
      <div className="offcanvas-body">
        <form >
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="col-form-label">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="col-form-label">
                    Activity Type <span className="text-danger">*</span>
                  </label>
                  <ul className="radio-activity">
                    <li>
                      <div className="active-type">
                        <input
                          type="radio"
                          id="call"
                          name="status"
                          defaultChecked
                        />
                        <label htmlFor="call">
                          <i className="ti ti-phone" />
                          Calls
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="active-type">
                        <input type="radio" id="mail" name="status" />
                        <label htmlFor="mail">
                          <i className="ti ti-mail" />
                          Email
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="active-type">
                        <input type="radio" id="task" name="status" />
                        <label htmlFor="task">
                          <i className="ti ti-subtask" />
                          Task
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="active-type">
                        <input type="radio" id="shares" name="status" />
                        <label htmlFor="shares">
                          <i className="ti ti-user-share" />
                          Meeting
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <label className="col-form-label">
                  Due Date <span className="text-danger">*</span>
                </label>
                <div className="mb-3 icon-form">
                  <span className="form-icon">
                    <i className="ti ti-calendar-check" />
                  </span>
                  <input type="text" className="form-control datetimepicker" />
                </div>
              </div>
              <div className="col-md-6">
                <label className="col-form-label">
                  Time <span className="text-danger">*</span>
                </label>
                <div className="mb-3 icon-form">
                  <span className="form-icon">
                    <i className="ti ti-clock-hour-10" />
                  </span>
                  <TimePicker
                        placeholder="Select Time"
                        className="form-control datetimepicker-time"
                        onChange={onChange}
                        defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                      />
                </div>
              </div>
              <div className="col-md-6">
                <label className="col-form-label">
                  Reminder <span className="text-danger">*</span>
                </label>
                <div className="mb-3 icon-form">
                  <span className="form-icon">
                    <i className="ti ti-bell-ringing" />
                  </span>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <div className="mb-3 w-100">
                    <label className="col-form-label">&nbsp;</label>
                    <Select className="select" options={options1}  classNamePrefix="react-select"/>
                  </div>
                  <div className="mb-3 time-text">
                    <label className="col-form-label">&nbsp;</label>
                    <p>Before Due</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Owner <span className="text-danger">*</span>
                  </label>
                  <Select className="select" options={options2}  classNamePrefix="react-select"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="col-form-label">
                    Guests <span className="text-danger">*</span>
                  </label>
                  <Select
                        options={options}
                        isMulti
                        getOptionLabel={(option) =>
                          `${option.label} (${option.value})`
                        }
                        getOptionValue={(option) => option.value}
                      />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="col-form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <DefaultEditor className="summernote" />
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="col-form-label">Deals</label>
                   
                  </div>
                  <Select className="select" options={options3}  classNamePrefix="react-select"/>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="col-form-label">Contacts</label>
                    <Link
                      to="#"
                      className="label-add"
                      data-bs-toggle="modal"
                      data-bs-target="#add_contacts"
                    >
                      <i className="ti ti-square-rounded-plus" />
                      Add New
                    </Link>
                  </div>
                  <Select className="select" options={options4}  classNamePrefix="react-select"/>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="col-form-label">Companies</label>
                    <Link
                      to="#"
                      className="label-add"
                      data-bs-toggle="modal"
                      data-bs-target="#add_company"
                    >
                      <i className="ti ti-square-rounded-plus" />
                      Add New
                    </Link>
                  </div>
                  <Select className="select" options={options4}  classNamePrefix="react-select"/>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <button
              type="button"
              data-bs-dismiss="offcanvas"
              className="btn btn-light me-2"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /Add New Activity */}
    </>
  );
};

export default Analytics;
