import React from 'react';
import axios from "axios";
import { useState } from "react";
import './style.css'
import Tables from './Tables';
import Views from './Views';


export default function Schemas(props) {
    const headers = {
        'Content-Type': 'application/json',
       
    };
    const [schemas, setSchemas] = useState([]);
    const reqBody = props.body;
    const selectedCatalog = props.schemas;


    if (schemas.length === 0) {
       
        const url = "http://localhost:8080/" + selectedCatalog;
        axios.post(url, reqBody, { headers: headers, cache: false })
            .then(resp => {
                if(resp.data.length!==0){
                  
                    setSchemas(resp.data)
                    console.log(resp.data)
                }
            }).catch(error => {
                console.log("catch")
                console.log(error)
            });
    }

    const [expandedSchema, setExpandedSchema] = useState(null);
    const toggleExpand = (schema) => {
        setExpandedSchema(prevTopic => prevTopic === schema ? null : schema);
    };

    const [showTables, setShowTables] = useState(false);

    const handleTablesButton = () => {
        setShowTables(!showTables);
    };
    const [showViews, setShowViews] = useState(false);

    const handleViewsButton = () => {
        setShowViews(!showViews);
    };

    return (
        <div >
            {schemas.map(schema => (
                <div key={schema} className="schemas-list">
                    <button className="schema-button" onClick={() => toggleExpand(schema)}>
                        <i style={{color:"#0d6efd"}} className="bi bi-diagram-2-fill"></i>{schema}
                    </button>
                    {expandedSchema === schema && (
                        <div className='tables-views-buttons'>
                            <div onClick={() => handleTablesButton()}>
                            <i className="bi bi-card-checklist" style={{color:"#0d6efd",marginLeft:"5px"}}></i><button>Tables</button>
                            </div>
                            {
                                showTables && <Tables body={reqBody} headers={headers} catalog={selectedCatalog} schema={schema} />
                            }
                            <div onClick={() => handleViewsButton()}>
                            <i className="bi bi-card-checklist" style={{color:"#0d6efd",marginLeft:"5px"}}></i><button>Views</button>
                            </div>
                            {
                                showViews && <Views body={reqBody} headers={headers} catalog={selectedCatalog} schema={schema} />
                            }
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
