import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Schemas from "./Schemas";
import './style.css'

const Home = () => {
    const location = useLocation();
    const reqBody = location.state;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'withCredentials': true
    };
    const [catalogs, setCatalogs] = useState([]);
    const [expandedCatalog, setExpandedCatalog] = useState(null);


    console.log(catalogs.length)
    if (catalogs.length === 0) {

        axios.post("http://localhost:8080/getCatalogs", reqBody, { headers: headers, cache: false })
            .then(resp => {

                setCatalogs(resp.data)
              
            }).catch(error => {
                console.log("catch")
                console.log(error)
            });
    }

    const toggleExpand = (catalog) => {
        setExpandedCatalog(prevTopic => prevTopic === catalog ? null : catalog);
    };


    return (
        <div className="left-nav">
            <div  >
                {catalogs.map(catalog => (
                    <div key={catalog} className="catalogs-list">
                        <button className="catalog-button" onClick={() => toggleExpand(catalog)}>
                        <i className="bi bi-database-fill" style={{color:"#0d6efd", paddingRight:"2px"}} ></i>{catalog}
                        </button>
                        {expandedCatalog === catalog && (
                            <Schemas body={reqBody} schemas={catalog} />
                        )}
                    </div>
                ))}
            </div>
          
        </div>
    );
};

export default Home;