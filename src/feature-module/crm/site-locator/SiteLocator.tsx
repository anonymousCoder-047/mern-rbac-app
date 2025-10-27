import { useCallback, useEffect, useRef, useState } from "react";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import PrivateServer from "../../../helper/PrivateServer";
import { endpoints } from "../../../helper/endpoints";
import _ from "lodash";
import Select from "react-select";
import { Toast, ToastContainer, Tab, Tabs, Modal, Button } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 25.276987, // Default center (e.g. Dubai)
  lng: 55.296249,
};

const MapView = ({ data, onClickHander }) => {
  const [clickedCoords, setClickedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ x: number; y: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const handleUseCoords = (coords: { lat: number; lng: number }) => {
    console.log("Using coords:", coords);
    onClickHander(coords.lat, coords.lng);
    // Update other state, trigger modal, etc.
  };

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // Suppress browser menu
    };

    container.addEventListener("contextmenu", handleContextMenu);
    const handleClickOutside = () => {
      setClickedCoords(null);
      setDropdownPos(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      container.removeEventListener("contextmenu", handleContextMenu)
    }
  }, []);

  return (
    <div ref={mapContainerRef} style={{ position: "relative" }}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={(map) => {
            mapRef.current = map;

            map.addListener("rightclick", (event: google.maps.MapMouseEvent) => {
              if (event.latLng && event.domEvent) {
                const lat = event.latLng.lat();
                const lng = event.latLng.lng();
                setClickedCoords({ lat, lng });

                const mouseEvent = event.domEvent as MouseEvent;
                setDropdownPos({
                  x: mouseEvent.clientX,
                  y: mouseEvent.clientY,
                });

                console.log("Right-clicked at:", lat, lng);
              }
            });
          }}
        >
          {data.map((item, index) => (
            <Marker
              key={index}
              position={{ lat: item.lat, lng: item.lng }}
              title={`${item.FlatNo} (${item.OntSerialNo})`}
            />
          ))}
        </GoogleMap>

        {clickedCoords && dropdownPos && (
          <div
            style={{
              position: "fixed",
              left: dropdownPos.x,
              top: dropdownPos.y,
              background: "#fff",
              border: "1px solid #ccc",
              padding: "8px",
              zIndex: 1000,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            <div><strong>Coordinates:</strong></div>
            <div>{clickedCoords.lat.toFixed(6)}, {clickedCoords.lng.toFixed(6)}</div>
            <button onClick={() => handleUseCoords(clickedCoords)}>Use These Coordinates</button>
          </div>
        )}
      </LoadScript>
    </div>
  );
};

const route = all_routes;
const emiratesCodeMap = {
  DXB: "Dubai",
  AUH: "Abu Dhabi",
  SHJ: "Sharjah",
  AJM: "Ajman",
  FUJ: "Fujairah",
  RAK: "Ras Al Khaimah",
  UAQ: "Umm Al Quwain"
};

const SiteLocator = () => {
  const [responseData, setResponseData] = useState({});
  const [flatData, setFlatData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [showModal1, setShowModal1] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [selectedFlatInfo, setSelectedFlatInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    place_id: "",
    searchText: "",
    searchItem: "",
    networkType: "",            // Text input
    region: "",                 // Select: Dubai Region, Abu Dhabi Region, etc.
    longitude: "",              // Text input
    latitude: "",               // Text input
    exchange: "",               // Text input
    city: "",                   // Select: Dubai, Abu Dhabi, Sharjah, etc.
    buildingNo: "",             // Text input
    buildingName: "",           // Text input
    street: "",                 // Text input
    siteName: "",               // Text input
    emirates: "",               // Select: Dubai, Abu Dhabi, etc.
    flatNo: "",                 // Select: Flat 1 to Flat 20
    xCoordinate: "",                  // Text input (synced with longitude)
    yCoordinate: ""    
  });
  const [error, setError] = useState({
    type: "primary",
    message: ""
  });
  const [showToast, setShowToast] = useState(false);

  const handleReset = () => {
    setFormData({
        place_id: "",
        searchText: "",
        searchItem: "",
        networkType: "",            // Text input
        region: "",                 // Select: Dubai Region, Abu Dhabi Region, etc.
        longitude: "",              // Text input
        latitude: "",               // Text input
        exchange: "",               // Text input
        city: "",                   // Select: Dubai, Abu Dhabi, Sharjah, etc.
        buildingNo: "",             // Text input
        buildingName: "",           // Text input
        street: "",                 // Text input
        siteName: "",               // Text input
        emirates: "",               // Select: Dubai, Abu Dhabi, etc.
        flatNo: "",                 // Select: Flat 1 to Flat 20
        xCoordinate: "",                  // Text input (synced with longitude)
        yCoordinate: ""    
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value, ...(name == "xCoordinate" || name == "yCoordinate" ? { searchItem: "0" } : {})});
  }
  
  const getEmirateName = (code) => _.get(emiratesCodeMap, code, '');
 
  const handleLocate = async (e, _additionalData={}) => {    
    try {
        setShowToast(true);
        setError({ type: "info", message: `Fetching site data, please wait it takes few mins...` })
        const { SiteLocator } = endpoints;
        const _formData = {
          ...formData,
          xCoordinate: formData?.xCoordinate ?? _additionalData?.longitude?.toString(),
          yCoordinate: formData?.yCoordinate ?? _additionalData?.latitude?.toString(),
        }

        const response = await PrivateServer.postData(SiteLocator.location, _formData);
        
        if(!_.isEmpty(response?.data)) {
          setResponseData(response?.data);
          setFormData({
            ...formData,
            networkType: responseData?.ResponseData?.NetworkDetails?.NetworkType,
            latitude: responseData?.ResponseData?.AdditionalInfo?.find((x) => x?.Name == "LATITUDE_Y")?.Value,
            longitude: responseData?.ResponseData?.AdditionalInfo?.find((x) => x?.Name == "LONGITUDE_X")?.Value,
            buildingName: responseData?.ResponseData?.AdditionalInfo?.find((x) => x?.Name == "BUILDING_NAME")?.Value,
            emirates: getEmirateName(responseData?.ResponseData?.AdditionalInfo?.find((x) => x?.Name == "EMIRATE")?.Value),
          })
          if(response?.data?.ResponseData?.FlatDetailsList) setFlatData(response?.data?.ResponseData?.FlatDetailsList?.FlatDetails)
          if(response?.data?.region) setRegionData(response?.data?.region)
          setShowToast(true);
            setError({ type: "success", message: `Site located` })
        } else {
            setShowToast(true);
            setError({ type: "danger", message: `No Site data found` })
        }
    } catch(ex) {
        setShowToast(true);
        setError({
            message: "Internal server error E: " + ex?.message,
            type: 'danger'
        })
    }
  }
  
  const fetchLocationSites = async (place_id="") => {  
    try {
        setShowToast(true);
        setError({ type: "info", message: `Fetching site data, please wait it takes few mins...` })
        const { SiteLocator } = endpoints;
        const response = await PrivateServer.postData(SiteLocator.location, { 
          place_id: place_id ?? formData?.place_id,
          xCoordinate: formData?.xCoordinate ?? "",
          yCoordinate: formData?.yCoordinate ?? ""
        });
        
        if(!_.isEmpty(response?.data)) {
          setResponseData(response?.data);
          setFormData({
            ...formData,
            networkType: responseData?.ResponseData?.NetworkDetails?.NetworkType,
            latitude: responseData?.ResponseData?.AdditionalInfo?.find((x) => x?.Name == "LATITUDE_Y")?.Value,
            longitude: responseData?.ResponseData?.AdditionalInfo?.find((x) => x?.Name == "LONGITUDE_X")?.Value,
            buildingName: responseData?.ResponseData?.AdditionalInfo?.find((x) => x?.Name == "BUILDING_NAME")?.Value,
            emirates: getEmirateName(responseData?.ResponseData?.AdditionalInfo?.find((x) => x?.Name == "EMIRATE")?.Value),
          })
          if(response?.data?.ResponseData?.FlatDetailsList) setFlatData(response?.data?.ResponseData?.FlatDetailsList?.FlatDetails)
          if(response?.data?.region) setRegionData(response?.data?.region)
          setShowToast(true);
            setError({ type: "success", message: `Site located` })
        } else {
            setShowToast(true);
            setError({ type: "danger", message: `No Site data found` })
        }
    } catch(ex) {
        setShowToast(true);
        setError({
            message: "Internal server error E: " + ex?.message,
            type: 'danger'
        })
    }
  }
  
  const handleSelect = async (selected) => {
    setFormData(prev => ({ ...prev, searchText: selected?.label, place_id: selected?.value }));
    await fetchLocationSites(selected?.value)
  };

  const handleSearchBy = useCallback(
    _.debounce(async (value, label) => {
      if (value === "") return;

      setLoading(true);
      try {
        setShowToast(true);
        setError({ type: "info", message: `Fetching site location, please wait it takes few mins...` });

        const { SiteLocator } = endpoints;
        const _formData = { ...formData, searchText: value, searchItem: label };
        const response = await PrivateServer.postData(SiteLocator.searchBy, _formData);

        if (!_.isEmpty(response?.data)) {
          const formatted = response.data.map((item: any) => ({
            label: String(item.label),
            value: String(item.value),
            ...item
          }));

          setSearchData(formatted);
          setError({ type: "success", message: `Location found` });
          setMenuOpen(true); // reopen menu when results arrive
        } else {
          setSearchData([]);
          setError({ type: "danger", message: `No location found` });
          setMenuOpen(false);
        } 
      } catch (ex: any) {
        setError({
          message: "Internal server error E: " + ex?.message,
          type: "danger"
        });
        setSearchData([]);
      } finally {
        setLoading(false);
      }
    }, 2000),
    []
  );

  const handleSearchLocation = useCallback(
    _.debounce(async (value: string) => {
      if (value === "") return;

      setLoading(true);
      try {
        setShowToast(true);
        setError({ type: "info", message: `Fetching site location, please wait it takes few mins...` });

        const { SiteLocator } = endpoints;
        const _formData = { ...formData, searchText: value };
        const response = await PrivateServer.postData(SiteLocator.searchGoogle, _formData);

        if (!_.isEmpty(response?.data)) {
          const formatted = response.data.map((item: any) => ({
            label: String(item.label),
            value: String(item.value),
          }));

          setSearchData(formatted);
          setError({ type: "success", message: `Location found` });
          setMenuOpen(true); // reopen menu when results arrive
        } else {
          setSearchData([]);
          setError({ type: "danger", message: `No location found` });
          setMenuOpen(false);
        } 
      } catch (ex: any) {
        setError({
          message: "Internal server error E: " + ex?.message,
          type: "danger"
        });
        setSearchData([]);
      } finally {
        setLoading(false);
      }
    }, 2000),
    []
  );

  //   const handleExport = () => {
  //     try {
  //     // Convert data to worksheet format
  //     const worksheet = XLSX.utils.json_to_sheet(billData);

  //     // Create a new workbook and append the worksheet
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Invoice Summary");

  //     // Write the file and trigger download
  //     XLSX.writeFile(workbook, `etisalat_invoice_summary_${moment(new Date()).format('YYYY-MM-DD HH:mm:i')}.xlsx`);

  //     } catch(err) {
  //       console.log("Error == ", err);
  //     }
  // }
  const sampleData = [];

  const handleCoordinatesChange = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      xCoordinate: lat.toString(),
      yCoordinate: lng.toString()
    }));
  }

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
                <div className="col-8">
                  <h4 className="page-title">
                    Site Locator
                  </h4>
                </div>
                <div className="col-4 text-end">
                  <div className="head-icons">
                   <CollapseHeader/>
                  </div>
                </div>
              </div>
                {
                  showToast ? 
                  <ToastContainer position="top-end">
                    <Toast show={showToast} onClose={() => setShowToast((prev) => !prev)} bg={error?.type?.toLowerCase()} delay={3000} autohide>
                      <Toast.Header>
                        <strong className="me-auto">Request {error?.type}</strong>
                      </Toast.Header>
                      <Toast.Body>{error?.message}</Toast.Body>
                    </Toast>
                  </ToastContainer> : ""
                }
            </div>
            {/* /Page Header */}
            <div className="card">
              <div className="card-header">
                {/* Search */}
                <div className="row align-items-center">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    {/* Region Select */}
                    <div style={{ flex: 1 }}>
                        <select
                          name="searchItem"
                          value={formData?.searchItem}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="">Search By</option>
                          <option value="0">Google Place</option>
                          <option value="2">Telephone</option>
                          <option value="11">EID</option>
                          <option value="14">Landmark</option>
                          <option value="16">Makani</option>
                          <option value="21">Mobile Site</option>
                          <option value="28">Onwani Site</option>
                        </select>
                    </div>

                    {/* Search Input with Icon */}
                    {
                      formData?.searchItem == "0" ? 
                      (
                        <>
                          <div style={{ flex: 2 }}>
                            <Select
                              options={searchData ?? []}
                              onInputChange={(inputValue) => {
                                if (inputValue && inputValue.trim() !== "") {
                                  setMenuOpen(true); // open when typing
                                  handleSearchLocation(inputValue);
                                } else {
                                  setMenuOpen(false); // close when cleared
                                }
                                return inputValue;
                              }}
                              onChange={handleSelect}
                              isLoading={loading}
                              isSearchable
                              placeholder="Search"
                            />
                          </div>
                        </>
                      ) : formData?.searchItem != "" ? (
                        <>
                          <div style={{ flex: 2 }}>
                            <Select
                              options={searchData ?? []}
                              onInputChange={(inputValue) => {
                                if (inputValue && inputValue.trim() !== "") {
                                  setMenuOpen(true); // open when typing
                                  handleSearchBy(inputValue, formData?.searchItem);
                                } else {
                                  setMenuOpen(false); // close when cleared
                                }
                                return inputValue;
                              }}
                              onChange={async (selected) => {
                                setFormData({
                                  ...formData,
                                  searchText: selected?.label,
                                  xCoordinate: selected?.latitude,
                                  yCoordinate: selected?.longitude
                                })

                                await handleLocate({}, selected)
                              }}
                              isLoading={loading}
                              isSearchable
                              placeholder="Search"
                            />
                          </div>
                        </>
                      ) :
                      (
                        <>
                          <div className="icon-form d-flex align-items-center" style={{ flex: 2 }}>
                            <span className="form-icon me-2">
                              <i className="ti ti-search" />
                            </span>
                            <input
                              name="searchText"
                              type="text"
                              value={formData?.searchText}
                              className="form-control"
                              placeholder="Search"
                              onChange={handleChange}
                              onBlur={handleLocate}
                            />
                          </div>
                        </>
                      )
                    }
                    </div>
                  {/* <div className="col-sm-8">
                    <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                      {values?.roleId?.name?.toLowerCase() == 'admin' && (<div className="dropdown me-2">
                        <Link
                          to="#"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-package-export me-2" />
                          Export
                        </Link>
                        <div className="dropdown-menu  dropdown-menu-end">
                          <ul>
                              <li>
                              <Link to="#" className="dropdown-item" onClick={handleExport}>
                                  <i className="ti ti-file-type-xls text-green me-1" />
                                  Export as Excel{" "}
                              </Link>
                              </li>
                          </ul>
                        </div>
                      </div>)}
                    </div>
                  </div> */}
                </div>
                {/* /Search */}
              </div>
              <div className="card-body">
                {/* Contact List */}
                <div className="table-responsive custom-table">
                  <div className="row mb-3 p-4">
                      {/* Coordinate Inputs */}
                      <div className="mb-3">
                          <label className="col-form-label">X Cord:</label>
                          <input type="text" name="xCoordinate" value={formData?.xCoordinate} onChange={handleChange} className="form-control" />
                      </div>
                      <div className="mb-3">
                          <label className="col-form-label">Y Cord:</label>
                          <input type="text" name="yCoordinate" value={formData?.yCoordinate} onChange={handleChange} className="form-control" />
                      </div>

                      {/* Action Buttons */}
                      <div className="d-grid gap-2 d-flex">
                          <button type="button" className="btn btn-dark text-success" onClick={() => fetchLocationSites("")}>
                            Locate
                          </button>
                          <button type="button" className="btn btn-dark text-success" onClick={handleReset}>
                            Reset
                          </button>
                      </div>
                  </div>
                  {/* map code here */}
                  <MapView data={sampleData} onClickHander={handleCoordinatesChange} />
                </div>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="datatable-length" />
                  </div>
                  <div className="col-md-6">
                    <div className="datatable-paginate" />
                  </div>
                </div>
                {/* /Contact List */}
                <div className="d-flex justify-content-center p-4">
                  <div className="w-100" style={{ maxWidth: '800px' }}>
                    <Tabs defaultActiveKey="ack" className="mb-3">
                      {/* Network Details Tab */}
                      <Tab eventKey="network" title="Network Details">
                        {Object.entries(responseData?.ResponseData?.NetworkDetails ?? {}).map(([key, value]) => (
                          <div className="mb-3" key={key}>
                            <label className="form-label">{key}</label>
                            <input type="text" readOnly className="form-control" value={value ?? ''} />
                          </div>
                        ))}
                      </Tab>

                      {/* Additional Info Tab */}
                      {/* <Tab eventKey="additional" title="Additional Info">
                        {(responseData?.ResponseData?.AdditionalInfo ?? []).map(({ Name, Value }, index) => (
                          <div className="mb-3" key={index}>
                            <label className="form-label">{Name}</label>
                            <input type="text" readOnly className="form-control" value={Value ?? ''} />
                          </div>
                        ))}
                      </Tab> */}
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Modal for Details */}
    <Modal show={showModal1} onHide={() => setShowModal1(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedDetails?.length > 0 ? (
          <div className="row">
            {selectedDetails?.map(({ Column, Value }, i) => (
              <div className="col-md-6 mb-3" key={i}>
                <label className="form-label">{Column}</label>
                <input type="text" readOnly className="form-control" value={Value ?? ''} />
              </div>
            ))}
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal1(false)}>Close</Button>
      </Modal.Footer>
    </Modal>

    {/* Modal for Flat Info */}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Flat Details: {selectedFlatInfo?.FlatNo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedFlatInfo ? (
          <div className="row">
            {Object.entries(selectedFlatInfo).map(([key, value]) => {
              if (key === 'AdditionalInfo') return null; // handled separately
              return (
                <div className="col-md-6 mb-3" key={key}>
                  <label className="form-label">{key}</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    value={value ?? ''}
                  />
                </div>
              );
            })}

            {/* AdditionalInfo Array */}
            {selectedFlatInfo?.AdditionalInfo?.map(({ Name, Value }, idx) => (
              <div className="col-md-6 mb-3" key={`info-${idx}`}>
                <label className="form-label">{Name}</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={Value ?? ''}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    {/* /Page Wrapper */}

    {/* Add New Source */}
    {/* <div className="modal fade" id="add_source" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Search invoice</h5>
            <button
              className="btn-close custom-btn-close border p-1 me-0 text-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <form >
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  File Upload
                </label>
                <input type="file" name="filename" value={formData?.filename} onChange={handleChange} className="form-control" accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
              </div>
            </div>
            <span>or</span>
            <hr />
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Account Number
                </label>
                <input type="text" name="number" value={formData?.number} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="modal-footer">
              <div className="d-flex align-items-center justify-content-end m-0">
                <Link
                  to="#"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  Cancel
                </Link>
                <button type="button" data-bs-dismiss="modal" onClick={handleAddOrUpdateSources} className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> */}
    {/* /Add New Source */}
  </>
  
  );
};

export default SiteLocator;
