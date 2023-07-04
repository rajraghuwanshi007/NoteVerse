import React from "react"
import { Link } from "react-router-dom";

export default function SectionComp(props){
    const url=`/fetch/${props.section}`;
    return(
        <>
        <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body ">
        <h5 className="card-title">Tag:  <strong>{props.section}</strong></h5>
          <p className="card-text mt-3">Click to Browse</p>
          <div className="text-center">
            <Link to={url} className="btn btn-outline-primary card-title">Click here</Link>
          </div>
          </div>
        </div>
      </div>
        </>
    )
}
