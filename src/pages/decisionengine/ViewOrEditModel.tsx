import * as React from "react";
import {useParams} from "react-router-dom";
import CreateModel from "./CreateModel";

function ViewOrEditModel() {
    let { id } = useParams();

    return (
        <CreateModel key={id}  />
    )
}

export default ViewOrEditModel;
